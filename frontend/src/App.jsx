import { Outlet, createBrowserRouter } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="app overflow-x-hidden box-border h-screen w-screen m-0 p-0">
      <Outlet />
      <ToastContainer />
    </div>
  );
}

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute Component={<Dashboard />} />,
        // element: <Dashboard />,
      },
      {
        path: "/send",
        element: <ProtectedRoute Component={<SendMoney />} />,
        // element: <SendMoney />,
      },
    ],
  },
]);

export default AppRouter;
