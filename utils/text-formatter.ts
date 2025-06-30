/**
 * Enhanced text formatting utilities with improved reliability
 * Combines modern approaches with fallbacks for better browser compatibility
 */

export interface FormatState {
    bold: boolean
    italic: boolean
    underline: boolean
  }
  
  export class TextFormatter {
    private editorRef: HTMLDivElement
  
    constructor(editorRef: HTMLDivElement) {
      this.editorRef = editorRef
    }
  
    /**
     * Apply formatting to selected text with improved reliability
     * Uses execCommand as primary method with modern fallbacks
     */
    formatText(command: "bold" | "italic" | "underline"): boolean {
      try {
        // Ensure editor is focused
        this.editorRef.focus()
  
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) {
          return false
        }
  
        // Try execCommand first (most reliable for contentEditable)
        if (document.execCommand) {
          const success = document.execCommand(command, false, undefined)
          if (success) {
            // Force a selection change event to update UI state
            this.triggerSelectionChange()
            return true
          }
        }
  
        // Fallback to manual DOM manipulation
        return this.manualFormat(command, selection)
      } catch (error) {
        console.error(`Error applying ${command} formatting:`, error)
        return false
      }
    }
  
    /**
     * Manual formatting fallback for when execCommand fails
     */
    private manualFormat(command: "bold" | "italic" | "underline", selection: Selection): boolean {
      try {
        const range = selection.getRangeAt(0)
        const selectedText = range.toString()
  
        if (!selectedText) {
          // No text selected, insert formatting at cursor
          return this.insertFormattingAtCursor(command, range)
        }
  
        // Text is selected, wrap it with formatting
        return this.wrapSelectedText(command, range, selectedText)
      } catch (error) {
        console.error("Manual formatting failed:", error)
        return false
      }
    }
  
    /**
     * Insert formatting element at cursor position
     */
    private insertFormattingAtCursor(command: "bold" | "italic" | "underline", range: Range): boolean {
      const element = this.createFormattingElement(command)
      element.innerHTML = "\u200B" // Zero-width space to maintain cursor position
      
      range.deleteContents()
      range.insertNode(element)
      
      // Position cursor inside the formatting element
      const newRange = document.createRange()
      newRange.setStart(element, 0)
      newRange.setEnd(element, 1)
      
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(newRange)
      }
      
      this.triggerSelectionChange()
      return true
    }
  
    /**
     * Wrap selected text with formatting element
     */
    private wrapSelectedText(command: "bold" | "italic" | "underline", range: Range, selectedText: string): boolean {
      const element = this.createFormattingElement(command)
      element.textContent = selectedText
      
      range.deleteContents()
      range.insertNode(element)
      
      // Select the newly formatted text
      const newRange = document.createRange()
      newRange.selectNodeContents(element)
      
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(newRange)
      }
      
      this.triggerSelectionChange()
      return true
    }
  
    /**
     * Create appropriate formatting element
     */
    private createFormattingElement(command: "bold" | "italic" | "underline"): HTMLElement {
      switch (command) {
        case "bold":
          return document.createElement("strong")
        case "italic":
          return document.createElement("em")
        case "underline":
          return document.createElement("u")
        default:
          throw new Error(`Unknown formatting command: ${command}`)
      }
    }
  
    /**
     * Get current formatting state at cursor/selection
     */
    getFormatState(): FormatState {
      try {
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) {
          return { bold: false, italic: false, underline: false }
        }
  
        // Use queryCommandState if available (most reliable)
        if (document.queryCommandState) {
          return {
            bold: document.queryCommandState("bold"),
            italic: document.queryCommandState("italic"),
            underline: document.queryCommandState("underline"),
          }
        }
  
        // Fallback to manual detection
        return this.manualDetectFormatState(selection)
      } catch (error) {
        console.error("Error detecting format state:", error)
        return { bold: false, italic: false, underline: false }
      }
    }
  
    /**
     * Manual format state detection
     */
    private manualDetectFormatState(selection: Selection): FormatState {
      const range = selection.getRangeAt(0)
      let element = range.commonAncestorContainer
  
      // If text node, get parent element
      if (element.nodeType === Node.TEXT_NODE) {
        element = element.parentElement || element
      }
  
      let bold = false
      let italic = false
      let underline = false
  
      // Walk up the DOM tree to check for formatting
      let currentElement = element as Element
      while (currentElement && currentElement !== this.editorRef) {
        const tagName = currentElement.tagName?.toLowerCase()
        const computedStyle = window.getComputedStyle(currentElement)
  
        // Check for bold
        if (!bold && (
          tagName === "strong" || 
          tagName === "b" || 
          computedStyle.fontWeight === "bold" || 
          parseInt(computedStyle.fontWeight) >= 700
        )) {
          bold = true
        }
  
        // Check for italic
        if (!italic && (
          tagName === "em" || 
          tagName === "i" || 
          computedStyle.fontStyle === "italic"
        )) {
          italic = true
        }
  
        // Check for underline
        if (!underline && (
          tagName === "u" || 
          computedStyle.textDecorationLine?.includes("underline")
        )) {
          underline = true
        }
  
        currentElement = currentElement.parentElement as Element
      }
  
      return { bold, italic, underline }
    }
  
    /**
     * Trigger selection change event to update UI
     */
    private triggerSelectionChange(): void {
      // Dispatch a custom event to trigger state updates
      setTimeout(() => {
        const event = new Event("selectionchange", { bubbles: true })
        document.dispatchEvent(event)
      }, 0)
    }
  
    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcut(event: KeyboardEvent): boolean {
      const { ctrlKey, metaKey, key } = event
      
      // Check for modifier key (Ctrl on Windows/Linux, Cmd on Mac)
      if (!ctrlKey && !metaKey) {
        return false
      }
  
      let command: "bold" | "italic" | "underline" | null = null
  
      switch (key.toLowerCase()) {
        case "b":
          command = "bold"
          break
        case "i":
          command = "italic"
          break
        case "u":
          command = "underline"
          break
        default:
          return false
      }
  
      if (command) {
        event.preventDefault()
        event.stopPropagation()
        return this.formatText(command)
      }
  
      return false
    }
  }
  