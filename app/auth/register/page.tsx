"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useState } from "react";
import registerationFormBackground from "../../../assets/register-background.jpg";
import { post } from "@/utils/api";
import { useRouter } from "next/navigation";
import FullScreenLoader from "@/components/Loader";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const validate = () => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      // Simulate registration API
      console.log("User submitted:", formData);
      const { confirmPassword, ...userData } = formData;

      const response = await post<{ token: string; user: any }>(
        "/auth/register",
        userData
      );

      setFormData({ name: "", email: "", password: "", confirmPassword: "" });

      router.push("/auth/login");
    } catch (err) {
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <main
        className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center p-6"
        style={{
          backgroundImage: `url(${registerationFormBackground.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white/70 dark:bg-gray-800/70 shadow-md rounded-xl p-6 space-y-4 backdrop-blur-md"
        >
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Sign Up
          </h1>

          <Input
            id="name"
            label="Name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            error={errors.name}
          />

          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            error={errors.email}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="*****"
            value={formData.password}
            onChange={handleChange}
            required
            error={errors.password}
          />

          <Input
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="*****"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            error={errors.confirmPassword}
          />

          <Button
            type="submit"
            loading={loading}
            loadingText="Creating account..."
          >
            Create Account
          </Button>
        </form>
      </main>
    </>
  );
}
