export const login = (email, password) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });
  try {
    const response = await userService.login(email, password);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  dispatch({ type: "REGISTER_REQUEST" });
  try {
    const response = await userService.register(username, email, password);
    dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
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
