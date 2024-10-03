import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./component/login";
import RootLayout from "./layout/Layout";
import Register from "./component/register";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path:"/login",
    loader: () => {
      const acces_token = localStorage.getItem("acces_token");
      if (!acces_token) {
        return null;
      }
      throw redirect("/");
    },
    element:<Login/>
  },
  {
    path: "/",
    element: <RootLayout/>,
    children:[
      {
        path:"",
        element:<h1>hallo</h1>
      },
      
    ]
  },
]);
