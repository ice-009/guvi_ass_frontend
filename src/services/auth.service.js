import axios from "axios";

const API_URL = "https://guvi-ass-backend.onrender.com/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response.data)
      }

      return response.data;
    }).catch((error) => {
      // Handle the error, e.g., display an error message.
      console.error("Login error:", error);
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));

};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
