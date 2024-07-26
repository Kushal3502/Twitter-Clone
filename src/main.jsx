import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AddPost,
  Bookmarks,
  Following,
  ForYou,
  Home,
  Login,
  Profile,
  SignUp,
} from "./pages";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "",
            element: <ForYou />,
          },
          {
            path: "following",
            element: <Following />,
          },
        ],
      },
      {
        path: "bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "profile/:slug",
        element: <Profile />,
      },
      {
        path: "add-post",
        element: <AddPost />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
