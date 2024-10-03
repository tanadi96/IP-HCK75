import { createBrowserRouter } from "react-router-dom";
import Login from "../component/login";
// import Nav from "../component/Nav";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>halooo</h1>,
  },
  {
    path:"/login",
    element:<Login/>
  }
]);
