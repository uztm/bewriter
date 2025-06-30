"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'

export interface NotificationMessage {
  id: string
  title: string
  description: string
  type: "success" | "error" | "warning" | "info"
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationDialogProps {
  message: NotificationMessage | null
  onClose: () => void
}

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const colorMap = {
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-yellow-600",
  info: "text-blue-600",
}

export function NotificationDialog({ message, onClose }: NotificationDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (message) {
      setIsOpen(true)
      
      // Auto-close after duration if specified
      if (message.duration && message.duration > 0) {
        const timer = setTimeout(() => {
          handleClose()
        }, message.duration)
        
        return () => clearTimeout(timer)
      }
    }
  }, [message])

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(onClose, 150) // Allow animation to complete
  }

  if (!message) return null

  const Icon = iconMap[message.type]

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${colorMap[message.type]}`} />
            {message.title}
          </DialogTitle>
          <DialogDescription className="text-left">
            {message.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          {message.action && (
            <Button
              variant="outline"
              onClick={() => {
                message.action!.onClick()
                handleClose()
              }}
            >
              {message.action.label}
            </Button>
          )}
          <Button onClick={handleClose}>
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
