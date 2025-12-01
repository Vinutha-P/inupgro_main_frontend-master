
import React from "react";
import ViewAllContainer from "../containers/NearYouContainer";
import Image from "next/image";
import SchoolLogo from "@/assets/School_logo.png";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { IoIosGlobe } from "react-icons/io";
import Link from "next/link";
import { formatLocation } from "@/utils/helper";

interface OrganizationContactProps {
  address: any;
  mail: string;
  link: string;
  latitude?: string;
  longitude?: string;
  isLoadings?: boolean;
  logo?: string | undefined;
}

const OrganizationContact: React.FC<OrganizationContactProps> = ({
  address,
  logo,
  mail,
  link,
  latitude,
  longitude,
  isLoadings,
}) => {

  return (
    <ViewAllContainer groupHeading="Contact Details">
      <div className="w-full flex flex-col-reverse md:flex-row items-start justify-between gap-5 md:gap-3">
        <div className="w-full h-fit lg:h-full flex flex-col md:flex-row justify-start gap-5">
          {isLoadings ? (<div className="w-[100px] h-[75px] skeleton-medium-gray rounded-[100%]"></div>) : (
            <Image
            width={0}
            height={0}
            sizes="100vh"
            src={logo || SchoolLogo}
            alt="contact-img"
            className="w-[4.875rem] h-[4.875rem] rounded-lg mx-auto md:mx-0"
          />)}
          <div className="w-full flex flex-col gap-y-2 text-sm sm:text-base">
            {
              isLoadings ? (<div className="w-full h-6 skeleton-medium-gray rounded-lg"></div>) : (<div className="w-full flex items-center justify-start">
                <CiLocationOn className="min-w-[24px] min-h-[24px] h-6 w-6" fill="#667085" />
                <p className="text-deepNavy ml-1">{address}</p>
              </div>)
            }
            {
              isLoadings ? (<div className="w-full h-6 skeleton-medium-gray rounded-lg"></div>) : (<div className="w-full flex items-center justify-start">
                <CiMail className="h-6 w-6" fill="#667085" />
                <Link href={`mailto:${mail}`} className="text-primaryLight ml-1">
                  {mail}
                </Link>
              </div>)
            }
            {
              isLoadings ? (<div className="w-full h-6 skeleton-medium-gray rounded-lg"></div>) : (<div className="w-full flex items-center justify-start">
                <IoIosGlobe className="h-6 w-6" fill="#667085" />
                <Link
                  href={link  || "/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primaryLight ml-1"
                >
                  {link}
                </Link>
              </div>)
            }
            {
              isLoadings ? (<div className="w-[116px] h-10 skeleton-medium-gray rounded-lg"></div>) : (<button className="w-[7.25rem] h-[2.5rem] flex-box-center gap-2 text-white rounded-lg bg-darkBlue">
                <FiPhone className="w-5 h-5" />
                <span className="font-bold">Call Us</span>
              </button>)
            }


          </div>
        </div>
        <div className={`w-full relative max-w-[43.438rem] h-[13.5rem] rounded-lg ${isLoadings ? "skeleton-medium-gray" : "bg-background"}`}>
          {/* Map Component */}
          {/* <div></div> */}
          <div className="w-full h-full">
            {
              isLoadings ? (<div className="w-full h-full skeleton-medium-gray rounded-lg"></div>) : (<iframe
                src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                width="0"
                height="0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg w-full h-full"
              ></iframe>)
            }
          </div>
        </div>
      </div>
    </ViewAllContainer>
  );
};

export default OrganizationContact;
