"use client"


import ComingSoonModal from "@/components/pages/ComingSoonModal";

import { store } from "@/lib/store";
import { Provider } from "react-redux";

const page = () => {
  return (
    <Provider store={store}>
      {/* <ComingSoonModal /> */}
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">

      
          <div className="absolute top-4 left-4">
            <button className="bg-gray-800 text-white px-4 py-1 rounded shadow">
              Sneak Peek
            </button>
          </div>

        
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
          >
            &times;
          </button>

         
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-6 pb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Upcoming Feature</h2>
              <p className="text-gray-600">
                Here's a quick look at something exciting that's coming soon!
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Preview"
                className="w-48 h-48 object-cover rounded"
              />
            </div>
          </div>

        
          <div className="mt-4 overflow-hidden bg-blue-600 text-white py-2 rounded-b-lg relative">
            <div
              className="whitespace-nowrap text-lg font-semibold"
              style={{
                display: 'inline-block',
                animation: 'marquee 10s linear infinite',
                whiteSpace: 'nowrap',
              }}
            >
              Coming Soon &nbsp; Coming Soon &nbsp; Coming Soon &nbsp; Coming Soon &nbsp;
            </div>

            
            <style jsx>{`
            @keyframes marquee {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
          `}</style>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default page;
