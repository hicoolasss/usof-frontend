"use client";
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from "@/lib/utils";
import { Button } from './button';
import { Bold } from 'lucide-react';
import { Heading1 } from 'lucide-react';
import { Italic, List } from 'lucide-react';
// Separate Preview component
const MarkdownPreview = ({ markdownText }) => (
  <div className="prose dark:prose-dark">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {markdownText}
    </ReactMarkdown>
  </div>
);

const ToolbarButton = ({ children, action }) => (
  <Button variant="ghost" size="icon" onClick={action} className="w-8 h-8">
    {children}
  </Button>
);

const TextareaWithMarkdown = ({ className, ...props }) => {
  const [markdownText, setMarkdownText] = React.useState("");
  const textareaRef = React.useRef(null);

  // Function to insert Markdown syntax at cursor position or around selected text
  const insertAtCursor = (before, after = '') => {
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const textToInsert = before + markdownText.substring(startPos, endPos) + after;
    setMarkdownText(markdownText.substring(0, startPos) + textToInsert + markdownText.substring(endPos));
    textarea.focus();
    textarea.setSelectionRange(startPos + before.length, endPos + before.length);
  };

  // Toolbar actions
  const makeHeader = () => insertAtCursor('# ', '\n');
  const makeBold = () => insertAtCursor('**', '**');
  const makeItalic = () => insertAtCursor('*', '*');
  const makeList = () => insertAtCursor('- ', '\n');

  return (
    <>
      <div className="space-x-1 mb-2">
        <ToolbarButton action={makeBold}><Heading1 /></ToolbarButton>
        <ToolbarButton action={makeHeader}><Bold /></ToolbarButton>
        <ToolbarButton action={makeItalic}><Italic /></ToolbarButton>
        <ToolbarButton action={makeList}><List /></ToolbarButton>
      </div>
      <textarea
        ref={textareaRef}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        id="description"
        value={markdownText}
        onChange={(e) => setMarkdownText(e.target.value)}
        {...props}
      />
      <MarkdownPreview markdownText={markdownText} />
    </>
  );
};

export { TextareaWithMarkdown };
