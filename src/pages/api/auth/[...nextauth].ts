import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Kullanıcıyı email ile bulma
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user) {
          // Şifre doğrulama
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordValid) {
            return user;
          }
        }
        
        // Hatalı giriş
        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1 saat (çerez geçerlilik süresi)
  },
  jwt: {
    maxAge: 60 * 60, // JWT token süresi (1 saat)
  },
  pages: {
    signIn: '/login', // Giriş sayfası
  },
  callbacks: {
    // Yönlendirme işlemi (başarılı oturum açma sonrası)
    async redirect({ url, baseUrl }) {
      const environmentBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || baseUrl;
      return environmentBaseUrl; // Base URL'ye yönlendir
    },
    
    // Oturum açarken kullanıcıyı kontrol edip kaydediyoruz
    async signIn({ user }) {
      console.log("user:>>>>>",user)

      // Eğer kullanıcı veritabanında yoksa oluştur, varsa token'ı güncelle
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email || "" }, // Email ile kontrol
      });

      if (!existingUser) {
        // Yeni kullanıcıyı oluştur
        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name,
            image: user.image,
          },
        });
      }

      return true; // Başarılıysa true döndür
    },

    // Oturumda session'a token ekleyin
    async session({ session, token }) {
      session.user.id = token.sub; // Kullanıcı ID'si session'a ekleniyor
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email! }, // Veritabanından kullanıcıyı getir
      });
      if (dbUser) {
        session.user.token = dbUser.token; // Kullanıcı token'ı session'a ekleniyor
      }
      return session; // Session'ı döndür
    },
  },
};

export default NextAuth(authOptions);
