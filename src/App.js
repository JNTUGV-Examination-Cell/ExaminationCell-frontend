import React, { useState } from "react";
import Application from "./Application";
import NoAccess from "./components/Login/NoAcess";
// import axios from "axios";
const App = () => {
  const isAllowed = useState(true);
  // const [userIp, setUserIp] = useState("");
  // const valid_ips = [
  //   "117.221.58.207",
  //   "223.187.31.81",
  //   "117.244.11.130",
  //   "117.221.59.12",
  //   "59.93.114.190",
  // ];
  // useEffect(() => {
  //   const fetchip = async () => {
  //     const response = await axios.get("https://api.ipify.org/?format=json");
  //     setUserIp(response.data.ip);
  //     console.log(userIp);
  //     setIsAllowed(valid_ips.includes(userIp));
  //   };
  //   fetchip();
  // });
  if (isAllowed) {
    return <Application />;
  } else {
    return <NoAccess />;
  }
};

export default App;