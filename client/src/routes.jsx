import { createBrowserRouter, redirect } from "react-router-dom";
import Register from "./pages/Register";
import MainLayout from "./components/MainLayout";

function checkLogin() {
  if (!localStorage.access_token) {
    return redirect("/login");
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: checkLogin,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "",
        element: <h1>Hai Home</h1>,
      },
    ],
  },
]);

export default router;
