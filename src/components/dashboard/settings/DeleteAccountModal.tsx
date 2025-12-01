'use client';

import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

export default function DeleteAccountModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative z-0">
      {/* Main Box */}
      <div className="">
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Delete Account
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center relative">
            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <FaTrashAlt className="text-red-500 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Are You Sure You Want to<br />Delete Your Account?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This action can not be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  alert('Account deleted!');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="border border-gray-400 text-gray-800 font-semibold py-2 px-5 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
