import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

let TOKEN = null;

export const refreshToken = async (dispatch) => {
  try {
    const { data } = await axios.post('http://localhost:8000/api/auth/refresh', {
      refresh_token: localStorage.getItem('refresh_token')
    });
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    dispatch({ type: "UPDATE_TOKEN", payload: data.access_token });
    return data.access_token;
  } catch (error) {
    console.error(error);
  }
};


if(localStorage) {
  const root = JSON.parse(localStorage.getItem("persist:root"));
  if (root && root.user) {
    const user = JSON.parse(root.user);
    if (user && user.currentUser && user.currentUser.accessToken) {
      TOKEN = user.currentUser.accessToken;
    } else {
      console.error("User or access token not found");
    }
  } else {
    console.error("persist:root not found in local storage");
  }
} else {
  console.error("localStorage not available");
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: TOKEN ? { token: `Bearer ${TOKEN}` } : {}
});
