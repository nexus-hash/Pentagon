import React, { useEffect } from "react";
import Loader from "../utils/Loader";

export default function Logout(props) {
  
  useEffect(() => {
    setTimeout(() => {
      localStorage.clear();
      props.history.push("/login");
    },2000)
  },[])
  return (
    <Loader message="Logging out"></Loader>
  );
}