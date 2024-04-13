import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Root from "./Root";
import store from "./redux";
import storeAuth from "./auth";
import ModalController from "./Components/ModalController";
import AuthProvider from "react-auth-kit";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider store={storeAuth}>
    <Provider store={store}>
      <BrowserRouter>
        <ModalController />
        <Root />
      </BrowserRouter>
    </Provider>
  </AuthProvider>,
);
