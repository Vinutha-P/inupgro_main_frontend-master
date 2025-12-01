import React, { useRef, ReactNode } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CustomCarouselProps {
    children: ReactNode;
    showArrows?: boolean;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
    children,
    showArrows = true,
}) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.offsetWidth;
            carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.offsetWidth;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="relative w-full">
            <div className="relative px-4">
                {showArrows && (
                    <button
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
                        onClick={scrollLeft}
                    >
                        <FaChevronLeft />
                    </button>
                )}

                <div
                    ref={carouselRef}
                    className="flex overflow-x-auto scroll-smooth no-scrollbar"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {React.Children.map(children, (child, index) => (
                        <div
                            className={`w-1/3 flex-shrink-0 box-border ${index !== 0 ? "pl-4" : ""}`}
                            style={{ scrollSnapAlign: "start" }}
                        >
                            {child}
                        </div>
                    ))}
                </div>

                {showArrows && (
                    <button
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
                        onClick={scrollRight}
                    >
                        <FaChevronRight />
                    </button>
                )}
            </div>
        </div>
    );
};

export default CustomCarousel;
