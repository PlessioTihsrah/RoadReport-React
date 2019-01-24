const INTIAL_STATE = {
  latitude: null,
  longitude: null
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_LOCATION':
      return { ...state, latitude: action.payload.latitude, longitude: action.payload.longitude };
    case 'LOCATION_ERROR':
      return {...state, latitude: "NA", longitude: "NA" };
    
    default:
      return state;
  }
};