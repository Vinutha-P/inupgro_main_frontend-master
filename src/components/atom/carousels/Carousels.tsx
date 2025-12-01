// components/atom/carousels/CustomCarousel.tsx
import React, { useRef, ReactNode } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps {
    children: ReactNode;
    showArrows?: boolean;
    itemWidth?: string; // tailwind width class like "w-full", "w-1/3", etc.
}

const Carousels: React.FC<CarouselProps> = ({
    children,
    showArrows = true,
    itemWidth = "min-w-[300px]", // default width for items
}) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.offsetWidth;
            carouselRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative w-full">
            {showArrows && (
                <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2"
                    onClick={() => scroll("left")}
                >
                    <FaChevronLeft />
                </button>
            )}

            <div
                ref={carouselRef}
                className="flex overflow-x-auto scroll-smooth no-scrollbar space-x-4 py-2"
                style={{ scrollSnapType: "x mandatory" }}
            >
                {React.Children.map(children, (child, index) => (
                    <div
                        className={`${itemWidth} flex-shrink-0 scroll-snap-start`}
                        style={{
                            scrollSnapAlign: "start",
                            width: itemWidth === "half" ? "calc(50% - 0.5rem)" : undefined,
                        }}
                        key={index}
                    >
                        {child}
                    </div>
                ))}
            </div>

            {showArrows && (
                <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2"
                    onClick={() => scroll("right")}
                >
                    <FaChevronRight />
                </button>
            )}
        </div>
    );
};

export default Carousels;
