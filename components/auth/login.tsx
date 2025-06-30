"use client";

import { Eye, EyeOff, Check, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  formData: {
    email: string;
    password: string;
  };
  touched: Record<string, boolean>;
  errors: any;
  isLoading: boolean;
  onInputChange: any;
  onInputBlur: (field: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  showPassword: boolean;
  togglePassword: () => void;
}

export default function LoginForm({
  formData,
  touched,
  errors,
  isLoading,
  onInputChange,
  onInputBlur,
  onSubmit,
  showPassword,
  togglePassword,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            onBlur={() => onInputBlur("email")}
            className={`pl-10 h-12 ${
              errors.email ? "border-red-300" : "border-gray-200"
            }`}
            placeholder="Enter your email"
          />
          {touched.email && !errors.email && formData.email && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
          )}
        </div>
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => onInputChange("password", e.target.value)}
            onBlur={() => onInputBlur("password")}
            className={`pl-10 pr-10 h-12 ${
              errors.password ? "border-red-300" : "border-gray-200"
            }`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        disabled={isLoading || Object.keys(errors).length > 0}
        className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Please wait...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        )}
      </Button>
    </form>
  );
}
