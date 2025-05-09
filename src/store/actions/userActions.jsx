import * as userService from "../../services/userService.jsx";

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const data = await userService.login(email, password);
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response?.data?.message || "Giriş başarısız",
      });
    }
  };
};

export const register = (username, email, password) => async (dispatch) => {
  dispatch({ type: "REGISTER_REQUEST" });
  try {
    const data = await userService.register(username, email, password);
    dispatch({ type: "REGISTER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAILURE",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user"); // Kullanıcıyı localStorage'den sil
  dispatch({ type: "LOGOUT" });
};
