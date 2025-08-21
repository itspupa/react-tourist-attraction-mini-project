import { useState, useEffect } from "react";
import TripCard from "./components/TripCard";
import SearchBar from "./components/SearchBar";


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [trips, setTrips] = useState([]); 
  const [loading, setLoading] = useState(false);

  // ฟังก์ชัน fetch data
  const fetchData = async (keyword) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:4001/trips?keywords=${keyword}`);
      if (!res.ok) {
        try {
          console.error("Fetch error:", await res.json());
        } catch (_) {}
        setTrips([]);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) setTrips(data);
      else if (Array.isArray(data.data)) setTrips(data.data);
      else setTrips([]);
    } catch (error) {
      console.error("Fetch error:", error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);

  // ฟังก์ชันเพิ่ม tag ลงใน search term โดยไม่ซ้ำ
  const addTagToSearch = (currentSearch, newTag) => {
    const currentTags = currentSearch.trim().split(/\s+/).filter(tag => tag.length > 0);
    
    // ตรวจสอบว่า tag นี้มีอยู่แล้วหรือไม่
    if (currentTags.includes(newTag)) {
      return currentSearch; // ถ้ามีอยู่แล้ว ไม่ต้องเพิ่ม
    }
    
    // เพิ่ม tag ใหม่
    if (currentTags.length === 0) {
      return newTag;
    } else {
      return currentTags.join(' ') + ' ' + newTag;
    }
  };

  // Handle tag click
  const handleTagClick = (tag) => {
    const newSearchTerm = addTagToSearch(searchTerm, tag);
    setSearchTerm(newSearchTerm);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="py-8">
        <h1 className="text-4xl font-bold text-sky-600 text-center">
          เที่ยวไหนดี
        </h1>
        <div className="mt-4 max-w-4xl mx-auto px-4">
          <SearchBar onSearch={setSearchTerm} value={searchTerm} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-12">
        {loading && (
          <p className="text-center text-slate-500">Loading...</p>
        )}
        <ul className="mt-6 space-y-8">
          {Array.isArray(trips) && trips.length > 0 ? (
            trips.map((trip, i) => (
              <li key={trip.eid || trip.id || i}>
                <TripCard {...trip} onTagClick={handleTagClick} />
              </li>
            ))
          ) : (
            <p className="text-center text-slate-500">No trips found.</p>
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
