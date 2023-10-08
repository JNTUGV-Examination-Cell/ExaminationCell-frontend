import React, { useState } from "react";
import Application from "./Application";
import NoAccess from "./components/Login/NoAcess";
const App = () => {
  const isAllowed = useState(true);
  if (isAllowed) {
    return <Application />;
  } else {
    return <NoAccess />;
  }
};

export default App;