import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { BASEURL } from "../api/api";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const Signin = () => {
  const navigate = useNavigate();

  async function postSignin() {
    try {
      const response = await axios.post(`${BASEURL}user/signin`, {
        userName,
        password,
      });
      console.log("response", response);
      localStorage.setItem("token", response?.data?.token);
      toast.success("Successfully login");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      console.log(error?.response);
      toast.error("Incorrect Inputs");
    }
  }

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  console.log(userName, password);
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder="user@gmail.com"
            label={"Email"}
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button label={"Sign in"} onClick={postSignin} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
