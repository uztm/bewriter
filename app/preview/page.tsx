"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MyPostsPage from "@/components/editor/MyPostsList";

export default function PreviewPage() {
  const [content, setContent] = useState<string | null>(null);

  // Load content from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("savedContent");
    setContent(saved);
  }, []);

  // Initialize editor only when content is loaded (not null)
  const editor = useEditor(
    {
      editable: false,
      extensions: [StarterKit],
      content: content || "", // fallback empty string if null
    },
    [content]
  ); // re-init editor when content changes

  if (!editor || content === null) {
    // While loading content or editor not ready, show loading or empty
    return <div>Loading preview...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4">Preview</h1>
      <MyPostsPage />
    </div>
  );
}
