import { useState, useEffect } from "react";

function SearchBar({ onSearch, value: externalValue }) {
  const [value, setValue] = useState("");

  // Update internal value when external value changes
  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue);
    }
  }, [externalValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium">
          ค้นหาที่เที่ยว
        </label>
        <input
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-400 text-center"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </div>
    </form>
  );
}

export default SearchBar;
