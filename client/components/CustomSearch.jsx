import React, { useState } from 'react';
import PhaCard from "./PhaCard";

const today = new Date();
const fullYear = today.getFullYear();
let month = (today.getMonth()+1);
month = (month.length == 1) ? `0${month}` : `${month}` ;
let date = (today.getDate().length == 1) ? `0${today.getDate()}` : `${today.getDate()}`
const formattedDate = `${fullYear}-${month}-${date}`

const CustomSearch = ({ customList, dispatch, trackerList, fetchCustomList }) => {
  const [start, setStart] = useState(formattedDate);
  const [end, setEnd] = useState(formattedDate);
  const isTracking = (pha) => trackerList.some(t => t.id === pha.id);

  const handleSearch = () => {
    fetchCustomList(start, end);
  };


  return (
    <section className="mt-8 p-6 bg-gray-800/70 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">Date-to-Date Search (2025 Data)</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          max="2025-12-31"
          min="2025-01-01"
          defaultValue={formattedDate}
      
        />
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          max="2025-12-31"
          min="2025-01-01"
          defaultValue={formattedDate}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Search Custom Range
        </button>
        <button
          onClick={() => dispatch({ type: 'CLEAR_CUSTOM' })}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Clear Results
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customList.length > 0 ? customList.map(pha => (
            <PhaCard 
                key={pha.id} 
                pha={pha} 
                isTracking={isTracking(pha)}
                onTrack={(p) => dispatch({ type: 'TRACK_PHA', payload: p })}
                onRemove={(id) => dispatch({ type: 'REMOVE_TRACK_PHA', payload: id })}
            />
        )) : (
            <p className="text-gray-400 col-span-full">No custom data loaded. Use the search above.</p>
        )}
      </div>
    </section>
  );
};

export default CustomSearch