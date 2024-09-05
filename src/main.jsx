import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Party from "./pages/Party.jsx";
import SessionNotes from "./pages/SessionNotes.jsx";
import Generators from "./pages/Generators.jsx"
import User from "./pages/User.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route
        index
        element={<Home />}
      />
      <Route
        path="/party"
        element={<Party />}
        // loader={async () => {
        //   const res = await axios.get("/api/party");
        //   return { party: res.data };
        // }}
      />
      <Route
        path="/sessionNotes"
        element={<SessionNotes />}
        // loader={async () => {
        //   const res = await axios.get("/api/sessionNotes");
        //   const res2 = await axios.get("/api/dmNotes");
        //   return { sessionNotes: res.data, dmNotes: res2.data };
        // }}
      />
      <Route path="/generators" element={<Generators />} />
      <Route path="/user" element={<User />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
