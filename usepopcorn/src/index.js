import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
// import App from './App';
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      color="#fcc419"
      size={48}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating color="#ff0000" size={48} defaultRating={3} maxRating={7} />

    <Test />
  </React.StrictMode>
);

function Test() {
  const [rating, setRating] = useState(3);

  return (
    <div>
      <StarRating
        color="#0000ff"
        maxRating={10}
        onSetRating={setRating}
        defaultRating={3}
      />
      <p>This movie was rated {rating} stars</p>
    </div>
  );
}
