"use client"
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import Image from "next/image";
import { Input } from '@/components/ui/input';
import { useState, useTransition } from 'react';
import { CreateUser } from '@/app/(customer)/_actions/login'

export default function Login() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [isPending, startTransition] = useTransition(); // for server action handling
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleRegister = async () => {
    startTransition(async () => {
      try {
        await CreateUser({
          email: formData.email,
          password: formData.password,
          firstName: formData.name,
          lastName: formData.surname
        });
        alert('Registration successful. You can now log in.');
        setActiveTab('login'); // Switch to login tab after registration
      } catch (error) {
        alert(error.message);
      }
    });
  };

  const handleLogin = async () => {
    signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: true, // Redirect upon successful login
    });
  };

  return (
    <>
      {/* Animated and centered logo */}
      <motion.div
        className="flex justify-center items-center w-full mb-5"
        initial={{ opacity: 0, scale: 0.8 }}  // Başlangıçta küçük ve görünmez
        animate={{ opacity: 1, scale: 1 }}    // Animasyonla görünür hale geliyor ve büyüyor
        transition={{ duration: 1 }}          // Animasyon süresi
      >
        <Image
         src="/logo.png"
          width={180}
          height={180}
          priority={true}
          alt="Logo"
          className="mb-2"
        />
      </motion.div>

      {/* Tabs for Login | Register with animation */}
      <motion.div 
        style={{marginTop:"-10px"}}
        className="flex justify-center items-center mb-2"
        initial={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5 }} // Animation for the tabs
      >
        <motion.button
          className={`text-white px-4 py-2 transition-all ${activeTab === 'login' ? 'font-bold' : 'font-normal'}`}
          onClick={() => setActiveTab('login')}
          whileHover={{ scale: 1.05 }} // Animating on hover
          animate={{ fontWeight: activeTab === 'login' ? 700 : 400 }} // Font-weight animation
          transition={{ duration: 0.3 }} // Smooth font-weight transition
        >
          Login
        </motion.button>

        <span className="text-white">|</span>

        <motion.button
          className={`text-white px-4 py-2 transition-all ${activeTab === 'register' ? 'font-bold' : 'font-normal'}`}
          onClick={() => setActiveTab('register')}
          whileHover={{ scale: 1.05 }} // Animating on hover
          animate={{ fontWeight: activeTab === 'register' ? 700 : 400 }} // Font-weight animation
          transition={{ duration: 0.3 }} // Smooth font-weight transition
        >
          Register
        </motion.button>
      </motion.div>

      {/* Card animation with fade-in and darker background */}
      <motion.div 
        className="flex justify-center items-center"
        initial={{ opacity: 0, translateY: 20 }}  // Kart başlangıçta yukarıda ve görünmez
        animate={{ opacity: 1, translateY: 0 }}   // Aşağı kayarak görünür hale geliyor
        transition={{ duration: 1.2 }}            // Animasyon süresi uzatıldı
      >
        <motion.div
          className="w-96 shadow-lg p-8 rounded-md bg-gradient-to-r from-[#180e13] to-[#14151c]"  // Daha koyu renkler
        >
          {/* Conditional Name and Surname Inputs for Register */}
          {activeTab === 'register' && (
            <>
              {/* Name Input */}
              <div className="mb-4">
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-md"
                />
              </div>
              
              {/* Surname Input */}
              <div className="mb-4">
                <Input
                  id="surname"
                  type="text"
                  placeholder="Surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-md"
                />
              </div>
            </>
          )}

          {/* Email Input */}
          <div className="mb-4">
            <Input 
              id="email" 
              type="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md" 
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <Input 
              id="password" 
              type="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md" 
            />
          </div>

          {/* Register or Login Button */}
          <motion.button
            className="w-full bg-gray-800 text-gray-300 py-2 rounded-md hover:bg-gray-700 mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={activeTab === 'register' ? handleRegister : handleLogin}
            disabled={isPending} // Disable while pending
          >
            {isPending ? 'Loading...' : activeTab === 'login' ? 'Login' : 'Register'}
          </motion.button>

          {/* OR text */}
          <div className="text-center text-gray-400 mb-4">Or</div>

          {/* Login with Google Button */}
          <motion.button
            className="w-full bg-gray-800 text-gray-300 py-2 rounded-md hover:bg-gray-700 "
            onClick={() => signIn('google')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login with Google
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}
