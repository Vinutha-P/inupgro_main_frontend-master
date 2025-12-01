'use client'

import { FiChevronRight } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import SearchInput from '../atom/SearchInput'
import FilterRow from '../molecule/FilterRow'
import CareersLeftSide from '../organism/careersData/CareersLeftSide'
import CareersRightSide from '../organism/careersData/CareersRightSide'
import PublicPageTemplate from '../templates/PublicPageTemplate'
import {
  useGetAllJobsQuery,
  useGetJobsByLocationQuery,
  useGetJobsBySubjectQuery,
  useGetJobsByMediumQuery,
  useGetJobsByExperienceLevelQuery,
  useGetJobsByInstituteQuery,
} from '@/features/api/jobApiSlice'
import type { Job } from '@/types'

const CareersDetails = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [filterType, setFilterType] = useState<string>('All')
  const [filterValue, setFilterValue] = useState<string>('')

  // API hooks with error handling
  const {
    data: allJobsResponse,
    isLoading: isLoadingAll,
    error: allJobsError,
  } = useGetAllJobsQuery()
  const {
    data: locationJobsResponse,
    isLoading: isLoadingLocation,
    error: locationError,
  } = useGetJobsByLocationQuery(filterValue, { skip: filterType !== 'Location' || !filterValue })
  const {
    data: subjectJobsResponse,
    isLoading: isLoadingSubject,
    error: subjectError,
  } = useGetJobsBySubjectQuery(filterValue, { skip: filterType !== 'Subject' || !filterValue })
  const {
    data: mediumJobsResponse,
    isLoading: isLoadingMedium,
    error: mediumError,
  } = useGetJobsByMediumQuery(filterValue, { skip: filterType !== 'Medium' || !filterValue })
  const {
    data: expLevelJobsResponse,
    isLoading: isLoadingExpLevel,
    error: expLevelError,
  } = useGetJobsByExperienceLevelQuery(filterValue, { skip: filterType !== 'ExperienceLevel' || !filterValue })
  const {
    data: instituteJobsResponse,
    isLoading: isLoadingInstitute,
    error: instituteError,
  } = useGetJobsByInstituteQuery(filterValue, { skip: filterType !== 'Institute' || !filterValue })

  // Determine which data to use based on filter
  const getJobsData = () => {
    switch (filterType) {
      case 'Location':
        return locationJobsResponse
      case 'Subject':
        return subjectJobsResponse
      case 'Medium':
        return mediumJobsResponse
      case 'ExperienceLevel':
        return expLevelJobsResponse
      case 'Institute':
        return instituteJobsResponse
      default:
        return allJobsResponse
    }
  }

  const jobsResponse = getJobsData()
  const jobs = jobsResponse?.data || []
  const isLoading = isLoadingAll || isLoadingLocation || isLoadingSubject || isLoadingMedium || isLoadingExpLevel || isLoadingInstitute
  const error = allJobsError || locationError || subjectError || mediumError || expLevelError || instituteError

  useEffect(() => {
    if (jobs.length > 0 && !selectedJob) {
      setSelectedJob(jobs[0])
    }
  }, [jobs, selectedJob])

  const handleFilterChange = (type: string, value: string) => {
    setFilterType(type)
    setFilterValue(value)
  }

  if (error) {
    return (
      <PublicPageTemplate>
        <div className="text-red-500">Error: {(error as any)?.data || 'Something went wrong'}</div>
      </PublicPageTemplate>
    )
  }

  return (
    <PublicPageTemplate>
      <div className="flex items-center space-x-2 text-grayText text-sm lg:hidden">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6M5 10v10h14V10"
          />
        </svg>
        <span>Home</span>
        <span><FiChevronRight className="w-5 h-5 stroke-[1.5px] -ml-2" /></span>
        <span className="font-semibold text-darkBlue text-sm">
          Let’s help you find best Schools...
        </span>
      </div>
      <div className="w-full flex flex-col-reverse lg:flex-row gap-3 lg:gap-8 justify-between lg:items-center">
        <div className="w-full h-fit">
          <FilterRow showSchoolType={true} onFilterChange={handleFilterChange} />
        </div>
        <div className="w-[99%] sm:w-full xl:w-[25%]">
          <SearchInput width="100%" height="2.5rem" />
        </div>
      </div>
      <div className="">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="max-w-full lg:max-w-[340px] xl:max-w-[494px]">
            <CareersLeftSide setSelectedJob={setSelectedJob} isLoading={isLoading} jobs={jobs} jobsTotalCount={jobsResponse?.totalCount} />
          </div>
          <div className="hidden lg:block w-full max-w-[996px]">
            <CareersRightSide selectedJob={selectedJob} />
          </div>
        </div>
      </div>
    </PublicPageTemplate>
  )
}

export default CareersDetails
