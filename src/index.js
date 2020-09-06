import React from "react";
import ReactDOM from "react-dom";
import SheetJSApp from "./XLXS/SheetJSApp";

import "./styles.css";

function App() {
  return (
    <div className="App">
      ledprocenter.com
      <SheetJSApp />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
