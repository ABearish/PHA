import React, {useCallback } from 'react';
const API_BASE_URL = '/'; 

const usePhaFetcher = (dispatch) => {
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
    const defaultStart = '2025-01-01'; 
    const defaultEnd = '2025-06-07';
    
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

export default usePhaFetcher