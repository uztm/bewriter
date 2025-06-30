"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Save, Bold, Italic, Underline, Tag, Upload, X, AlertCircle, Loader2, Eye, FileText } from "lucide-react"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { FormatState, TextFormatter } from "@/utils/text-formatter"
import { NotificationDialog } from "../notification-dialog"
import { useNotification } from "@/hooks/use-notification"
import { crud } from "@/app/api/apiServoce"


// --- ENHANCED TYPES ---
interface Category {
  id: string
  name: string
  description?: string
}

interface PostTag {
  id: string
  name: string
  color?: string
}

interface PostData {
  title: string
  description: string
  body: string
  category: string
  tags: string[]
  coverImage: File | null
  isPublished: boolean
}

interface ValidationErrors {
  title?: string
  description?: string
  body?: string
  category?: string
  coverImage?: string
}

// --- CONSTANTS ---
const CATEGORIES: Category[] = [
  { id: "1", name: "Travel", description: "Travel and adventure stories" },
  { id: "2", name: "Science", description: "Scientific discoveries and research" },
  { id: "3", name: "Technology", description: "Tech news and tutorials" },
  { id: "4", name: "Lifestyle", description: "Life tips and personal stories" },
  { id: "5", name: "Business", description: "Business insights and strategies" },
]

const AVAILABLE_TAGS: PostTag[] = [
  { id: "1", name: "Beginner", color: "bg-green-100 text-green-800" },
  { id: "2", name: "Advanced", color: "bg-red-100 text-red-800" },
  { id: "3", name: "Tutorial", color: "bg-blue-100 text-blue-800" },
  { id: "4", name: "News", color: "bg-purple-100 text-purple-800" },
  { id: "5", name: "Opinion", color: "bg-yellow-100 text-yellow-800" },
  { id: "6", name: "Review", color: "bg-indigo-100 text-indigo-800" },
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

export default function PostEditorPage() {
  const notification = useNotification()
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textFormatterRef = useRef<TextFormatter | null>(null)

  // --- STATE MANAGEMENT ---
  const [postData, setPostData] = useState<PostData>({
    title: "",
    description: "",
    body: "",
    category: "",
    tags: [],
    coverImage: null,
    isPublished: false,
  })

  const [formatState, setFormatState] = useState<FormatState>({
    bold: false,
    italic: false,
    underline: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isDirty, setIsDirty] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // --- INITIALIZE TEXT FORMATTER ---
  useEffect(() => {
    if (editorRef.current && !textFormatterRef.current) {
      textFormatterRef.current = new TextFormatter(editorRef.current)
    }
  }, [])

  // --- VALIDATION ---
  const validateForm = useCallback((): ValidationErrors => {
    const newErrors: ValidationErrors = {}

    if (!postData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (postData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters"
    } else if (postData.title.length > 200) {
      newErrors.title = "Title must be less than 200 characters"
    }

    if (!postData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (postData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters"
    } else if (postData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters"
    }

    if (!postData.category) {
      newErrors.category = "Please select a category"
    }

    const editorContent = editorRef.current?.textContent?.trim() || ""
    if (!editorContent) {
      newErrors.body = "Post content is required"
    } else if (editorContent.length < 50) {
      newErrors.body = "Post content must be at least 50 characters"
    }

    if (postData.coverImage) {
      if (!ALLOWED_FILE_TYPES.includes(postData.coverImage.type)) {
        newErrors.coverImage = "Please upload a valid image file (JPEG, PNG, WebP, or GIF)"
      } else if (postData.coverImage.size > MAX_FILE_SIZE) {
        newErrors.coverImage = "Image size must be less than 5MB"
      }
    }

    return newErrors
  }, [postData])

  // --- ENHANCED FORMAT HANDLING ---
  const formatText = useCallback(
    (command: "bold" | "italic" | "underline") => {
      if (!textFormatterRef.current) {
        notification.showError("Formatting Error", "Text formatter is not initialized. Please refresh the page.")
        return
      }

      const success = textFormatterRef.current.formatText(command)
      if (!success) {
        notification.showError(
          "Formatting Failed",
          `Unable to apply ${command} formatting. Please try selecting text first.`,
        )
      }
    },
    [notification],
  )

  const updateFormatState = useCallback(() => {
    if (!textFormatterRef.current) return

    try {
      const newFormatState = textFormatterRef.current.getFormatState()
      setFormatState(newFormatState)
    } catch (error) {
      console.error("Error updating format state:", error)
    }
  }, [])

  // --- EVENT HANDLERS ---
  const handleInputChange = useCallback(
    (field: keyof PostData, value: any) => {
      setPostData((prev) => ({ ...prev, [field]: value }))
      setIsDirty(true)

      // Clear specific error when user starts typing
      if (errors[field as keyof ValidationErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    },
    [errors],
  )

  const handleTagToggle = useCallback((tagId: string) => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId) ? prev.tags.filter((t) => t !== tagId) : [...prev.tags, tagId],
    }))
    setIsDirty(true)
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      // Validate file
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        notification.showError("Invalid File Type", "Please upload a valid image file (JPEG, PNG, WebP, or GIF)")
        return
      }

      if (file.size > MAX_FILE_SIZE) {
        notification.showError("File Too Large", "Image size must be less than 5MB")
        return
      }

      setPostData((prev) => ({ ...prev, coverImage: file }))
      setIsDirty(true)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Clear file error
      if (errors.coverImage) {
        setErrors((prev) => ({ ...prev, coverImage: undefined }))
      }

      notification.showSuccess("Image Uploaded", `Successfully uploaded ${file.name}`, { duration: 3000 })
    },
    [notification, errors.coverImage],
  )

  const handleRemoveImage = useCallback(() => {
    setPostData((prev) => ({ ...prev, coverImage: null }))
    setImagePreview(null)
    setIsDirty(true)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    notification.showInfo("Image Removed", "Cover image has been removed from the post", { duration: 2000 })
  }, [notification])

  const handleEditorInput = useCallback(() => {
    setIsDirty(true)
    if (errors.body) {
      setErrors((prev) => ({ ...prev, body: undefined }))
    }
  }, [errors.body])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!textFormatterRef.current) return

      // Handle formatting shortcuts
      const handled = textFormatterRef.current.handleKeyboardShortcut(e)

      // Handle save shortcut
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault()
        e.stopPropagation()
        handleSave(false)
        return
      }

      if (handled) {
        // Update format state after a short delay to allow DOM changes
        setTimeout(updateFormatState, 10)
      }
    },
    [updateFormatState],
  )

  const handleSave = async (publish = false) => {
    try {
      setIsSaving(true)

      // Update post data with publish status
      const dataToSave = { ...postData, isPublished: publish }

      // Validate form
      const validationErrors = validateForm()
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        notification.showError("Validation Error", "Please fix the errors before saving. Check the highlighted fields.")
        return
      }

      const htmlContent = editorRef.current?.innerHTML || ""

      const formData = new FormData()
      formData.append("title", dataToSave.title)
      formData.append("description", dataToSave.description)
      formData.append("body", htmlContent)
      formData.append("category", dataToSave.category)
      dataToSave.tags.forEach((tag) => formData.append("tags", tag))
      if (dataToSave.coverImage) formData.append("cover_image", dataToSave.coverImage)
      formData.append("is_published", dataToSave.isPublished.toString())
      formData.append("published_date", new Date().toISOString())

      // Simulate API call (replace with actual API)
      await crud.create("post/create/", formData)

      setIsDirty(false)
      notification.showSuccess(
        publish ? "Post Published!" : "Draft Saved!",
        publish
          ? "Your post has been published successfully and is now live."
          : "Your draft has been saved successfully. You can continue editing later.",
        { duration: 4000 },
      )
    } catch (error) {
      console.error("Save error:", error)
      notification.showError(
        "Save Failed",
        "Unable to save post due to a server error. Please check your connection and try again.",
        {
         
        },
      )
    } finally {
      setIsSaving(false)
    }
  }

  // --- EFFECTS ---
  useEffect(() => {
    const handleSelectionChange = () => {
      if (document.activeElement === editorRef.current) {
        updateFormatState()
      }
    }

    document.addEventListener("selectionchange", handleSelectionChange)
    return () => document.removeEventListener("selectionchange", handleSelectionChange)
  }, [updateFormatState])

  // Enhanced keyboard event handling
  useEffect(() => {
    const editorElement = editorRef.current
    if (!editorElement) return

    editorElement.addEventListener("keydown", handleKeyDown)
    return () => editorElement.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Warn about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?"
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [isDirty])

  // --- RENDER ---
  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Write a New Post</h1>
            <p className="text-muted-foreground mt-1">Create and publish your content</p>
          </div>
          <div className="flex items-center gap-2">
            {isDirty && (
              <Badge variant="outline" className="text-orange-600">
                Unsaved changes
              </Badge>
            )}
            <Button variant="outline" onClick={() => setPreviewMode(!previewMode)} className="gap-2">
              <Eye className="h-4 w-4" />
              {previewMode ? "Edit" : "Preview"}
            </Button>
          </div>
        </div>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter your post title..."
                value={postData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={cn(errors.title && "border-red-500")}
                maxLength={200}
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.title}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">{postData.title.length}/200 characters</p>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Brief description of your post..."
                value={postData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className={cn(errors.description && "border-red-500")}
                maxLength={500}
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.description}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">{postData.description.length}/500 characters</p>
            </div>
          </CardContent>
        </Card>

        {/* Category and Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Category & Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={postData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className={cn(errors.category && "border-red-500")}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        <div>
                          <div className="font-medium">{cat.name}</div>
                          {cat.description && <div className="text-xs text-muted-foreground">{cat.description}</div>}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <Label>Tags (Optional)</Label>
                <div className="flex gap-2 flex-wrap mt-2">
                  {AVAILABLE_TAGS.map((tag) => (
                    <Button
                      key={tag.id}
                      size="sm"
                      variant={postData.tags.includes(tag.id) ? "default" : "outline"}
                      onClick={() => handleTagToggle(tag.id)}
                      className="gap-1"
                    >
                      <Tag className="h-3 w-3" />
                      {tag.name}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Selected: {postData.tags.length} tags</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cover Image */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Cover Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!imagePreview ? (
              <div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={cn(errors.coverImage && "border-red-500")}
                />
                {errors.coverImage && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.coverImage}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Supported formats: JPEG, PNG, WebP, GIF. Max size: 5MB
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative inline-block">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Cover preview"
                    className="max-w-xs max-h-48 rounded-lg border object-cover"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {postData.coverImage?.name} ({((postData.coverImage?.size || 0) / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Content *</CardTitle>
          </CardHeader>
          <CardContent>
            {!previewMode ? (
              <>
                {/* Enhanced Toolbar */}
                <div className="flex gap-2 bg-muted/50 border rounded-lg p-2 mb-4">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => formatText("bold")}
                    variant={formatState.bold ? "default" : "outline"}
                    aria-label="Bold (Ctrl+B)"
                    title="Bold (Ctrl+B)"
                    className={cn(
                      "transition-all duration-200",
                      formatState.bold && "bg-primary text-primary-foreground shadow-sm",
                    )}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => formatText("italic")}
                    variant={formatState.italic ? "default" : "outline"}
                    aria-label="Italic (Ctrl+I)"
                    title="Italic (Ctrl+I)"
                    className={cn(
                      "transition-all duration-200",
                      formatState.italic && "bg-primary text-primary-foreground shadow-sm",
                    )}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => formatText("underline")}
                    variant={formatState.underline ? "default" : "outline"}
                    aria-label="Underline (Ctrl+U)"
                    title="Underline (Ctrl+U)"
                    className={cn(
                      "transition-all duration-200",
                      formatState.underline && "bg-primary text-primary-foreground shadow-sm",
                    )}
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                  <div className="flex-1" />
                  <div className="text-xs text-muted-foreground flex items-center">
                    Formatting: {formatState.bold && "Bold"} {formatState.italic && "Italic"}{" "}
                    {formatState.underline && "Underline"}
                  </div>
                </div>

                {/* Enhanced Editor */}
                <div
                  ref={editorRef}
                  contentEditable
                  className={cn(
                    "min-h-[300px] p-4 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring prose dark:prose-invert max-w-none",
                    errors.body && "border-red-500",
                    "empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:pointer-events-none",
                  )}
                  onInput={handleEditorInput}
                  suppressContentEditableWarning
                  role="textbox"
                  aria-label="Post content editor"
                  aria-multiline="true"
                  data-placeholder="Start writing your post content here... Use Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline"
                />
                {errors.body && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.body}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  <strong>Keyboard shortcuts:</strong> Ctrl+B (Bold), Ctrl+I (Italic), Ctrl+U (Underline), Ctrl+S (Save)
                </p>
              </>
            ) : (
              <div className="min-h-[300px] p-4 border rounded-lg bg-muted/20">
                <div className="prose dark:prose-invert max-w-none">
                  <h1>{postData.title || "Untitled Post"}</h1>
                  <p className="text-muted-foreground">{postData.description}</p>
                  {imagePreview && <img src={imagePreview || "/placeholder.svg"} alt="Cover" className="rounded-lg" />}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: editorRef.current?.innerHTML || "<p>No content yet...</p>",
                    }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {isDirty ? "You have unsaved changes" : "All changes saved"}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => handleSave(false)} disabled={isSaving} className="gap-2">
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Draft
            </Button>
            <Button
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Publish Post
            </Button>
          </div>
        </div>

        {/* Enhanced Help Text */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Tips:</strong> Use the formatting toolbar or keyboard shortcuts to style your text. Save drafts
            frequently using Ctrl+S. Preview your post before publishing. All fields marked with * are required.
          </AlertDescription>
        </Alert>
      </div>

      {/* Notification Dialog */}
      <NotificationDialog message={notification.currentMessage} onClose={notification.clearNotification} />
    </>
  )
}
