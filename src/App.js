import React, { useState } from "react";
import Application from "./Application";
import NoAccess from "./components/Login/NoAcess";

// import axios from "axios";
const App = () => {
  const isAllowed = useState(true);
  if (isAllowed) {
    return(
    <Application />

    );
  } else {
    return <NoAccess />;
  }
};

export default App;
