"use client";
import {
  useCreateNewsMutation,
  useDetailNewsQuery,
  useUpdateNewsMutation,
} from "@/features/api/educationNewsApiSlice";
import { RootState } from "@/lib/store";
import React, { useState, useEffect, ChangeEvent } from "react";
import CreateNewsRichText from "./CreateNewsRichText";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFormError,
  clearFormErrors,
  setCategory,
  setFormError,
  setMultipleFormErrors,
  setSelectedImage,
  setSubCategory,
} from "@/features/newsSlice";
import { validateByType } from "@/utils/formValidation";
import { useRouter, useSearchParams } from "next/navigation";

const CreateNewsForm: React.FC = () => {
  const [type, setType] = useState<"School" | "College">("School");
  const [title, setTitle] = useState<string>(
    "Local School Launches New STEM Program for Students"
  );
  const [schoolName, setSchoolName] = useState<string>(
    "Green Valley International School"
  );
  const [location, setLocation] = useState<string>("New Delhi, India");
  const [details, setDetails] = useState<string>("");
  const category = useSelector((state: RootState) => state.news.category);
  const subCategory = useSelector((state: RootState) => state.news.subCategory);
  const selectedHashtags = useSelector(
    (state: RootState) => state.news.selectedHashtags
  );
  const selectedImage = useSelector(
    (state: RootState) => state.news.selectedImage
  );
  const formErrors = useSelector((state: RootState) => state.news.formErrors);
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const newsId = params.get("id");

  const [createNews] = useCreateNewsMutation();
  const [updateNews] = useUpdateNewsMutation();
  const { data: detailData, refetch } = useDetailNewsQuery(newsId, {
    skip: !newsId,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (detailData?.results) {
      const news = detailData.results;
      setTitle(news?.title || "");
      setSchoolName(news?.name || "");
      setLocation(news?.location || "");
      setDetails(news?.description || "");

      if (news?.category) {
        dispatch(setCategory(news?.category));
      }
      if (news?.subCategory) {
        dispatch(setSubCategory(news?.subCategory));
      }
      if (news?.coverImage) {
        dispatch(setSelectedImage(news?.coverImage));
      }
    }
  }, [detailData]);

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    setType(val as "School" | "College");
    if (!schoolName.trim()) {
      dispatch(
        setFormError({ field: "name", message: `${val} name is required` })
      );
    } else {
      dispatch(clearFormError("name"));
    }
  };

  const handlePreview = () => {
    handleSubmit({
      onSuccessNavigate: "/news-management/news-details", //  preview route
      withId: true,
    });
  };

  const handlePublish = () => {
    handleSubmit({
      onSuccessNavigate: "/news-management",
      withId: false,
    });
  };

  const handleUpdateNews = () => {
    handleSubmit({
      onSuccessNavigate: "/news-management",
      withId: false,
    });
  };

  const handleSubmit = async ({
    onSuccessNavigate,
    withId = false,
  }: {
    onSuccessNavigate?: string;
    withId?: boolean;
  } = {}) => {
    const errors: { [key: string]: string } = {};

    if (!title.trim()) errors.title = "News title is required";
    if (!schoolName.trim()) errors.name = `${type} name is required`;
    if (!location.trim()) errors.location = "Location is required";
    if (!details.trim()) errors.details = "News description is required";
    if (!selectedImage) errors.coverImage = "Cover image is required";
    if (!category) errors.category = "Category is required";
    if (!subCategory) errors.subCategory = "Sub-category is required";

    if (Object.keys(errors).length > 0) {
      dispatch(setMultipleFormErrors(errors));
      return;
    }

    let payload = {
      title: title,
      name: schoolName,
      location: location,
      description: details,
      coverImage: selectedImage,
      category: category,
      subCategory: subCategory,
      status: "pending",
      // hashtags: selectedHashtags,
    };
    try {
      let response;
      if (newsId) {
        response = await updateNews({ id: newsId, body: payload }).unwrap();
      } else {
        response = await createNews(payload).unwrap();
      }
      if (onSuccessNavigate) {
        if (withId && response?.results?._id) {
          router.push(`${onSuccessNavigate}?id=${response.results._id}`);
          refetch();
        } else {
          router.push(onSuccessNavigate);
        }
      }
    } catch (err) {
      console.error("API error", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-[#EAECF0] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-[#f9fafb] border-b border-[#EAECF0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {newsId ? "Edit" : "Create"} News
        </h2>
        <div className="flex flex-wrap gap-2">
          {!newsId ? (
            <>
              <button
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                type="button"
                onClick={handlePreview}
              >
                Preview
              </button>
              <button
                className="px-4 py-2 bg-green-100 text-green-700 border border-green-300 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                type="button"
              >
                Schedule Publish
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                type="button"
                onClick={handlePublish}
              >
                Publish News
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              type="button"
              onClick={handleUpdateNews}
            >
              Update News
            </button>
          )}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-6">
        {/* News Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            News Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              setTitle(value);
              if (!value.trim()) {
                dispatch(
                  setFormError({
                    field: "title",
                    message: "News title is required",
                  })
                );
              } else {
                dispatch(clearFormError("title"));
              }
            }}
            className={`w-full border-2 rounded-lg px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
              formErrors.title
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
            placeholder="Enter news title"
          />
          {formErrors.title && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
              <span>⚠</span> {formErrors.title}
            </p>
          )}
        </div>

        {/* School/College Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select School/College
          </label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="type"
                value="School"
                checked={type === "School"}
                onChange={handleTypeChange}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <span
                className={`text-sm ${
                  type === "School"
                    ? "font-medium text-gray-900"
                    : "text-gray-600"
                }`}
              >
                School
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="type"
                value="College"
                checked={type === "College"}
                onChange={handleTypeChange}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <span
                className={`text-sm ${
                  type === "College"
                    ? "font-medium text-gray-900"
                    : "text-gray-600"
                }`}
              >
                College
              </span>
            </label>
          </div>
        </div>

        {/* School Name and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {type} Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => {
                const value = e.target.value;
                setSchoolName(value);
                if (!value.trim()) {
                  dispatch(
                    setFormError({
                      field: "name",
                      message: `${type} name is required`,
                    })
                  );
                } else {
                  dispatch(clearFormError("name"));
                }
              }}
              className={`w-full border-2 rounded-lg px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                formErrors.name
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              placeholder={`Enter ${type.toLowerCase()} name`}
            />
            {formErrors.name && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <span>⚠</span> {formErrors.name}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => {
                const value = e.target.value;
                setLocation(value);
                if (!value.trim()) {
                  dispatch(
                    setFormError({
                      field: "location",
                      message: "Location is required",
                    })
                  );
                } else {
                  dispatch(clearFormError("location"));
                }
              }}
              className={`w-full border-2 rounded-lg px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                formErrors.location
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              placeholder="Enter location"
            />
            {formErrors.location && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <span>⚠</span> {formErrors.location}
              </p>
            )}
          </div>
        </div>

        {/* Rich Text Editor */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            News Description <span className="text-red-500">*</span>
          </label>
          <CreateNewsRichText details={details} setDetails={setDetails} />
          {formErrors.details && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
              <span>⚠</span> {formErrors.details}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateNewsForm;
