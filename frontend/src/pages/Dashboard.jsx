import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { BASEURL } from "../api/api";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    axios
      .get(`${BASEURL}account/balance`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        let x = parseFloat(res?.data?.balance).toFixed(2);
        setValue(x);
      })
      .catch(() => {
        toast.error("Couldn't fetch balance");
      });
  }, []);

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={value} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
