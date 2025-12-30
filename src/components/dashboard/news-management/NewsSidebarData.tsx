"use client";
import {
  setCategory,
  setSelectedHashtags,
  setSubCategory,
  setSelectedImage,
  setFormError,
  clearFormError,
} from "@/features/newsSlice";
import { RootState } from "@/lib/store";
import { uploadImageToS3 } from "@/utils/uploadImageToS3";
import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuLoaderCircle } from "react-icons/lu";
import { RiEdit2Fill } from "react-icons/ri";
import {
  useCategoryListQuery,
  useSubCategoryListQuery,
} from "@/features/api/educationNewsApiSlice";

const NewsSidebarData: React.FC = () => {
  const dispatch = useDispatch();
  const [hashtags, setHashtags] = useState<string[]>([
    "#science",
    "#news",
    "#trending",
    "#collegebuddy",
    "#college",
    "#school",
    "#backtoschooldays",
    "#schoolawareness",
  ]);
  const selectedHashtags = useSelector(
    (state: RootState) => state.news.selectedHashtags
  );
  const category = useSelector((state: RootState) => state.news.category);
  const subCategory = useSelector((state: RootState) => state.news.subCategory);
  const selectedImage = useSelector(
    (state: RootState) => state.news.selectedImage
  );
  const formErrors = useSelector((state: RootState) => state.news.formErrors);

  const [newTag, setNewTag] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: categoryList } = useCategoryListQuery({});
  const { data: subCategoryList } = useSubCategoryListQuery(category, {
    skip: !category,
  });

  // Normalize category list to handle different API response structures
  const categories = useMemo(() => {
    if (!categoryList) return [];
    if (Array.isArray(categoryList)) return categoryList;
    if (Array.isArray(categoryList.results)) return categoryList.results;
    if (Array.isArray(categoryList.data)) return categoryList.data;
    return [];
  }, [categoryList]);

  // Normalize subcategory list to handle different API response structures
  const subCategories = useMemo(() => {
    if (!subCategoryList) return [];
    if (Array.isArray(subCategoryList)) return subCategoryList;
    if (Array.isArray(subCategoryList.results)) return subCategoryList.results;
    if (Array.isArray(subCategoryList.data)) return subCategoryList.data;
    return [];
  }, [subCategoryList]);

  useEffect(() => {
    if (selectedImage) {
      setImagePreview(selectedImage);
    }
  }, [selectedImage]);

  const toggleHashtag = (tag: string) => {
    let updated = selectedHashtags.includes(tag)
      ? selectedHashtags.filter((t) => t !== tag)
      : [...selectedHashtags, tag];
    dispatch(setSelectedHashtags(updated));
  };

  const addHashtag = () => {
    if (newTag && !hashtags.includes(newTag)) {
      setHashtags([...hashtags, newTag]);
      setNewTag("");
    }
  };

  const handleNewTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category));
  };

  const handleSubcategory = (val: string) => {
    dispatch(setSubCategory(val));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      dispatch(
        setFormError({
          field: "coverImage",
          message: "Cover image is required",
        })
      );
      return;
    } else {
      dispatch(clearFormError("coverImage"));
    }

    setLoading?.(true);
    const { url, error } = await uploadImageToS3(file, "uploads");
    if (url) {
      dispatch(setSelectedImage(url));
      setImagePreview(URL.createObjectURL(file));
      console.log("Uploaded successfully:", url);
    } else if (error) {
      console.log("Uploaded failed:", error);
      dispatch(setSelectedImage(""));
    }

    setLoading?.(false);
  };

  return (
    <div className="w-full max-w-xs space-y-4">
      {/* Image Upload */}
      <div className="bg-white border-[1px] border-[#EAECF0] rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-[#f9fafb] border-b border-[#EAECF0]">
          <p className="font-semibold text-sm text-gray-800">News Cover</p>
        </div>
        <div className="p-4">
          <label htmlFor="coverImage" className="cursor-pointer group block">
            <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center text-sm text-gray-500 overflow-hidden relative hover:border-blue-400 transition-colors">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-lg"
                  />
                  <div className="absolute inset-0 hidden group-hover:flex justify-center items-center bg-black/50 transition duration-200 z-10 rounded-lg">
                    <div className="flex flex-col items-center gap-2">
                      <RiEdit2Fill className="text-white text-2xl" />
                      <span className="text-white text-xs font-medium">
                        Change Image
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center px-4">
                  <div className="mb-2 text-3xl">📤</div>
                  <p className="font-medium text-gray-700 mb-1">
                    Click to upload image
                  </p>
                  <p className="text-xs text-gray-400">
                    Suggested size: 238 x 170px
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              )}
              {loading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex justify-center items-center z-20 rounded-lg">
                  <div className="flex flex-col items-center gap-2">
                    <LuLoaderCircle className="animate-spin text-3xl text-blue-600" />
                    <span className="text-sm text-gray-600">Uploading...</span>
                  </div>
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
          {formErrors.coverImage && (
            <p className="text-red-500 text-xs mt-2">{formErrors.coverImage}</p>
          )}
        </div>
      </div>

      {/* Hashtags */}
      <div className="bg-white border-[1px] border-[#EAECF0] rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-[#f9fafb] border-b border-[#EAECF0]">
          <p className="font-semibold text-sm text-gray-800">Hashtags</p>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {hashtags.map((tag, idx) => (
              <label
                key={idx}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-all ${
                  selectedHashtags.includes(tag)
                    ? "bg-blue-100 text-blue-700 border-2 border-blue-300 font-medium"
                    : "bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedHashtags.includes(tag)}
                  onChange={() => toggleHashtag(tag)}
                  className="hidden"
                />
                <span>{tag}</span>
                {selectedHashtags.includes(tag) && (
                  <span className="text-blue-600">✓</span>
                )}
              </label>
            ))}
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
            <input
              type="text"
              value={newTag}
              onChange={handleNewTagChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addHashtag();
                }
              }}
              placeholder="Add custom hashtag"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addHashtag}
              disabled={!newTag.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Category */}
      <div className="bg-white border-[1px] border-[#EAECF0] rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-[#f9fafb] border-b border-[#EAECF0]">
          <p className="font-semibold text-sm text-gray-800">Category</p>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            {categories.length > 0 ? (
              categories.map((item: any) => (
                <label
                  key={item?._id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border-2 ${
                    category === item?._id
                      ? "bg-blue-50 border-blue-300"
                      : "bg-gray-50 border-transparent hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={item?._id}
                    checked={category === item?._id}
                    onChange={() => {
                      handleCategoryChange(item?._id);
                      if (!item?._id?.trim()) {
                        dispatch(
                          setFormError({
                            field: "category",
                            message: "Category is required",
                          })
                        );
                      } else {
                        dispatch(clearFormError("category"));
                      }
                    }}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span
                    className={`text-sm ${
                      category === item?._id
                        ? "font-medium text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    {item?.name}
                  </span>
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No categories available
              </p>
            )}
          </div>
          {formErrors.category && (
            <p className="text-red-500 text-xs mt-2">{formErrors.category}</p>
          )}
        </div>
      </div>

      {/* Sub-category */}
      <div className="bg-white border-[1px] border-[#EAECF0] rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-[#f9fafb] border-b border-[#EAECF0]">
          <p className="font-semibold text-sm text-gray-800">Sub-category</p>
        </div>
        <div className="p-4">
          <select
            className={`w-full border-2 rounded-lg px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
              formErrors.subCategory
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            } ${!subCategory ? "text-gray-400" : "text-gray-900"}`}
            value={subCategory}
            onChange={(e) => {
              let value = e.target.value;
              handleSubcategory(value);
              if (!value.trim()) {
                dispatch(
                  setFormError({
                    field: "subCategory",
                    message: "SubCategory is required",
                  })
                );
              } else {
                dispatch(clearFormError("subCategory"));
              }
            }}
            disabled={!category}
          >
            <option value="">
              {category ? "Select Sub-category" : "Select category first"}
            </option>
            {subCategories.map((elem: any) => (
              <option key={elem?._id} value={elem?._id}>
                {elem?.name}
              </option>
            ))}
          </select>
          {formErrors.subCategory && (
            <p className="text-red-500 text-xs mt-2">
              {formErrors.subCategory}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsSidebarData;
