import logo from "./logo.svg";
import "./App.css";
import Main from "./common/layout/Main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./common/Shop/Shop";
import Inventory from "./common/Inventory/Inventory";
import Orders from "./common/Orders/Orders";
import About from "./common/About/About";
import { productsAndCartLoader } from "./loaders/productsAndCartLoaders";
import Login from "./Login/Login";
import Signup from "./common/Signup/Signup";
import PrivateRoute from "./Routes/PrivateRoute";
function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          loader: () => {
            return fetch("products.json");
          },
          element: (
            <PrivateRoute>
              {" "}
              <Shop></Shop>,
            </PrivateRoute>
          ),
        },
        {
          path: "/orders",
          loader: productsAndCartLoader,
          element: (
            <PrivateRoute>
              <Orders></Orders>,{" "}
            </PrivateRoute>
          ),
        },
        {
          path: "/inventory",
          element: (
            <PrivateRoute>
              <Inventory></Inventory>,
            </PrivateRoute>
          ),
        },
        {
          path: "about",
          element: <About></About>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/signup",
          element: <Signup></Signup>,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
