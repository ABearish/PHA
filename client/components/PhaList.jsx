import React from "react";
import PhaCard from "./PhaCard";

const PhaList = ({ phasList, dispatch, trackerList }) => {
    const isTracking = (pha) => trackerList.some(t => t.id === pha.id);
    return (
        <section className="mt-8">
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                Next 3 Close Approaches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {phasList.length > 0 ? phasList.map(pha => (
                    <PhaCard 
                        key={pha.id} 
                        pha={pha} 
                        isTracking={isTracking(pha)}
                        onTrack={(p) => dispatch({ type: 'TRACK_PHA', payload: p })}
                        onRemove={(id) => dispatch({ type: 'REMOVE_TRACK_PHA', payload: id })}
                    />
                )) : (
                    <p className="text-gray-400 col-span-full">No upcoming potentially hazardous asteroids found.</p>
                )}
            </div>
        </section>
    );
};

export default PhaList