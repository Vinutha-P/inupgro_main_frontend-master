import { GoPlay } from "react-icons/go";
import NewsPhotoCard from "./NewsPhotoCard";

const NewsVideoCard = ({ url }: { url: string }) => {
  const isVideo = url?.endsWith(".webm");
  return (
    <div className="w-full md:w-[24%] relative">
      <NewsPhotoCard thumbnail={url} />
      {isVideo && (
      <div className="absolute left-0 top-0 w-full h-full flex-box-center rounded-lg bg-black/50">
        <button className="w-fit h-fit">
          <GoPlay className="h-12 w-12 fill-white" />
        </button>
      </div>
      )}
    </div>
  );
};

export default NewsVideoCard;
