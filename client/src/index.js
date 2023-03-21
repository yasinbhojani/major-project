import "bootstrap/dist/css/bootstrap.min.css";
import 'react-tooltip/dist/react-tooltip.css'
import TimeAgo from 'javascript-time-ago'
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
