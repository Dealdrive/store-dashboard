import axios from "axios";

const BASE_URL = "http://localhost:8000/api/"

let TOKEN = null;

// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWVlYzFmYmRhYTExNDI2Yjg3ODVjMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDU4MDg0OCwiZXhwIjoxNjc0ODQwMDQ4fQ.CIeJSUr0bMCF1sAUM4z6249wKiSu6pCbCTWmfJg9QyY"

// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).curentUser.accessToken

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
})
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
})