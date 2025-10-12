import React from "react"
const YTDCounter = ({ count }) => (
    <div className="mt-4 inline-flex items-center space-x-2 bg-red-800/30 text-red-300 px-4 py-1.5 rounded-full shadow-inner">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span className="font-bold text-lg">{count}</span>
        <span className="text-sm">Close Approaches (YTD)</span>
    </div>
);

export default YTDCounter