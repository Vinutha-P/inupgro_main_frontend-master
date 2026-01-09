"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaLink,
  FaImage,
  FaUndo,
  FaRedo,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

// Rich Text Editor Component
const RichTextEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder = "Add your description..." }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      if (document.activeElement !== editorRef.current) {
        editorRef.current.innerHTML = value || "<p><br></p>";
      }
    }
  }, [value]);

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML.trim()) {
      editorRef.current.innerHTML = "<p><br></p>";
    }
  }, []);

  const exec = (command: string, value: string | null = null) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value ?? undefined);
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) exec("createLink", url);
  };

  return (
    <div className="border border-gray-200 rounded-md">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-gray-50 flex-wrap">
        <button
          type="button"
          onClick={() => exec("undo")}
          className="p-1.5 hover:bg-gray-200 rounded"
          title="Undo"
        >
          <FaUndo className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec("redo")}
          className="p-1.5 hover:bg-gray-200 rounded"
          title="Redo"
        >
          <FaRedo className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <select
          onChange={(e) => {
            if (editorRef.current) {
              editorRef.current.style.fontSize = e.target.value;
            }
          }}
          className="text-sm border border-gray-300 rounded px-2 py-1"
          defaultValue="16"
        >
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
          <option value="20">20</option>
        </select>
        <button
          type="button"
          onClick={() => exec("bold")}
          className="p-1.5 hover:bg-gray-200 rounded"
          title="Bold"
        >
          <FaBold className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec("italic")}
          className="p-1.5 hover:bg-gray-200 rounded"
          title="Italic"
        >
          <FaItalic className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec("underline")}
          className="p-1.5 hover:bg-gray-200 rounded"
          title="Underline"
        >
          <FaUnderline className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec("strikeThrough")}
          className="p-1.5 hover:bg-gray-200 rounded"
          title="Strikethrough"
        >
          <FaStrikethrough className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => exec("insertUnorderedList")}
          className="p-1.5 hover:bg-gray-200 rounded"
          title="Bullet List"
        >
          <FaListUl className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec("insertOrderedList")}
          className="p-1.5 hover:bg-gray-200 rounded"
          title="Numbered List"
        >
          <FaListOl className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => exec("justifyLeft")}
          className="p-1.5 hover:bg-gray-200 rounded"
          title="Align Left"
        >
          <FaAlignLeft className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec("justifyCenter")}
          className="p-1.5 hover:bg-gray-200 rounded"
          title="Align Center"
        >
          <FaAlignCenter className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec("justifyRight")}
          className="p-1.5 hover:bg-gray-200 rounded"
          title="Align Right"
        >
          <FaAlignRight className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => exec("justifyFull")}
          className="p-1.5 hover:bg-gray-200 rounded"
          title="Justify"
        >
          <FaAlignJustify className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={insertLink}
          className="p-1.5 hover:bg-gray-200 rounded"
          title="Link"
        >
          <FaLink className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => document.getElementById("image-upload")?.click()}
          className="p-1.5 hover:bg-gray-200 rounded"
          title="Image"
        >
          <FaImage className="w-3.5 h-3.5" />
        </button>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            // Handle image upload
          }}
        />
        <div className="ml-auto">
          <button
            type="button"
            className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
          >
            Tags
          </button>
        </div>
      </div>
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        className="w-full min-h-[200px] p-4 text-sm focus:outline-none"
        style={{
          fontSize: "16px",
        }}
      />
      <style>{`
        [contenteditable][data-placeholder]:empty::before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        div[contenteditable] ul, div[contenteditable] ol {
          margin-left: 1.5rem;
          padding-left: 0;
        }
      `}</style>
    </div>
  );
};

export default function PublicationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bookTitle: "Foundations of Science - Grade 9",
    author: "Dr. R.K. Sharma",
    publication: "Bright Future School",
    medium: "English",
    subject: "Science",
    yearOfRelease: "2025",
    applicableClass: "Class 9",
    curriculumBoard: "CBSE",
    mrp: "599",
    discount: "100",
    gst: "0",
    description:
      "This science book, aligned with NCERT guidelines, provides a comprehensive overview of fundamental scientific concepts. It covers topics ranging from the basics of physics and chemistry to the intricacies of biology, ensuring a well-rounded understanding for students. Engaging illustrations and practical examples enhance the learning experience, making complex ideas accessible and enjoyable. Ideal for students preparing for exams, this book serves as a valuable resource for both classroom learning and self-study.",
    status: "Published",
    coverImage: null as File | null,
    bookAsset: null as File | null,
    previewSample: null as File | null,
    authorized: true,
  });

  const [tags, setTags] = useState<string[]>([
    "#search",
    "#CBSE",
    "#English",
    "#2025",
    "#Science",
    "#Maths",
  ]);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "#search",
    "#CBSE",
    "#English",
  ]);
  const [newTag, setNewTag] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "coverImage" | "bookAsset" | "previewSample"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file }));
    }
  };

  const removeFile = (field: "coverImage" | "bookAsset" | "previewSample") => {
    setFormData((prev) => ({ ...prev, [field]: null }));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      {/* Breadcrumbs */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Publications <span className="mx-2">/</span>{" "}
          <span className="text-gray-900 font-medium">Add New Book</span>
        </p>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Add New Book
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Book Identity Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Book Identity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Book Title
                </label>
                <input
                  type="text"
                  name="bookTitle"
                  value={formData.bookTitle}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Publication
                </label>
                <input
                  type="text"
                  name="publication"
                  value={formData.publication}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medium
                </label>
                <select
                  name="medium"
                  value={formData.medium}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="History">History</option>
                  <option value="English">English</option>
                  <option value="Physics">Physics</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year of Release
                </label>
                <select
                  name="yearOfRelease"
                  value={formData.yearOfRelease}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
            </div>
          </div>

          {/* Curriculum & Class Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Curriculum & Class
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Applicable Class
                </label>
                <select
                  name="applicableClass"
                  value={formData.applicableClass}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Curriculum Board
                </label>
                <input
                  type="text"
                  name="curriculumBoard"
                  value={formData.curriculumBoard}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Pricing & License Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Pricing & License
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  MRP (₹)
                </label>
                <input
                  type="text"
                  name="mrp"
                  value={formData.mrp}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Offered (%)
                </label>
                <input
                  type="text"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GST %
                </label>
                <select
                  name="gst"
                  value={formData.gst}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="0">0%</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Description
            </h2>
            <RichTextEditor
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
            />
            <div className="mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.authorized}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      authorized: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I confirm this content is authorized for publishing by our
                  institution.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Status</h3>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button
              type="button"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Update
            </button>
          </div>

          {/* Cover Image Upload */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Cover Image Upload
            </h3>
            {formData.coverImage ? (
              <div className="border border-gray-300 rounded-md p-3 flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  {formData.coverImage.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile("coverImage")}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="block border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "coverImage")}
                  className="hidden"
                />
                <div className="text-3xl mb-2">📤</div>
                <p className="text-sm text-gray-600">Click to upload</p>
              </label>
            )}
          </div>

          {/* Upload Your Book Assets */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Upload Your Book Assets
            </h3>
            {formData.bookAsset ? (
              <div className="border border-gray-300 rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">
                    {formData.bookAsset.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile("bookAsset")}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Max size: 50MB - Supported only Flipbook formats
                </p>
              </div>
            ) : (
              <label className="block border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, "bookAsset")}
                  className="hidden"
                />
                <div className="text-3xl mb-2">📚</div>
                <p className="text-sm text-gray-600">Click to upload</p>
                <p className="text-xs text-gray-500 mt-1">
                  Max size: 50MB - Supported only Flipbook formats
                </p>
              </label>
            )}
          </div>

          {/* Preview Sample */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Preview Sample
            </h3>
            {formData.previewSample ? (
              <div className="border border-gray-300 rounded-md p-3 flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  {formData.previewSample.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile("previewSample")}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="block border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "previewSample")}
                  className="hidden"
                />
                <div className="text-3xl mb-2">🖼️</div>
                <p className="text-sm text-gray-600">Upload Preview Sample</p>
                <p className="text-xs text-gray-500 mt-1">
                  Upload a few sample pages to give students a peek inside
                </p>
              </label>
            )}
          </div>

          {/* Tags / Keywords */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Tags / Keywords
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
                    selectedTags.includes(tag)
                      ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                      : "bg-gray-100 text-gray-700 border-2 border-transparent"
                  }`}
                >
                  {selectedTags.includes(tag) && (
                    <FaCheck className="w-3 h-3" />
                  )}
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-600"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add tag"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
