// app/page.tsx (or any component you like)

"use client";
import React from "react";
import { FaReply } from "react-icons/fa";

const feedbackData = [
  {
    id: 1,
    status: "Open",
    title: "Want to discuss further on the admission fee structure",
    description:
      "Let's discuss further details about the admission to ensure they align with your needs. Please share your thoughts or any specific requirements.",
    reply: null,
  },
  {
    id: 2,
    status: "Resolved",
    title: "Want to discuss further on the pricing plans",
    description:
      "Let's discuss further details about the pricing plans to ensure they align with your needs. Please share your thoughts or any specific requirements.",
    reply: "Sure, please let us know your availability, and our team will get in touch with you. Looking forward to connecting!",
  },
  {
    id: 3,
    status: "New",
    title: "Want to discuss further on the admission fee structure",
    description:
      "Let's discuss further details about the admission to ensure they align with your needs. Please share your thoughts or any specific requirements.",
    reply: null,
  },
  {
    id: 4,
    status: "Open",
    title: "Want to discuss further on the admission fee structure",
    description:
      "Let's discuss further details about the admission to ensure they align with your needs. Please share your thoughts or any specific requirements.",
    reply: null,
  },
];

export default function FeedbackList() {
  return (
    <div className="min-h-screen bg-gray-100 px-6">
      <div className=" space-y-4">
        {feedbackData.map((item) => (
          <div
            key={item.id}
            className="bg-white border shadow-md rounded-lg p-4 space-y-3"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${
                  item.status === "New"
                    ? "bg-green-100 text-green-800"
                    : item.status === "Open"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {item.status}
              </span>
            </div>

            {item.reply && (
              <div className="mt-4 border-t pt-3">
                <h4 className="font-medium text-gray-700 mb-1">Replies</h4>
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="text-gray-600 text-sm">{item.reply}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center text-blue-600 text-sm cursor-pointer mt-2 hover:underline">
              <FaReply className="mr-2" />
              Reply Feedback
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
