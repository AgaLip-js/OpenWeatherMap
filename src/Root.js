import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store/store";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";

const Root = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>
);

export default Root;
