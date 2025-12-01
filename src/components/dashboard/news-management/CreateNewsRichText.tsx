'use client';
import { clearFormError, setFormError } from '@/features/newsSlice';
import { RootState } from '@/lib/store';
import { uploadImageToS3 } from '@/utils/uploadImageToS3';
import React, { useRef, useEffect } from 'react';
import {
  FaBold, FaItalic, FaUnderline, FaListUl, FaListOl,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink,
  FaUndo, FaRedo, FaImage
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

interface CreateNewsRichTextProps {
  details: string;
  setDetails: (value: string) => void;
}

function decodeHTML(html: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const CreateNewsRichText: React.FC<CreateNewsRichTextProps> = ({ details, setDetails }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formErrors = useSelector((state: RootState) => state.news.formErrors);
  const dispatch = useDispatch()

  useEffect(() => {

  //   if (!editorRef.current) return;
  //   const decoded = decodeHTML(details).replace(/<img[^<>]*<img/gi, '<img');

  //  if (editorRef.current.innerHTML.trim() !== decoded.trim()) {
  //     editorRef.current.innerHTML = decoded;
  //   }

    if (editorRef.current && editorRef.current.innerHTML !== details) {
      if (document.activeElement !== editorRef.current) {
        let decoded = decodeHTML(details);
        decoded = decoded.replace(/<img[^<>]*<img/gi, '<img');
        editorRef.current.innerHTML = decoded;
      }
    }
  }, [details]);

  const exec = (command: string, value: string | null = null) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value ?? undefined);
      setDetails(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const htmlContent = editorRef.current.innerHTML;
      setDetails(htmlContent);
      if (!htmlContent || htmlContent === '<br>' || htmlContent.trim() === '') {
        dispatch(setFormError({ field: "details", message: 'News details are required.' }));
      } else {
        dispatch(clearFormError("details"));
      }
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) exec('createLink', url);
  };

  const insertImages = async (files: FileList | null) => {
    if (!files || !editorRef.current) return;

    const editor = editorRef.current; // safe copy

    for (const file of Array.from(files)) {
      const { url, error } = await uploadImageToS3(file, "uploads");
      if (!url || error) return;

      const img = document.createElement('img');
      img.src = url;
      img.className = 'max-w-full my-2 rounded';

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(img);

        const spacer = document.createElement('br');
        img.after(spacer);

        const newRange = document.createRange();
        newRange.setStartAfter(spacer);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      } else {
        editor.appendChild(img); // no TS error here
      }

      setDetails(editor.innerHTML);
    };
  };

  return (
    <div>
      <label className="block font-medium mb-1">News Details</label>

      {/* Toolbar */}
      <div className="border rounded-t-md bg-gray-50 px-3 py-2 flex flex-wrap items-center gap-3 text-gray-600 text-sm">
        <button type="button" onClick={() => exec('undo')}><FaUndo /></button>
        <button type="button" onClick={() => exec('redo')}><FaRedo /></button>

        <span className="mx-2">|</span>
        <button type="button" onClick={() => exec('bold')}><FaBold /></button>
        <button type="button" onClick={() => exec('italic')}><FaItalic /></button>
        <button type="button" onClick={() => exec('underline')}><FaUnderline /></button>

        <span className="mx-2">|</span>
        <button type="button" onClick={() => exec('justifyLeft')}><FaAlignLeft /></button>
        <button type="button" onClick={() => exec('justifyCenter')}><FaAlignCenter /></button>
        <button type="button" onClick={() => exec('justifyRight')}><FaAlignRight /></button>

        <button type="button" onClick={() => exec('insertUnorderedList')}><FaListUl /></button>
        <button type="button" onClick={() => exec('insertOrderedList')}><FaListOl /></button>

        <button type="button" onClick={insertLink}><FaLink /></button>

        <button type="button" onClick={() => fileInputRef.current?.click()}><FaImage /></button>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={(e) => insertImages(e.target.files)}
          className="hidden"
        />

        <span className="text-gray-500 ml-auto">Tags</span>
      </div>

      {/* Editor */}
      <div
        key={details}
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="w-full border-t-0 border rounded-b-md p-3 min-h-[150px] text-sm bg-white focus:outline-none"
      />
      {formErrors.details && <p className="text-red-500 text-sm mt-1">{formErrors.details}</p>}

      {/* Optional styles for inserted content */}
      <style>{`
        div[contenteditable] img {
          display: block;
          margin: 10px 0;
          max-width: 100%;
          border-radius: 0.5rem;
        }
        div[contenteditable] ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        div[contenteditable] ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }
        div[contenteditable] li {
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  );
};

export default CreateNewsRichText;
