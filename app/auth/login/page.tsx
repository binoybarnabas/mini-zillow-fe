'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/Input';
import family from '../../../assets/family.jpg';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    console.log(email);
    console.log(password);
  }, [email,password])

  return (
    <div className="text-grey-700 flex h-screen w-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white">
            <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-6">
            <Image src="https://s.zillowstatic.com/pfs/static/z-logo-default.svg" alt="Zillow" width={100} height={30} />
          </div>

          {/* Sign In Title */}
          <h1 className="text-2xl font-semibold text-blue-600 mb-4">Sign in</h1>

          {/* Email Input using Reusable Component */}
          <Input
            id="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="placeholder-gray-500 text-gray-700"
          />

          <Input
            id="password"
            type="password"
            placeholder="password"
            className="mt-4 placeholder-gray-500 text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Continue Button */}
          <button className="w-full bg-blue-600 text-white rounded py-2 my-4 hover:bg-blue-700">
            Login
          </button>

          {/* Create account link */}
          <p className="text-sm mb-4 text-gray-500">
            New to Mini Zillow?{' '}
            <a href="#" className="text-blue-600 font-medium hover:underline">
              Create account
            </a>
          </p>
          {/* Terms */}
          <p className="text-xs text-gray-500 mt-4 text-center">
            By submitting, I accept Zillow’s{' '}
            <a href="#" className="text-blue-600 hover:underline">
              terms of use
            </a>
          </p>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
        src={family}
        alt="Login background"
        fill
        style={{ objectFit: 'cover' }}
        priority
        />
      </div>
    </div>
  );
}
