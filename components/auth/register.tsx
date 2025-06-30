"use client";

import { Eye, EyeOff, Check, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
  };
  touched: Record<string, boolean>;
  errors: any;
  isLoading: boolean;
  onInputChange: any;
  onInputBlur: (field: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  showPassword: boolean;
  togglePassword: () => void;
  showConfirmPassword: boolean;
  toggleConfirmPassword: () => void;
  passwordStrength: {
    score: number;
    feedback: string[];
    color: string;
  };
}

export default function RegisterForm({
  formData,
  touched,
  errors,
  isLoading,
  onInputChange,
  onInputBlur,
  onSubmit,
  showPassword,
  togglePassword,
  showConfirmPassword,
  toggleConfirmPassword,
  passwordStrength,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Username</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => onInputChange("fullName", e.target.value)}
            onBlur={() => onInputBlur("fullName")}
            className={`pl-10 h-12 ${
              errors.fullName ? "border-red-300" : "border-gray-200"
            }`}
            placeholder="Enter your full name"
          />
          {touched.fullName && !errors.fullName && formData.fullName && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
          )}
        </div>
        {errors.fullName && (
          <p className="text-red-500 text-xs">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
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

      {/* Password */}
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

        {/* Password Strength */}
        {formData.password && (
          <div className="mt-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">
                {passwordStrength.score === 5
                  ? "Strong"
                  : passwordStrength.score >= 3
                  ? "Good"
                  : "Weak"}
              </span>
            </div>
            {passwordStrength.feedback.length > 0 && (
              <p className="text-xs text-gray-500">
                Missing: {passwordStrength.feedback.join(", ")}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => onInputChange("confirmPassword", e.target.value)}
            onBlur={() => onInputBlur("confirmPassword")}
            className={`pl-10 pr-10 h-12 ${
              errors.confirmPassword ? "border-red-300" : "border-gray-200"
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={toggleConfirmPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
        )}
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
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        By creating an account, you agree to our{" "}
        <button className="underline hover:text-gray-900">Terms</button> and{" "}
        <button className="underline hover:text-gray-900">
          Privacy Policy
        </button>
        .
      </p>
    </form>
  );
}
