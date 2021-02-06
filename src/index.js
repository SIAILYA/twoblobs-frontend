import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";


ReactDOM.render(<App />, document.getElementById("root"));

// // Init VK  Mini App


import("./eruda").then(({ default: eruda }) => {}); //runtime download

// if (process.env.NODE_ENV === "development") {
// }
