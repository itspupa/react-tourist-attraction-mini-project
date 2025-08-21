import { Link } from "lucide-react";
import { useState } from "react";

function TripCard({ title, description, photos = [], tags = [], url = "#", onTagClick }) {
  const [copySuccess, setCopySuccess] = useState(false);

  // ฟังก์ชัน copy link ลง clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl  mb-6">
      {/* รูปใหญ่ซ้าย */}
      {photos[0] && (
        <div className="flex-shrink-0 w-full md:w-96 h-64 md:h-64 overflow-hidden rounded-lg">
          <img
            src={photos[0]}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* เนื้อหา */}
      <div className="flex-1 flex flex-col">
        {/* หัวข้อ */}
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-2xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer mb-2"
        >
          {title}
        </a>
        
        {/* คำบรรยาย */}
        <p className="text-gray-600 text-m leading-relaxed mb-2">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>

        {/* อ่านต่อ link */}
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 text-m font-medium mb-2 cursor-pointer underline"
        >
          อ่านต่อ
        </a>

        {/* tag */}
        <div className="mb-2">
          <span className="text-gray-500 text-m mr-2">หมวด</span>
          {tags.map((tag, i) => (
            <span key={i}>
              <span
                className="text-gray-500 hover:text-blue-700 text-sm cursor-pointer underline"
                onClick={() => onTagClick && onTagClick(tag)}
              >
                {tag}
              </span>
              {i === tags.length - 2 && (
                <span className="text-gray-500 text-sm"> และ </span>
              )}
              {i < tags.length - 1 && i !== tags.length - 2 && ' '}
            </span>
          ))}
        </div>

        {/* รูปเล็ก */}
        {photos.length > 1 && (
          <div className="flex gap-7 mt-auto">
            {photos.slice(1, 4).map((p, i) => (
              <img
                key={i}
                src={p}
                alt=""
                className="w-28 h-28 rounded-md object-cover flex-shrink-0"
              />
            ))}
          </div>
        )}
      </div>

      {/* icon ด้านขวา */}
      <div className="hidden md:flex items-end gap-2">
        {/* Copy link button */}
        <button
          onClick={copyToClipboard}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            copySuccess 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          title="Copy link to clipboard"
        >
          {copySuccess ? 'Copied!' : 'Copy Link'}
        </button>
        
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Link className="text-blue-500 w-7 h-7 hover:text-blue-600" />
        </a>
      </div>
    </div>
  );
}

export default TripCard;
