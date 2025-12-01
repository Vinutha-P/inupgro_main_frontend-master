'use client'
import { useCreateNewsMutation, useDetailNewsQuery, useUpdateNewsMutation } from '@/features/api/educationNewsApiSlice'
import { RootState } from '@/lib/store'
import React, { useState, useEffect, ChangeEvent } from 'react'
import CreateNewsRichText from './CreateNewsRichText'
import { useDispatch, useSelector } from 'react-redux'
import { clearFormError, clearFormErrors, setCategory, setFormError, setMultipleFormErrors, setSelectedImage, setSubCategory } from '@/features/newsSlice'
import { validateByType } from '@/utils/formValidation'
import { useRouter, useSearchParams } from 'next/navigation'

const CreateNewsForm: React.FC = () => {
  const [type, setType] = useState<'School' | 'College'>('School')
  const [title, setTitle] = useState<string>('Local School Launches New STEM Program for Students')
  const [schoolName, setSchoolName] = useState<string>('Green Valley International School')
  const [location, setLocation] = useState<string>('New Delhi, India')
  const [details, setDetails] = useState<string>('')
  const category = useSelector((state: RootState) => state.news.category)
  const subCategory = useSelector((state: RootState) => state.news.subCategory)
  const selectedHashtags = useSelector((state: RootState) => state.news.selectedHashtags)
  const selectedImage = useSelector((state: RootState) => state.news.selectedImage)
  const formErrors = useSelector((state: RootState) => state.news.formErrors);
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useSearchParams()
  const newsId = params.get("id");

  const [createNews] = useCreateNewsMutation();
  const [updateNews] = useUpdateNewsMutation();
  const { data: detailData, refetch } = useDetailNewsQuery(newsId, {
    skip: !newsId,
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    if (detailData?.results) {
      const news = detailData.results
      setTitle(news?.title || '')
      setSchoolName(news?.name || '')
      setLocation(news?.location || '')
      setDetails(news?.description || '')

      if (news?.category) {
        dispatch(setCategory(news?.category))
      }
      if (news?.subCategory) {
        dispatch(setSubCategory(news?.subCategory))
      }
      if (news?.coverImage) {
        dispatch(setSelectedImage(news?.coverImage))
      }
    }
  }, [detailData])

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    setType(val as 'School' | 'College')
    if (!schoolName.trim()) {
      dispatch(setFormError({ field: "name", message: `${val} name is required` }))
    } else {
      dispatch(clearFormError("name"));
    }
  }

  const handlePreview = () => {
    handleSubmit({
      onSuccessNavigate: "/news-management/news-details", //  preview route
      withId: true
    });
  }

  const handlePublish = () => {
    handleSubmit({
      onSuccessNavigate: "/news-management",
      withId: false
    });
  };

  const handleUpdateNews = () => {
    handleSubmit({
      onSuccessNavigate: "/news-management",
      withId: false
    });
  };

  const handleSubmit = async ({
    onSuccessNavigate,
    withId = false
  }: {
    onSuccessNavigate?: string,
    withId?: boolean
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
    }
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
  }

  return (
    <div className="max-w-5xl mx-auto mt-6 p-6 bg-white rounded-md shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">{newsId ? 'Edit' : 'Create'} News</h2>
        <div className="space-x-2">
          {
            !newsId ?
              <>
                <button className="px-4 py-2 bg-white text-gray-600 border rounded-md hover:bg-indigo-600 hover:text-white active:bg-indigo-600 " type="button" onClick={handlePreview}>Preview</button>
                <button className="px-4 py-2 bg-green-100 text-green-700 border rounded-md hover:bg-indigo-600 hover:text-white active:bg-indigo-600" type="button">Schedule Publish</button>
                <button className="px-4 py-2 bg-white text-gray-600 border rounded-md hover:bg-indigo-600 hover:text-white active:bg-indigo-600 " type="button" onClick={handlePublish}>Publish News</button>
              </>
              :
              <button className="px-4 py-2 bg-white text-gray-600 border rounded-md hover:bg-indigo-600 hover:text-white active:bg-indigo-600 " type="button" onClick={handleUpdateNews}>Update News</button>

          }
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">News Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              setTitle(value);
              if (!value.trim()) {
                dispatch(setFormError({ field: "title", message: "News title is required" }));

              } else {
                dispatch(clearFormError("title"));
              }
            }}
            className="w-full border rounded-md px-4 py-2 mt-1"
          />
          {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Select School/College</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="type"
                value="School"
                checked={type === 'School'}
                onChange={handleTypeChange}
                className="form-radio text-indigo-600"
              />
              <span>School</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="type"
                value="College"
                checked={type === 'College'}
                onChange={handleTypeChange}
                className="form-radio text-indigo-600"
              />
              <span>College</span>
            </label>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">School Name</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => {
                const value = e.target.value;
                setSchoolName(e.target.value);
                if (!value.trim()) {
                  dispatch(setFormError({ field: "name", message: `${type} name is required` }));

                } else {
                  dispatch(clearFormError("name"));
                }
              }}
              className="w-full border rounded-md px-4 py-2 mt-1"
            />
            {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
          </div>
          <div>
            <label className="block font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => {
                const value = e.target.value;
                setLocation(e.target.value);
                if (!value.trim()) {
                  dispatch(setFormError({ field: "location", message: "Location is required" }));
                } else {
                  dispatch(clearFormError("location"));
                }
              }}
              className="w-full border rounded-md px-4 py-2 mt-1"
            />
            {formErrors.location && <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>}
          </div>
        </div>

        <CreateNewsRichText
          details={details}
          setDetails={setDetails}
        />
      </div>
    </div>
  )
}

export default CreateNewsForm
