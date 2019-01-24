import api from '../api/api';
import history from '../history';


export const signIn = data => async(dispatch) =>  {
  const response = await api.post("/login", data);
  if(response.data.status === "success"){
    dispatch ({
    type: 'SIGN_IN',
    payload: response.data.user
  });
  history.push("/");
  } else {
    history.push("/");
  }
  
};

export const signOut = () => async(dispatch) => {
  const response = await api.post("/logout");
  if(response.status === 200){
  dispatch ({
    type: 'SIGN_OUT'
  });
  }
};


export const getPosts = () => async(dispatch) => {
  const response = await api.get("/reports");
  if(response.status === 200){
  dispatch ({
    type: 'GET_POSTS',
    payload: response.data
  });
  }
};

export const getSignInStatus = () => async(dispatch) => {
    const response = await api.get("/info");
    dispatch({
      type: "GET_INFO",
      payload : {
        isSignedIn: response.data.isLoggedIn,
        user: response.data.user
      } 
      
    })
};

export const getPost = (id) => async(dispatch) => {
    const response = await api.get(`/report/${id}`);
    if(response.status === 200){
    dispatch({
      type: "GET_POST",
      payload : response.data
    })}
};

export const getLocation = () => (dispatch) => {
    navigator.geolocation.getCurrentPosition(function(position) {
      dispatch({
      type: "GET_LOCATION",
      payload : {
        latitude: position.coords.latitude,
  longitude: position.coords.longitude
      } 

})

}, function(err){
  dispatch({type: "LOCATION_ERROR"})
})}

export const locationError = () => {
  return({
    type: "LOCATION_ERROR"
  })
}

