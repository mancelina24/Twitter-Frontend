const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        // Kayıt başarılı olsa bile otomatik giriş yapmıyoruz.
        error: null,
      };
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false, error: null };
    default:
      return state;
  }
};

export default userReducer;
