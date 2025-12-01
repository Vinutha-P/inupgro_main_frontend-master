// "use client";

// export default function DeleteNews() {
//     return (
//         <div className="bg-white shadow-md rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4 text-red-700">Delete News</h2>
//             <p className="text-gray-700 mb-4">
//                 Here you can manage or delete news items. Select items below to remove them from your news board.
//             </p>
//             {/* Replace below with dynamic list and delete logic if needed */}
//             <ul className="list-disc pl-5 space-y-2 text-gray-800">
//                 <li>News Item 1 <button className="ml-2 text-red-600 hover:underline">Delete</button></li>
//                 <li>News Item 2 <button className="ml-2 text-red-600 hover:underline">Delete</button></li>
//                 <li>News Item 3 <button className="ml-2 text-red-600 hover:underline">Delete</button></li>
//             </ul>
//         </div>
//     );
// }


'use client';

import DeleteAccountModal from "./DeleteAccountModal";

export default function DeleteNews() {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-6">
      <h2 className="text-lg font-semibold mb-2">Delete Your Account</h2>
      <p className="text-sm text-gray-700 leading-relaxed">
        Lorem ipsum dolor sit amet consectetur. Lacus mi cras egestas lorem. Eget ac arcu lorem 
        duis ac. Adipiscing non ornare feugiat sit dui. Enim egestas molestie vitae bibendum 
        volutpat non cras morbi sit.
        <br />
        Sit elementum nulla aliquam quam enim mattis eget eget dictum. Sed molestie lacinia neque 
        lacinia elementum pellentesque tortor sapien. Nam accumsan interdum aenean semper. Urna 
        morbi sagittis malesuada potenti quis. Sed lorem pharetra diam et. Volutpat diam luctus 
        dolor eget sed volutpat et lobortis. Felis amet feugiat interdum nulla faucibus quis sapien. 
        Morbi congue amet tellus turpis magna a gravida. Sodales tortor congue mauris nulla viverra 
        id ut suspendisse nulla.
        <br />
        Sit pellentesque ut rhoncus maecenas nunc sit. Etiam sem venenatis lacus mattis. Cras 
        pellentesque nisl non blandit felis donec curabitur ultricies egestas. Euismod ornare 
        maecenas facilisis at in eros. Integer nibh morbi odio a eu. Scelerisque ac arcu elementum 
        rhoncus suspendisse. Congue porttitor est nam iaculis etiam odio in.
      </p>
      {/* <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md">
        Delete Account
      </button> */}
      <DeleteAccountModal />
    </div>
  );
}
