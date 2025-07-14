'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/Input';
import family from '../../../assets/family.jpg';
import FullScreenLoader from '@/components/Loader';
import { post } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import LinkWithLoader from '@/components/LinkLoader';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; server?: string }>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    setErrors({}); // Clear server error

    try {
      const response = await post<{ token: string; user: {id: number; name: string; email: string;}}>('/auth/login', {
      email,
      password,
    });

      if (response.status != 200) {
        setErrors({ server: 'Login failed' });
      } else {
        localStorage.setItem("token",response.data.token);
        router.push('/property-finder');
      }
    } catch (err) {
      setErrors({ server: err + 'Something went wrong. Please try again.'  });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-grey-700 flex h-screen w-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
       {loading && <FullScreenLoader />}
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="https://s.zillowstatic.com/pfs/static/z-logo-default.svg"
              alt="Zillow"
              width={100}
              height={30}
            />
          </div>

          {/* Sign In Title */}
          <h1 className="text-2xl font-semibold text-blue-600 mb-4">Sign in</h1>

          {/* Email Input */}
          <Input
            id="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="placeholder-gray-500 text-gray-700"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

          {/* Password Input */}
          <Input
            id="password"
            type="password"
            placeholder="Password"
            className="mt-4 placeholder-gray-500 text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

          {/* Server error */}
          {errors.server && <p className="text-red-600 text-sm mt-3">{errors.server}</p>}

          {/* Continue Button */}
          <Button
            onClick={handleLogin}
            loading={loading}
            loadingText="Logging in..."
          >
            Login
          </Button>

          {/* Create account link */}
          <p className="text-sm mb-4 text-gray-500">
            New to Mini Zillow?{' '}
            <LinkWithLoader href="/auth/register" className="text-blue-600 font-medium hover:underline">
              Create account
            </LinkWithLoader>
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
        <Image src={family} alt="Login background" fill style={{ objectFit: 'cover' }} priority />
      </div>
    </div>
  );
}
