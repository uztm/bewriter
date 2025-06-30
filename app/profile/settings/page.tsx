"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, Save, Eye, EyeOff, CheckCircle, AlertCircle, User, Mail, Lock, Globe, AtSign } from "lucide-react"

interface ProfileData {
  fullName: string
  username: string
  email: string
  bio: string
  website: string
  location: string
}

interface PasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface ValidationErrors {
  [key: string]: string
}

export default function ProfileSettings() {
  // Profile form state
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    bio: "Full-stack developer passionate about creating amazing web experiences. Love sharing knowledge through writing and open source contributions.",
    website: "https://johndoe.dev",
    location: "San Francisco, CA",
  })

  // Password form state
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // UI state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isProfileLoading, setIsProfileLoading] = useState(false)
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)
  const [profileErrors, setProfileErrors] = useState<ValidationErrors>({})
  const [passwordErrors, setPasswordErrors] = useState<ValidationErrors>({})
  const [profileSuccess, setProfileSuccess] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
    return usernameRegex.test(username)
  }

  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)
  }

  const validateUrl = (url: string): boolean => {
    if (!url) return true // Optional field
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  // Profile form validation
  const validateProfileForm = (): boolean => {
    const errors: ValidationErrors = {}

    if (!profileData.fullName.trim()) {
      errors.fullName = "Full name is required"
    } else if (profileData.fullName.trim().length < 2) {
      errors.fullName = "Full name must be at least 2 characters"
    }

    if (!profileData.username.trim()) {
      errors.username = "Username is required"
    } else if (!validateUsername(profileData.username)) {
      errors.username = "Username must be 3-20 characters and contain only letters, numbers, and underscores"
    }

    if (!profileData.email.trim()) {
      errors.email = "Email is required"
    } else if (!validateEmail(profileData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (profileData.bio.length > 500) {
      errors.bio = "Bio must be less than 500 characters"
    }

    if (profileData.website && !validateUrl(profileData.website)) {
      errors.website = "Please enter a valid URL"
    }

    setProfileErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Password form validation
  const validatePasswordForm = (): boolean => {
    const errors: ValidationErrors = {}

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required"
    }

    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required"
    } else if (!validatePassword(passwordData.newPassword)) {
      errors.newPassword = "Password must be at least 8 characters with uppercase, lowercase, and number"
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password"
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    if (passwordData.currentPassword === passwordData.newPassword && passwordData.currentPassword) {
      errors.newPassword = "New password must be different from current password"
    }

    setPasswordErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle profile form submission
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileSuccess("")

    if (!validateProfileForm()) return

    setIsProfileLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setProfileSuccess("Profile updated successfully!")
      setProfileErrors({})
    } catch (error) {
      setProfileErrors({ general: "Failed to update profile. Please try again." })
    } finally {
      setIsProfileLoading(false)
    }
  }

  // Handle password form submission
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordSuccess("")

    if (!validatePasswordForm()) return

    setIsPasswordLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setPasswordSuccess("Password changed successfully!")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setPasswordErrors({})
    } catch (error) {
      setPasswordErrors({ general: "Failed to change password. Please try again." })
    } finally {
      setIsPasswordLoading(false)
    }
  }

  // Handle avatar upload
  const handleAvatarUpload = () => {
    // Simulate file upload
    console.log("Avatar upload triggered")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
          </div>

          {/* Profile Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and public profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
                    <AvatarFallback className="text-2xl font-semibold">
                      {profileData.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-md"
                    onClick={handleAvatarUpload}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload a new profile picture. Recommended size: 400x400px
                  </p>
                  <Button variant="outline" size="sm" onClick={handleAvatarUpload}>
                    Change Avatar
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Profile Form */}
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                {profileSuccess && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">{profileSuccess}</AlertDescription>
                  </Alert>
                )}

                {profileErrors.general && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{profileErrors.general}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, fullName: e.target.value }))}
                      className={profileErrors.fullName ? "border-red-500" : ""}
                    />
                    {profileErrors.fullName && <p className="text-sm text-red-500">{profileErrors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username *</Label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        value={profileData.username}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, username: e.target.value }))}
                        className={`pl-10 ${profileErrors.username ? "border-red-500" : ""}`}
                      />
                    </div>
                    {profileErrors.username && <p className="text-sm text-red-500">{profileErrors.username}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                      className={`pl-10 ${profileErrors.email ? "border-red-500" : ""}`}
                    />
                  </div>
                  {profileErrors.email && <p className="text-sm text-red-500">{profileErrors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                    className={`min-h-[100px] ${profileErrors.bio ? "border-red-500" : ""}`}
                    placeholder="Tell us about yourself..."
                  />
                  <div className="flex justify-between items-center">
                    {profileErrors.bio && <p className="text-sm text-red-500">{profileErrors.bio}</p>}
                    <p className="text-sm text-muted-foreground ml-auto">{profileData.bio.length}/500 characters</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="website"
                        type="url"
                        value={profileData.website}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, website: e.target.value }))}
                        className={`pl-10 ${profileErrors.website ? "border-red-500" : ""}`}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                    {profileErrors.website && <p className="text-sm text-red-500">{profileErrors.website}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isProfileLoading} className="gap-2">
                    {isProfileLoading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Password Change Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Change Password
              </CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                {passwordSuccess && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">{passwordSuccess}</AlertDescription>
                  </Alert>
                )}

                {passwordErrors.general && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{passwordErrors.general}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password *</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                      className={`pr-10 ${passwordErrors.currentPassword ? "border-red-500" : ""}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {passwordErrors.currentPassword && (
                    <p className="text-sm text-red-500">{passwordErrors.currentPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password *</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                      className={`pr-10 ${passwordErrors.newPassword ? "border-red-500" : ""}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {passwordErrors.newPassword && <p className="text-sm text-red-500">{passwordErrors.newPassword}</p>}
                  <div className="text-xs text-muted-foreground">
                    Password must contain at least 8 characters with uppercase, lowercase, and number
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      className={`pr-10 ${passwordErrors.confirmPassword ? "border-red-500" : ""}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className="text-sm text-red-500">{passwordErrors.confirmPassword}</p>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isPasswordLoading} className="gap-2">
                    {isPasswordLoading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Changing...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Change Password
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Security Tip:</strong> Use a strong, unique password and consider enabling two-factor
              authentication for additional security.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
