// import React from 'react'
// import { FaBold, FaItalic, FaLink, FaListOl, FaListUl, FaStrikethrough, FaUnderline } from "react-icons/fa";

// const TextEditor = ({title}:{title:string}) => {
//     return (
//         <>

//                 <div className="">
//                     <div className="space-y-1">
//                         <label className="text-xs font-medium text-gray-600">{title}</label>
//                         <div className="border border-gray-200 rounded-md shadow-sm">
//                             <textarea
//                                 placeholder="Add your job description..."
//                                 rows={5}
//                                 className="w-full resize-none border-none p-3 focus:outline-none text-sm text-gray-700"
//                             />
//                             <div className="flex items-center space-x-4 p-2 border-t border-gray-200 text-gray-400 text-sm">
//                                 <button className="hover:text-black" title="Bold">
//                                     <FaBold className="w-4 h-4" />
//                                 </button>
//                                 <button className="hover:text-black" title="Italic">
//                                     <FaItalic className="w-4 h-4" />
//                                 </button>
//                                 <button className="hover:text-black" title="Underline">
//                                     <FaUnderline className="w-4 h-4" />
//                                 </button>
//                                 <button className="hover:text-black" title="Strikethrough">
//                                     <FaStrikethrough className="w-4 h-4" />
//                                 </button>
//                                 <button className="hover:text-black" title="Link">
//                                     <FaLink className="w-4 h-4" />
//                                 </button>
//                                 <button className="hover:text-black" title="Bullet List">
//                                     <FaListUl className="w-4 h-4" />
//                                 </button>
//                                 <button className="hover:text-black" title="Numbered List">
//                                     <FaListOl className="w-4 h-4" />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//         </>
//     )
// }

// export default TextEditor

"use client";
import React, { useEffect, useRef } from "react";
import {
  FaBold,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa";

interface TextEditorProps {
  title: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ title }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  // Initialize editor with a paragraph if empty on mount
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML.trim() === "") {
      editorRef.current.innerHTML = "<p><br></p>";
    }
  }, []);

  // Place caret at start helper
  const placeCaretAtStart = (el: HTMLElement) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(el, 0);
    range.collapse(true);
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const exec = (command: string, value: string | null = null) => {
    if (!editorRef.current) return;

    editorRef.current.focus();

    if (
      editorRef.current.innerHTML === "" ||
      editorRef.current.innerHTML === "<br>" ||
      editorRef.current.innerHTML === "<p><br></p>"
    ) {
      editorRef.current.innerHTML = "<p><br></p>";
      const p = editorRef.current.querySelector("p");
      if (p) placeCaretAtStart(p);
    }

    document.execCommand(command, false, value ?? undefined);
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) exec("createLink", url);
  };

  return (
    <>
      {/* CSS to show bullets and numbers properly inside contenteditable */}
      <style>{`
        [contenteditable][data-placeholder]:empty::before {
          content: attr(data-placeholder);
          pointer-events: none;
          display: block;
          color: #9ca3af; /* Tailwind gray-400 */
          user-select: none;
        }
        div[contenteditable] ul {
          list-style-type: disc;
          margin-left: 1.25rem;
          padding-left: 0;
        }
        div[contenteditable] ol {
          list-style-type: decimal;
          margin-left: 1.25rem;
          padding-left: 0;
        }
      `}</style>

      <div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-600">{title}</label>
          <div className="border border-gray-200 rounded-md shadow-sm">
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              data-placeholder="Add your job description..."
              className="w-full resize-none border-none p-3 focus:outline-none text-sm text-gray-700 min-h-[120px]"
            />

            <div className="flex items-center space-x-4 p-2 border-t border-gray-200 text-gray-400 text-sm">
              <button
                type="button"
                className="hover:text-black"
                title="Bold"
                onClick={(e) => {
                  e.preventDefault();
                  exec("bold");
                }}
              >
                <FaBold className="w-4 h-4" />
              </button>

              <button
                type="button"
                className="hover:text-black"
                title="Italic"
                onClick={(e) => {
                  e.preventDefault();
                  exec("italic");
                }}
              >
                <FaItalic className="w-4 h-4" />
              </button>

              <button
                type="button"
                className="hover:text-black"
                title="Underline"
                onClick={(e) => {
                  e.preventDefault();
                  exec("underline");
                }}
              >
                <FaUnderline className="w-4 h-4" />
              </button>

              <button
                type="button"
                className="hover:text-black"
                title="Strikethrough"
                onClick={(e) => {
                  e.preventDefault();
                  exec("strikeThrough");
                }}
              >
                <FaStrikethrough className="w-4 h-4" />
              </button>

              <button
                type="button"
                className="hover:text-black"
                title="Link"
                onClick={(e) => {
                  e.preventDefault();
                  insertLink();
                }}
              >
                <FaLink className="w-4 h-4" />
              </button>

              <button
                type="button"
                className="hover:text-black"
                title="Bullet List"
                onClick={(e) => {
                  e.preventDefault();
                  exec("insertUnorderedList");
                }}
              >
                <FaListUl className="w-4 h-4" />
              </button>

              <button
                type="button"
                className="hover:text-black"
                title="Numbered List"
                onClick={(e) => {
                  e.preventDefault();
                  exec("insertOrderedList");
                }}
              >
                <FaListOl className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextEditor;
