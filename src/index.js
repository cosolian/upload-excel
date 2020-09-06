import React from "react";
import ReactDOM from "react-dom";
import SheetJSApp from "./XLXS/SheetJSApp";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <img src="http://ledprocenter.com/wp-content/uploads/2015/02/Logo-Main-Site-Ledprocenter.png" />
      <SheetJSApp />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
