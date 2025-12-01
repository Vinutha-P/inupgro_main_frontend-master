// import React from 'react';

// interface ContentTagsProps {
//   hashtags?: string[];
//   categories?: string[];
//   subCategories?: string[];
// }

// const ContentTags: React.FC<ContentTagsProps> = ({
//   hashtags = [],
//   categories = [],
//   subCategories = [],
// }) => {
//   return (
//     <div className="space-y-4">
//       {/* Hashtags */}
//       <div className="bg-white rounded-xl shadow-sm border-[1px] border-[#EAECF0]">
//         <h2 className="font-semibold text-sm text-gray-800 bg-[#f9fafb] px-4 py-3">Hashtags</h2>
//         <div className="flex flex-wrap gap-2 text-xs px-4 py-3">
//           {hashtags.map((tag, index) => (
//             <span
//               key={index}
//               className="text-[#1C315E] bg-[#f3f4f6] px-2 py-1 rounded-md inline-block"
//             >
//               #{tag}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Categories */}
//       <div className="bg-white p-4 rounded-xl shadow-sm border-[1px] border-[#EAECF0]">
//         <h2 className="font-semibold text-sm text-gray-800 bg-[#f9fafb] px-4 py-3">Categories</h2>
//         <div className="flex flex-wrap gap-2 text-sm px-4 py-3">
//           {categories.map((category, index) => (
//             <div
//               key={index}
//               className="text-[#1C315E] bg-[#f3f4f6] px-2 py-1 rounded-md inline-block"
//             >
//               {category}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Sub-categories */}
//       <div className="bg-white rounded-xl shadow-sm border-[1px] border-[#EAECF0]">
//         <h2 className="font-semibold text-sm text-gray-800 bg-[#f9fafb] px-4 py-3">Sub-categories</h2>
//         <div className="flex flex-wrap gap-2 text-sm px-4 py-3">
//           {subCategories.map((sub, index) => (
//             <div
//               key={index}
//               className="text-[#1C315E] bg-[#f3f4f6] px-2 py-1 rounded-md inline-block"
//             >
//               {sub}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContentTags;


import React from 'react';

interface ContentTagsProps {
  hashtags?: string[];
  categories?: string[];
  subCategories?: string[];
}

interface TagSectionProps {
  title: string;
  items: string[];
  textSize?: string;
}

const TagSection: React.FC<TagSectionProps> = ({ title, items, textSize = 'text-sm' }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border-[1px] border-[#EAECF0]">
      <h2 className="font-semibold text-sm text-gray-800 bg-[#f9fafb] px-4 py-3">
        {title}
      </h2>
      <div className={`flex flex-wrap gap-2 ${textSize} px-4 py-3`}>
        {items.map((item, index) => (
          <div
            key={index}
            className="text-[#1C315E] bg-[#f3f4f6] px-2 py-1 rounded-md inline-block"
          >
            {title === 'Hashtags' ? `#${item}` : item}
          </div>
        ))}
      </div>
    </div>
  );
};

const ContentTags: React.FC<ContentTagsProps> = ({
  hashtags = [],
  categories = [],
  subCategories = [],
}) => {
  return (
    <div className="space-y-4">
      <TagSection title="Hashtags" items={hashtags} textSize="text-xs" />
      <TagSection title="Categories" items={categories} />
      <TagSection title="Sub-categories" items={subCategories} />
    </div>
  );
};

export default ContentTags;
