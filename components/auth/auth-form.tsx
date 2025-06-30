"use client";

import { useState, useEffect } from "react";
import LoginForm from "./login";
import RegisterForm from "./register";
import { crud } from "@/app/api/apiServoce";
import { X } from "lucide-react";
import Toast from "@/components/Toast";
import { useToast } from "@/hooks/useToast";

type TabType = "login" | "register";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
}

interface PasswordStrength {
  score: number;
  feedback: string[];
  color: string;
}

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState<TabType>("login");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const { toast, showToast, hideToast } = useToast();
  const [otpError, setOtpError] = useState(false);

  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorStatus, setErrorStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle input change
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const requiredFields =
      activeTab === "login"
        ? ["email", "password"]
        : ["email", "password", "confirmPassword", "fullName"];

    const newTouched = requiredFields.reduce(
      (acc, field) => ({ ...acc, [field]: true }),
      {}
    );
    setTouched(newTouched);

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (activeTab === "login") {
      const loginPayload = {
        email: formData.email,
        password: formData.password,
      };

      try {
        const response = await crud.create("user/token/", loginPayload);
        console.log("🔐 Login success:", response);
        // TODO: Handle token
      } catch (error: any) {
        console.error("Login failed:", error);
        setErrorStatus("error");
        setErrorMessage(
          error?.response?.data?.detail || "Login failed. Please try again."
        );
        setShowErrorDialog(true);
      }

      setIsLoading(false);
      return;
    }

    const initialRegisterPayload = {
      email: formData.email,
      username: formData.fullName,
    };

    try {
      const response = await crud.create(
        "user/auth/send-code/",
        initialRegisterPayload
      );
      console.log("📝 Code sent successfully:", response);
      setShowErrorDialog(true);
      setErrorStatus("idle");
    } catch (error: any) {
      console.error("Register code send failed:", error);
      setErrorStatus("error");
      setErrorMessage(
        error?.response?.data?.error || error?.message || "Failed to send code."
      );
      setShowErrorDialog(true);
    }

    setIsLoading(false);
  };

  const handleOtpSubmit = async () => {
    const code = otp.join("");
    setIsLoading(true);
    setOtpError(false); // reset red border
  
    const finalPayload = {
      email: formData.email,
      username: formData.fullName,
      password: formData.password,
      code,
    };
  
    try {
      const response = await crud.create("user/auth/verify-code/", finalPayload);
      console.log("✅ OTP Verified:", response);
      setErrorStatus("success");
      setShowErrorDialog(true);
    } catch (error: any) {
      console.error("❌ OTP Verification failed:", error);
      setOtpError(true); // mark inputs as invalid
    }
  
    setIsLoading(false);
  };
  

  // Password strength
  const getPasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    const feedback: string[] = [];

    if (password.length >= 8) score += 1;
    else feedback.push("At least 8 characters");

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push("One lowercase letter");

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push("One uppercase letter");

    if (/\d/.test(password)) score += 1;
    else feedback.push("One number");

    if (/[^a-zA-Z\d]/.test(password)) score += 1;
    else feedback.push("One special character");

    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
    ];
    return {
      score,
      feedback,
      color: colors[score - 1] || "bg-gray-300",
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Validation
  useEffect(() => {
    const newErrors: ValidationErrors = {};

    if (touched.email && formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (touched.password && formData.password) {
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
    }

    if (
      activeTab === "register" &&
      touched.confirmPassword &&
      formData.confirmPassword
    ) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (
      activeTab === "register" &&
      touched.fullName &&
      formData.fullName.length < 2
    ) {
      newErrors.fullName = "Please enter your full name";
    }

    setErrors(newErrors);
  }, [formData, touched, activeTab]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-8 pb-6">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {activeTab === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-gray-600 text-sm">
            {activeTab === "login"
              ? "Please sign in to your account"
              : "Please fill the form to register"}
          </p>
        </div>

        {/* Tabs */}
        <div className="relative bg-gray-100 rounded-xl p-1 mb-8">
          <div
            className={`absolute top-1 bottom-1 bg-white rounded-lg shadow-sm transition-all duration-300 ease-out ${
              activeTab === "login"
                ? "left-1 right-1/2 mr-0.5"
                : "right-1 left-1/2 ml-0.5"
            }`}
          />
          <div className="relative flex">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeTab === "login"
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeTab === "register"
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-8 pb-8">
        {activeTab === "login" ? (
          <LoginForm
            formData={formData}
            touched={touched}
            errors={errors}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onInputBlur={handleInputBlur}
            onSubmit={handleSubmit}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />
        ) : (
          <RegisterForm
            formData={formData}
            touched={touched}
            errors={errors}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onInputBlur={handleInputBlur}
            onSubmit={handleSubmit}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
            showConfirmPassword={showConfirmPassword}
            toggleConfirmPassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            passwordStrength={passwordStrength}
          />
        )}
      </div>

      {showErrorDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg text-center relative">
            <X
              className=" right-2 top-2 absolute cursor-pointer"
              onClick={() => {
                setShowErrorDialog(false);
                setErrorStatus("idle");
                setErrorMessage(null);
                setOtp(["", "", "", "", "", ""]);
              }}
            />

            {errorStatus === "idle" && (
              <>
                <h2 className="text-lg font-semibold mb-4">Enter OTP Code</h2>
                <div className="flex justify-center gap-2 mb-4">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/, "");
                        const newOtp = [...otp];
                        newOtp[i] = value;
                        setOtp(newOtp);
                        if (value && i < 5) {
                          const nextInput = document.getElementById(
                            `otp-${i + 1}`
                          );
                          if (nextInput) nextInput.focus();
                        }
                      }}
                      id={`otp-${i}`}
                      className="w-10 h-12 border border-gray-300 text-center rounded-md text-lg"
                    />
                  ))}
                </div>
                <button
                  onClick={handleOtpSubmit}
                  className="w-full h-10 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
                >
                  {isLoading ? "Checking..." : "Confirm OTP"}
                </button>
              </>
            )}

            {errorStatus === "success" && (
              <>
                <h2 className="text-xl font-semibold text-green-600 mb-4">
                  🎉 You have registered successfully!
                </h2>
                <p className="text-gray-600 mb-4">Please login to continue.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full h-10 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
                >
                  Sign In
                </button>
              </>
            )}

            {errorStatus === "error" && (
              <>
                <div className="text-sm font-semibold bg-orange-300/20  p-3  mb-5 rounded-2xl">
                  ⚠️ An error occured
                </div>
                <p className="text-gray-600 mb-4">{errorMessage}</p>
                <button
                  onClick={() => {
                    setShowErrorDialog(false);
                    setErrorStatus("idle");
                    setErrorMessage(null);
                    setOtp(["", "", "", "", "", ""]);
                  }}
                  className="w-full h-10 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
