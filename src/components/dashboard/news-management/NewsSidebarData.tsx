'use client'
import { setCategory, setSelectedHashtags, setSubCategory, setSelectedImage, setFormError, clearFormError } from '@/features/newsSlice'
import { RootState } from '@/lib/store'
import { uploadImageToS3 } from '@/utils/uploadImageToS3'
import React, { useState, useEffect, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LuLoaderCircle } from "react-icons/lu";
import { RiEdit2Fill } from "react-icons/ri";
import { useCategoryListQuery, useSubCategoryListQuery } from '@/features/api/educationNewsApiSlice'

const NewsSidebarData: React.FC = () => {
  const dispatch = useDispatch()
  const [hashtags, setHashtags] = useState<string[]>([
    '#science', '#news', '#trending', '#collegebuddy', '#college', '#school',
    '#backtoschooldays', '#schoolawareness'
  ])
  const selectedHashtags = useSelector((state: RootState) => state.news.selectedHashtags);
  const category = useSelector((state: RootState) => state.news.category);
  const subCategory = useSelector((state: RootState) => state.news.subCategory)
  const selectedImage = useSelector((state: RootState) => state.news.selectedImage)
  const formErrors = useSelector((state: RootState) => state.news.formErrors);

  const [newTag, setNewTag] = useState<string>('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const { data: categoryList } = useCategoryListQuery({})
  const { data: subCategoryList } = useSubCategoryListQuery(category, {
    skip: !category,
  })

  useEffect(() => {
    if (selectedImage) {
      setImagePreview(selectedImage);
    }
  }, [selectedImage]);

  const toggleHashtag = (tag: string) => {
    let updated = selectedHashtags.includes(tag)
      ? selectedHashtags.filter((t) => t !== tag)
      : [...selectedHashtags, tag]
    dispatch(setSelectedHashtags(updated))
  }

  const addHashtag = () => {
    if (newTag && !hashtags.includes(newTag)) {
      setHashtags([...hashtags, newTag])
      setNewTag('')
    }
  }

  const handleNewTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value)
  }

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category))
  }

  const handleSubcategory = (val: string) => {
    dispatch(setSubCategory(val))
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      dispatch(setFormError({ field: "coverImage", message: "Cover image is required" }));
      return;
    } else {
      dispatch(clearFormError("coverImage"));
    }

    setLoading?.(true);
    const { url, error } = await uploadImageToS3(file, "uploads");
    if (url) {
      dispatch(setSelectedImage(url));
      setImagePreview(URL.createObjectURL(file))
      console.log("Uploaded successfully:", url);
    } else if (error) {
      console.log("Uploaded failed:", error);
      dispatch(setSelectedImage(""));
    }

    setLoading?.(false);
  }

  return (
    <div className="w-full max-w-xs p-4 space-y-4">
      {/* Image Upload */}
      <div className="bg-white border rounded-md shadow p-4">
        <p className="font-medium mb-2">News Cover</p>
        <label htmlFor="coverImage" className="cursor-pointer group">
          <div className="border-2 border-dashed border-gray-300 rounded-md h-40 flex items-center justify-center text-sm text-gray-500 overflow-hidden relative">
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-full h-full rounded-md"
                />
                <div className="absolute inset-0 hidden group-hover:flex justify-center items-center bg-black/40 transition duration-200 z-10">
                  <RiEdit2Fill className="text-white text-xl" />
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="mb-1">📤</p>
                <p>Upload Image</p>
                <p className="text-xs text-gray-400">Suggested size 238 x 170px</p>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-60 flex justify-center items-center z-10">
                <LuLoaderCircle className="animate-spin text-3xl text-blue-600" />
              </div>
            )}
          </div>
        </label>

        <input
          type="file"
          id="coverImage"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      {formErrors.coverImage && <p className="text-red-500 text-sm mt-1">{formErrors.coverImage}</p>}

      {/* Hashtags */}
      <div className="bg-white border rounded-md shadow p-4">
        <p className="font-medium mb-2">Hashtags</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {hashtags.map((tag, idx) => (
            <label key={idx} className="flex items-center space-x-1 bg-gray-100 text-sm px-2 py-1 rounded-md cursor-pointer">
              <input
                type="checkbox"
                checked={selectedHashtags.includes(tag)}
                onChange={() => toggleHashtag(tag)}
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newTag}
            onChange={handleNewTagChange}
            placeholder="Enter Hashtags"
            className="flex-1 border rounded-md px-2 py-1 text-sm"
          />
          <button
            onClick={addHashtag}
            className="px-3 py-1 bg-gray-200 rounded-md text-sm"
          >
            Add
          </button>
        </div>
      </div>

      {/* Category */}
      <div className="bg-white border rounded-md shadow p-4">
        <p className="font-medium mb-2">Category</p>
        <div className="space-y-2 text-sm">
          {categoryList?.results.map((item: any) => (
            <label key={item?._id} className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                value={item?._id}
                checked={category === item?._id}
                // onChange={() => handleCategoryChange(item?._id)}
                onChange={() => {
                  handleCategoryChange(item?._id);
                  if (!item?._id.trim()) {
                    dispatch(setFormError({ field: "category", message: "Category is required" }));

                  } else {
                    dispatch(clearFormError("category"));
                  }
                }}
              />
              <span>{item?.name}</span>
            </label>
          ))}
        </div>
        {formErrors.category && <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>}
      </div>

      {/* Sub-category */}
      <div className="bg-white border rounded-md shadow p-4">
        <p className="font-medium mb-2">Sub-category</p>
        <select className="w-full border px-3 py-2 rounded-md text-sm text-gray-600"
          value={subCategory}
          onChange={(e) => {
            let value = e.target.value
            handleSubcategory(value);
            if (!value.trim()) {
              dispatch(setFormError({ field: "subCategory", message: "SubCategory is required" }));

            } else {
              dispatch(clearFormError("subCategory"));
            }
          }}
        >
          <option value="">Select Sub-category</option>
          {
            subCategoryList?.results && subCategoryList?.results?.map((elem: any) => (
              <option key={elem?._id} value={elem?._id}>{elem?.name}</option>
            ))
          }
        </select>
      </div>
      {formErrors.subCategory && <p className="text-red-500 text-sm mt-1">{formErrors.subCategory}</p>}
    </div>
  )
}

export default NewsSidebarData
