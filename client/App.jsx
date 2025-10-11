import React, { useReducer, useEffect, useCallback, useState } from 'react';
import TrackerList from "./components/Tracker"
import PhaList from "./components/PhaList.jsx"
import {initialState, phaReducer, usePhaFetcher} from './usePhaFetcher.js'
import CustomSearch from './components/CustomSearch.jsx';

const App = () => {
  const [state, dispatch] = useReducer(phaReducer, initialState);
  const { fetchPHAList, fetchYTD, fetchCustomList } = usePhaFetcher(dispatch);

  useEffect(() => {
    fetchYTD();
    fetchPHAList();
  }, [fetchYTD, fetchPHAList]);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-8">
      <header className="text-center py-6 border-b-2 border-red-500/50 mb-8">
        <h1 className="text-5xl font-extrabold text-red-500">PHA Tracker</h1>
        <p className="text-lg text-gray-400 mt-2">Potentially Hazardous Asteroid Monitoring System</p>
      </header>

      <div className="max-w-7xl mx-auto">
        {state.loading && <div className="text-center text-yellow-500 text-xl mb-4">Loading data...</div>}
        {state.error && <div className="bg-red-900 p-4 rounded-lg text-red-200 mb-4">Error: {state.error}</div>}
{/* 
        YTD Counter
        <YTDCounter count={state.ytdCount} /> */}

        {/* 3-Day PHA List */}
        <PhaList 
            phasList={state.phaList} 
            dispatch={dispatch} 
            trackerList={state.trackerList} 
        />

        {/* Tracker List */}
        <TrackerList 
            trackerList={state.trackerList} 
            dispatch={dispatch} 
        />

        {/* Custom Search */}
        <CustomSearch 
            customList={state.customList} 
            dispatch={dispatch} 
            trackerList={state.trackerList}
            fetchCustomList={fetchCustomList}
        />
      </div>
    </div>
  );
};

export default App;