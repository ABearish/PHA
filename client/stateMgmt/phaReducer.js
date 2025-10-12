function phaReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'UPDATE_PHA_LIST':
      return { ...state, phaList: action.payload, loading: false };
    case 'GET_YTD':
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

export default phaReducer