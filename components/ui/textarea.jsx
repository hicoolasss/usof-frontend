"use client";
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from "@/lib/utils";
import { Button } from './button';
import { Bold } from 'lucide-react';
import { Heading } from 'lucide-react';
import { Italic, List, View } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// Separate Preview component
const MarkdownPreview = ({ markdownText }) => (
  <div className="prose dark:prose-dark my-10">
    <h2>Preview</h2>
    <ReactMarkdown remarkPlugins={[remarkGfm]} className='bg-secondary_background_color p-7 rounded-md '>
      {markdownText}
    </ReactMarkdown>
  </div>
);

const ToolbarButton = ({ children, action, description }) => (
  <TooltipProvider>
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" onClick={action} className="w-8 h-8">
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const TextareaWithMarkdown = ({description, setDescription, className, ...props }) => {
  const textareaRef = React.useRef(null);
  // Initialize state without accessing window
  const [markdownText, setMarkdownText] = React.useState(description);
  const [isPreview, setIsPreview] = React.useState(false);

  React.useEffect(() => {
    setMarkdownText(description);
  }, [description]);

  // Update external description when markdownText changes
  React.useEffect(() => {
    setDescription(markdownText);
  }, [markdownText, setDescription]);

  const handleTextareaChange = (e) => {
    const newValue = e.target.value;
    setMarkdownText(newValue); // Update local state
    // setDescription(newValue); // Update external state - removed to avoid feedback loop
  };

  // Use useEffect to ensure code runs in the browser
  React.useEffect(() => {
    // Load saved markdown text from localStorage
    const savedMarkdownText = window.localStorage.getItem('markdownText');
    if (savedMarkdownText) {
      setMarkdownText(savedMarkdownText);
    }
    // Load saved preview state from localStorage
    const savedIsPreview = window.localStorage.getItem('isPreview');
    if (savedIsPreview) {
      setIsPreview(savedIsPreview === 'true');
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('markdownText', markdownText);
  }, [markdownText]);
  
  const insertAtCursor = (before, after = '', defaultText = '') => {
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    const textToInsert = selectedText
      ? before + selectedText + after
      : before + defaultText + after;

    setMarkdownText(
      markdownText.substring(0, startPos) +
      textToInsert +
      markdownText.substring(endPos)
    );

    textarea.focus();
    const cursorPosition = selectedText ? startPos + before.length : startPos + textToInsert.length;
    textarea.setSelectionRange(cursorPosition, cursorPosition);
  };

  // Toolbar actions
  const makeHeader = () => insertAtCursor('# ', '\n', 'Header');
  const makeBold = () => insertAtCursor('**', '**', 'Bold text');
  const makeItalic = () => insertAtCursor('*', '*', 'Italic text');
  const makeList = () => {
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdownText.substring(startPos, endPos);

    // Split the entire textarea content into an array of lines
    const allTextLines = markdownText.split('\n');
    // Calculate the start and end lines based on the selection
    const startLine = markdownText.substring(0, startPos).split('\n').length - 1;
    const endLine = markdownText.substring(0, endPos).split('\n').length - 1;

    // Map through the lines and add list syntax to the selected lines
    const newTextLines = allTextLines.map((line, idx) => {
      if (idx >= startLine && idx <= endLine && line.trim() !== '') {
        return `- ${line}`;
      }
      return line;
    });

    // Join the lines back into a full string
    const newText = newTextLines.join('\n');

    // Set the new markdown text
    setMarkdownText(newText);

    // Keep the text area focused
    textarea.focus();

    // Calculate new cursor positions. If no text was selected, the cursor should be
    // at the end of the default text. If there was a selection, the cursor should be
    // at the end of the last modified line.
    const newCursorPos = selectedText
      ? markdownText.substring(0, startPos).length + newTextLines.slice(0, endLine + 1).join('\n').length
      : startPos + '- List item'.length;

    textarea.setSelectionRange(newCursorPos, newCursorPos);
  };
  const preview = () => setIsPreview(prevState => !prevState);

  return (
    <div>
      <div className="space-x-1 mb-2 flex flex-row items-center justify-between">
        <p>Description</p>
        <div>
          <ToolbarButton action={makeHeader} description={"Heading"} ><Heading /></ToolbarButton>
          <ToolbarButton action={makeBold} description={"Bold"}><Bold /></ToolbarButton>
          <ToolbarButton action={makeItalic} description={"Italic"}><Italic /></ToolbarButton>
          <ToolbarButton action={makeList} description={"List"}><List /></ToolbarButton>
          <ToolbarButton action={preview} description={"Preview mode"}><View /></ToolbarButton>
        </div>
      </div>
      <textarea
        ref={textareaRef}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        id="description"
        value={markdownText}
        onChange={handleTextareaChange}
        {...props}
      />
      {isPreview && <MarkdownPreview markdownText={markdownText} />}
    </div>
  );
};

export { TextareaWithMarkdown };
