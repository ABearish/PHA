import React from "react";
import PhaCard from "../components/PhaCard";

const TrackerList = ({ trackerList, dispatch }) => {
    return (
        <section className="mt-8">
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                🚀 My Tracked Asteroids ({trackerList.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trackerList.length > 0 ? trackerList.map(pha => (
                    <PhaCard 
                        key={pha.id} 
                        pha={pha} 
                        isTracking={true}
                        onTrack={() => {}} // Disabled when viewing tracker list
                        onRemove={(id) => dispatch({ type: 'REMOVE_TRACK_PHA', payload: id })}
                    />
                )) : (
                    <div className="bg-gray-800 p-6 rounded-xl text-center col-span-full">
                        <p className="text-lg text-gray-400">Tracked list is empty. Click "Track" on any asteroid above to add it here.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TrackerList