const INTIAL_STATE = {
  isSignedIn: null,
  user: {}
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, isSignedIn: true, user: action.payload };
    case 'SIGN_OUT':
      return { ...state, isSignedIn: false, user: {} };
    case 'GET_INFO':
      return {...state, isSignedIn : action.payload.isSignedIn, user: action.payload.user};
    
    default:
      return state;
  }
};