// 'use client';

import RichTextEditor from "@/components/editor/MarkdownEditor";
import RichMarkdownEditor from "@/components/editor/MarkdownEditor";
import MyPostsList from "@/components/editor/MyPostsList";
import { Separator } from "@/components/ui/separator";

// import React, { useRef, useState, useEffect } from 'react';
// import {
//   Bold,
//   Italic,
//   Underline,
//   Heading1,
//   Heading2,
//   List,
//   ListOrdered,
//   Quote,
//   Link,
//   Image as ImageIcon,
//   Save,
// } from 'lucide-react';

// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils"; // utility class merger

// export default function RichTextEditor() {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [htmlContent, setHtmlContent] = useState('');
//   const [activeFormats, setActiveFormats] = useState<string[]>([]);

//   const exec = (command: string, value: string | null = null) => {
//     document.execCommand(command, false, value);
//     editorRef.current?.focus();
//   };

//   const insertImage = (file: File) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const img = `<img src="${reader.result}" class="max-w-full my-2 rounded shadow" />`;
//       exec('insertHTML', img);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) insertImage(file);
//     e.target.value = '';
//   };

//   const promptLink = () => {
//     const url = prompt('Enter a URL');
//     if (url) exec('createLink', url);
//   };

//   const applyHeading = (tag: string) => {
//     exec('formatBlock', tag);
//   };

//   const checkActiveFormatting = () => {
//     const newStates: string[] = [];
//     const commands = ['bold', 'italic', 'underline'];

//     for (const cmd of commands) {
//       if (document.queryCommandState(cmd)) newStates.push(cmd);
//     }

//     const block = document.queryCommandValue('formatBlock');
//     if (block === 'blockquote') newStates.push('blockquote');
//     if (block === 'h1') newStates.push('h1');
//     if (block === 'h2') newStates.push('h2');
//     if (document.queryCommandState('insertUnorderedList')) newStates.push('ul');
//     if (document.queryCommandState('insertOrderedList')) newStates.push('ol');

//     setActiveFormats(newStates);
//   };

//   useEffect(() => {
//     const handleSelectionChange = () => {
//       if (document.activeElement === editorRef.current) {
//         checkActiveFormatting();
//       }
//     };
//     document.addEventListener('selectionchange', handleSelectionChange);
//     return () => {
//       document.removeEventListener('selectionchange', handleSelectionChange);
//     };
//   }, []);

//   const isActive = (cmd: string) => activeFormats.includes(cmd);

//   return (
//     <div className="max-w-3xl mx-auto space-y-4 p-4 border rounded-xl bg-white shadow-sm">
//       <div className="flex flex-wrap gap-2">
//         <ToolbarIcon title="H1" icon={<Heading1 size={16} />} onClick={() => applyHeading('h1')} active={isActive('h1')} />
//         <ToolbarIcon title="H2" icon={<Heading2 size={16} />} onClick={() => applyHeading('h2')} active={isActive('h2')} />
//         <ToolbarIcon title="Bold" icon={<Bold size={16} />} onClick={() => exec('bold')} active={isActive('bold')} />
//         <ToolbarIcon title="Italic" icon={<Italic size={16} />} onClick={() => exec('italic')} active={isActive('italic')} />
//         <ToolbarIcon title="Underline" icon={<Underline size={16} />} onClick={() => exec('underline')} active={isActive('underline')} />
//         <ToolbarIcon title="UL" icon={<List size={16} />} onClick={() => exec('insertUnorderedList')} active={isActive('ul')} />
//         <ToolbarIcon title="OL" icon={<ListOrdered size={16} />} onClick={() => exec('insertOrderedList')} active={isActive('ol')} />
//         <ToolbarIcon title="Quote" icon={<Quote size={16} />} onClick={() => applyHeading('blockquote')} active={isActive('blockquote')} />
//         <ToolbarIcon title="Link" icon={<Link size={16} />} onClick={promptLink} />
//         <ToolbarIcon title="Image" icon={<ImageIcon size={16} />} onClick={() => fileInputRef.current?.click()} />
//         <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleImageUpload} />
//         <Button variant="default" onClick={() => {
//           const html = editorRef.current?.innerHTML || '';
//           console.log('Payload:', html);
//           setHtmlContent(html);
//         }} className="ml-auto flex gap-2">
//           <Save size={16} /> Save
//         </Button>
//       </div>

//       <Separator />

//       <div
//         ref={editorRef}
//         contentEditable
//         suppressContentEditableWarning
//         className="min-h-[250px] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 prose max-w-none"
//         onInput={() => setHtmlContent(editorRef.current?.innerHTML || '')}
//       />

//       <Separator />

//       <div className="pt-2">
//         <h4 className="text-sm font-semibold mb-2 text-gray-600">Live Preview</h4>
//         <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
//       </div>
//     </div>
//   );
// }

// function ToolbarIcon({
//   icon,
//   title,
//   onClick,
//   active = false,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   onClick: () => void;
//   active?: boolean;
// }) {
//   return (
//     <Button
//       type="button"
//       variant={active ? "default" : "outline"}
//       size="icon"
//       title={title}
//       onClick={onClick}
//       className={cn("w-9 h-9", active && "bg-blue-500 text-white hover:bg-blue-600")}
//     >
//       {icon}
//     </Button>
//   );
// }

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto">
        <div className="text-center mb-8"></div>
        <RichTextEditor />

        <Separator/>

        <MyPostsList/>
      </div>
    </main>
  );
}
