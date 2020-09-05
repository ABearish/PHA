import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
const YTD = ({ onGetYTD, ytd }) => {
  useEffect(() => {
    onGetYTD();
  }, []);
  const [show, setShow] = useState(true);
  const showAlert = (show) => {
   
    if (show) {
      return (
        <Alert variant={"success"} onClose={() => setShow(false)} dismissible>{ytd} Close Approaches YTD</Alert> 
      )
    } 
    else {
      return (
        null
      )
    }
  }
  return (
    <div>
      {showAlert(show)}
      <Alert variant={"info"}>Potential Forecast</Alert>
    </div>
  );
};

export default YTD;
