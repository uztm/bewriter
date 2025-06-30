"use client"

import { useState, useCallback } from "react"
import type { NotificationMessage } from "../components/notification-dialog"

let notificationId = 0

export function useNotification() {
  const [currentMessage, setCurrentMessage] = useState<NotificationMessage | null>(null)

  const showNotification = useCallback(
    (
      title: string,
      description: string,
      type: NotificationMessage["type"] = "info",
      options?: {
        duration?: number
        action?: {
          label: string
          onClick: () => void
        }
      },
    ) => {
      const message: NotificationMessage = {
        id: `notification-${++notificationId}`,
        title,
        description,
        type,
        duration: options?.duration,
        action: options?.action,
      }

      setCurrentMessage(message)
    },
    [],
  )

  const clearNotification = useCallback(() => {
    setCurrentMessage(null)
  }, [])

  // Convenience methods
  const showSuccess = useCallback(
    (title: string, description: string, options?: { duration?: number }) => {
      showNotification(title, description, "success", options)
    },
    [showNotification],
  )

  const showError = useCallback(
    (title: string, description: string, options?: { duration?: number }) => {
      showNotification(title, description, "error", options)
    },
    [showNotification],
  )

  const showWarning = useCallback(
    (title: string, description: string, options?: { duration?: number }) => {
      showNotification(title, description, "warning", options)
    },
    [showNotification],
  )

  const showInfo = useCallback(
    (title: string, description: string, options?: { duration?: number }) => {
      showNotification(title, description, "info", options)
    },
    [showNotification],
  )

  return {
    currentMessage,
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    clearNotification,
  }
}
