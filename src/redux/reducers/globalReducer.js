import Constants from "../../constants/constants";
import { lightTheme } from "../../theme/Styles";

const initialState = {
  themeMode: Constants.THEME__MODE__LIGHT,
  theme: lightTheme,
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default globalReducer;
