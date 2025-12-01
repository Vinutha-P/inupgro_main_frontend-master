// pages/job/[id].tsx

import Image from "next/image";
import { useState } from "react";

interface JobDetails {
  description: string;
  additionalInfo: string;
  responsibilities: string[];
  aboutSchool: string;
  address: {
    full: string;
    hours: string;
  };
}

const jobDetails: JobDetails = {
  description:
    "We are searching for a Laravel developer to build web applications for our company. In this role, you will design and create projects using Laravel framework and PHP.",
  additionalInfo:
    "To ensure success as a Laravel developer you should be adept at utilizing Laravel's GUI and be able to design a PHP application from start to finish.",
  responsibilities: [
    "A degree in programming, computer science, or a related field.",
    "Proficiency in HTML and JavaScript. Experience developing in Vue is considered a plus.Proficiency in HTML and JavaScript. Experience developing in Vue is considered a plus.",
    "A degree in programming, computer science, or a related field.",
    "A degree in programming, computer science, or a related field.",
    "A degree in programming, computer science, or a related field.",
    "Practical experience using the MVC architecture.",
    "A degree in programming, computer science, or a related field.",
    "The ability to work on LAMP development environment.",
  ],
  aboutSchool:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Read More",
  address: {
    full: "CP-4 Regent Square Mall, Japanese Zone NIA, Neemrana, Rajasthan 301705",
    hours: "8:00 AM to 3:00 PM (Mon to Sat)",
  },
};

export default function JobDescription({ selectedJob }: { selectedJob: any }) {
  const [loadingDirection, setLoadingDirection] = useState(false);
  const dest = {
    latitude: selectedJob?.postedByDetails?.location?.latitude,
    longitude: selectedJob?.postedByDetails?.location?.longitude,
  };

  const handleGetDirections = () => {
    if (!dest.latitude || !dest.longitude) {
      alert("Destination coordinates are not available.");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingDirection(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const originLat = position.coords.latitude;
        const originLng = position.coords.longitude;

        const mapsUrl = [
          "https://www.google.com/maps/dir/?api=1",
          `origin=${originLat},${originLng}`,
          `destination=${dest.latitude},${dest.longitude}`,
          "travelmode=driving",
        ].join("&");

        window.open(mapsUrl, "_blank");
        setLoadingDirection(false);

        // Check if the destination is too far for driving directions
        const distance = Math.sqrt(
          Math.pow(dest.latitude - originLat, 2) +
            Math.pow(dest.longitude - originLng, 2)
        );
        if (distance > 100) {
          alert(
            "Driving directions may not be available for such a long distance."
          );
        }
      },
      (error) => {
        console.error("Error fetching geolocation", error);
        alert(
          "Unable to retrieve your location. Please allow location access."
        );
        setLoadingDirection(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  };

  function decodeHTML(html: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const decodedDescription = decodeHTML(selectedJob?.description || "");
  const decodedResponsibilities = decodeHTML(
    selectedJob?.responsibilities || ""
  );

  // Extract Address Details
  const schoolAddress =
    selectedJob?.postedByDetails?.location || "Address not available";

  return (
    <div className="w-full">
      {/* Job Description */}
      <div className="mb-6">
        <h4 className="text-[20px] mb-3">Job description</h4>
        <div
          className="text-sm text-grayDark"
          dangerouslySetInnerHTML={{ __html: decodedDescription }}
        />
        {/* <div
          className="text-sm text-grayDark"
          dangerouslySetInnerHTML={{ __html: decodedResponsibilities }}
        /> */}
      </div>

      {/* Responsibilities */}
      <div className="mb-6">
        <h4 className="text-[20px] mb-3">Responsibilities</h4>
        <div
          className="text-sm text-grayDark"
          dangerouslySetInnerHTML={{ __html: decodedResponsibilities }}
        />
        {/* <ul className="space-y-2 mb-6">
          {jobDetails.responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-5 h-5 flex-box-center flex-shrink-0 mt-0.5">
                <Image
                  src="/disc.svg"
                  alt="bullet"
                  width={11}
                  height={11}
                  className="object-contain"
                />
              </div>
              <span className="text-sm text-grayDark">{responsibility}</span>
            </li>
          ))}
        </ul> */}
      </div>

      {/* About School */}
      <div className="mb-6">
        <h4 className="text-[20px]">About {selectedJob?.postedByDetails?.posted_type}</h4>
        <p className="text-sm text-grayDark mb-2">
          {selectedJob?.postedByDetails?.name || "-"}
          <a href="#" className="text-blue-500 hover:underline ml-1">
            Read More
          </a>
        </p>
      </div>

      {/* School Address */}
      <div className="mb-6">
        <h6 className="text-base mb-3">{selectedJob?.postedByDetails?.posted_type} Address</h6>
        <div className="flex flex-row gap-4">
          <div className="relative w-[100px] h-[100px] lg:w-[84px] lg:h-[84px] rounded-md flex-shrink-0">
            <Image src={selectedJob?.postedByDetails?.logo_link || "/placeholder.png"} className="object-contain" fill alt={selectedJob?.postedByDetails?.name || "School image"} />
          </div>
          <div className="flex flex-col md:flex-row justify-between md:items-center w-full">
            <div>
              <p className="text-gray-700 lg:max-w-[455px]">
                {selectedJob?.postedByDetails?.location?.location_value}
              </p>
              <p className="text-gray-500 text-sm mt-2.5">
                <span className="text-red-500">Closed now</span> · Opening time:{" "}
                {jobDetails.address.hours}
              </p>
            </div>
            <button
              onClick={handleGetDirections}
              disabled={loadingDirection}
              className={`
        border border-blue-500 text-blue-500 
        rounded-md px-6 py-2 mt-4 
        hover:bg-blue-50 flex items-center justify-center
        ${loadingDirection ? "opacity-50 cursor-not-allowed" : ""}
      `}
            >
              {loadingDirection ? "Locating…" : "Get Directions"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
