"use server";
import db from "@/db/db";
import bcrypt from "bcryptjs"; // Şifreleme için bcryptjs kullanıyoruz

export async function CreateUser(data: { email: string, password: string, firstName: string, lastName: string }) {
  // Kullanıcıyı kontrol et
  let existingUser = await db.user.findUnique({ where: { email: data.email } });

  if (existingUser) {
    throw new Error("Bu e-posta adresiyle zaten bir kullanıcı mevcut.");
  }

  // Şifreyi hashleyin
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Yeni kullanıcı oluşturma
  const user = await db.user.create({
    data: { 
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
    },
  });

  return user; // Yeni oluşturulan kullanıcıyı döndür
}
