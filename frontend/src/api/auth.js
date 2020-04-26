import axios from "axios";

export const login = model => {
  return axios.post("/login", model).then(res => {
    const token = `Bearer ${res.data.token}`;
    localStorage.setItem("FBIdToken", token);
    axios.defaults.headers.common["Authorization"] = token;
  });
};

export const getCredentials = () => {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    "FBIdToken"
  );
  return axios.get("/user");
};

export const logout = () => {
  localStorage.removeItem("FBIdToken");
  axios.defaults.headers.common["Authorization"] = null;
};

export const signup = model => {
  return axios.post("/signup", model).then(res => {
    const token = `Bearer ${res.data.token}`;
    localStorage.setItem("FBIdToken", token);
    axios.defaults.headers.common["Authorization"] = token;
  });
};
