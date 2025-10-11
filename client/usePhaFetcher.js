import React, {useCallback } from 'react';

const API_BASE_URL = '/'; 

export const initialState = {
  phaList: [],
  ytdCount: 0,
  customList: [],
  trackerList: [],
  loading: false,
  error: null,
};

export function phaReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'UPDATE_PHA_LIST':
      return { ...state, phaList: action.payload, loading: false };
    case 'GET_YTD':
      // The API returns an array like [{ pha_count: X }]
      const count = action.payload?.[0]?.pha_count || 0;
      return { ...state, ytdCount: count, loading: false };
    case 'UPDATE_CUSTOM':
      return { ...state, customList: action.payload, loading: false };
    case 'CLEAR_CUSTOM':
      return { ...state, customList: [] };
    case 'TRACK_PHA':
      
      if (!state.trackerList.some(pha => pha.id === action.payload.id)) {
        return { ...state, trackerList: [...state.trackerList, action.payload] };
      }
      return state;
    case 'REMOVE_TRACK_PHA':
      return { ...state, trackerList: state.trackerList.filter(pha => pha.id !== action.payload) };
    default:
      return state;
  }
}

export const usePhaFetcher = (dispatch) => {
  const fetchPHAList = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const response = await fetch(`${API_BASE_URL}pha`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      dispatch({ type: 'UPDATE_PHA_LIST', payload: data });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch 3-Day list.' });
    }
  }, [dispatch]);

  const fetchYTD = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}pha/ytd`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      dispatch({ type: 'GET_YTD', payload: data });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch YTD count.' });
    }
  }, [dispatch]);

  const fetchCustomList = useCallback(async (start, end) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    // Use default dates if none are provided
    const defaultStart = '2025-01-01'; 
    const defaultEnd = '2025-01-07';
    
    try {
      const response = await fetch(`${API_BASE_URL}pha/custom/${start || defaultStart}/${end || defaultEnd}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      dispatch({ type: 'UPDATE_CUSTOM', payload: data });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch custom range.' });
    }
  }, [dispatch]);

  return { fetchPHAList, fetchYTD, fetchCustomList };
};


export const PhaList = ({ phasList, dispatch, trackerList }) => {
    const isTracking = (pha) => trackerList.some(t => t.id === pha.id);
    return (
        <section className="mt-8">
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
                Closest 3-Day Approach
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
                    <p className="text-gray-400 col-span-full">No potentially hazardous asteroids found in the next 3 days.</p>
                )}
            </div>
        </section>
    );
};
