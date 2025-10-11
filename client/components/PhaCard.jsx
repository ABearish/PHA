import React from "react";

const PhaCard = ({ pha, onTrack, onRemove, isTracking = false }) => {
    const velocityMPH = new Intl.NumberFormat().format(pha.velocity);
    const missDistanceLunar = new Intl.NumberFormat().format(pha.miss_distance);
    const estimatedDiameterFeet = `${pha.est_diameter_min} - ${pha.est_diameter_max}`;
    const date = new Date(pha.date).toLocaleDateString();

    return (
        <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition duration-300 transform hover:scale-[1.02] flex flex-col">
            <h3 className="text-lg font-bold text-red-400 truncate" title={pha.name}>{pha.name}</h3>
            <p className="text-sm text-gray-400 mb-3">Close Approach: {date}</p>
            
            <div className="text-xs space-y-1 text-gray-300 flex-grow">
                <p><strong>Velocity:</strong> {velocityMPH} mph</p>
                <p><strong>Miss Distance:</strong> {missDistanceLunar} Lunar Distances</p>
                <p><strong>Diameter:</strong> {estimatedDiameterFeet} feet</p>
            </div>
            
            <div className="mt-4 space-y-2">
                <a 
                    href={pha.info+"&view=VOP"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full inline-block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition text-sm"
                >
                    View Orbital Model
                </a>
                
                {isTracking ? (
                    <button
                        onClick={() => onRemove(pha.id)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition text-sm"
                    >
                        Stop Tracking
                    </button>
                ) : (
                    <button
                        onClick={() => onTrack(pha)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition text-sm"
                    >
                        Track
                    </button>
                )}
            </div>
        </div>
    );
};

export default PhaCard