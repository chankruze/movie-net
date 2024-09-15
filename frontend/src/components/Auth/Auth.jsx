import React from "react";
import AuthForm from "./AuthForm";
import { sendAuthRequest } from "../../apiservice/apiservice";
import { useDispatch } from "react-redux";
import { userActions } from "../../store";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResponseReceived = (data) => {
    console.log(data);
    dispatch(userActions.login());
    localStorage.setItem("userId", data.id);
    navigate("/");
  };
  const getData = (data) => {
    console.log("Auth", data);
    sendAuthRequest(data.inputs, data.signup)
      .then(onResponseReceived)
      .catch((err) => console.log(err));
  };
  return <AuthForm onSubmit={getData} isAdmin={false} />;
};

export default Auth;
