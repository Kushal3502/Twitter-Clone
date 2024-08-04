import React from "react";
import ReactDOM from "react-dom/client";
import {Toaster} from 'react-hot-toast'
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AddPost,
  Bookmarks,
  EditTweet,
  Following,
  ForYou,
  Home,
  Login,
  Profile,
  SignUp,
  ViewTweet,
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
        path: "profile",
        element: <Profile />,
      },
      {
        path: "add-post",
        element: <AddPost />,
      },
      {
        path: "tweet/:slug",
        element: <ViewTweet />,
      },
      {
        path: "edit-tweet/:slug",
        element: <EditTweet />,
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
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>
);
