'use client'
import { useState } from 'react'

export default function StudentBookCardCarousel() {
  const images = [
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBook&psig=AOvVaw3p3h8975R1fOGzBgydBjm0&ust=1746878250576000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiWq-Oqlo0DFQAAAAAdAAAAABAE',
    '/image2.jpg',
    '/image3.jpg',
    '/image4.jpg',
    '/image5.jpg',
    '/image6.jpg'
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev < images.length - 1 ? prev + 1 : images.length - 1
    )
  }

  return (
    <div className="p-6 h-full">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bookshelf</h1>
        <div className="flex items-center gap-4">
          <select className="border rounded px-3 py-2">
            <option>Filter by</option>
            <option>Fiction</option>
            <option>Non-fiction</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Add New Book
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full">
        <div className="overflow-hidden">
          <img
            src={images[currentIndex]}
            alt={`Book ${currentIndex}`}
            className="w-full h-64 object-cover rounded shadow"
          />
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 z-20 transform -translate-y-1/2 bg-white border p-2 rounded-full shadow hover:bg-gray-100"
        >
      left  
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white border p-2 rounded-full shadow hover:bg-gray-100"
        >
      right
        </button>
      </div>
    </div>
  )
}
