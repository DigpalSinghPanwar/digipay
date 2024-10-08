import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Appbar = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">DigiPay</div>
      <div className="flex justify-center items-center">
        {/* <Button label={"Logout"} /> */}
        <button
          onClick={() => {
            toast.success("Logout Successful");
            localStorage.removeItem("token");
            navigate("/signin");
          }}
          type="button"
          className=" flex flex-col justify-center  h-8 p-2 mr-4  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm   "
        >
          Logout
        </button>
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">D</div>
        </div>
      </div>
    </div>
  );
};
