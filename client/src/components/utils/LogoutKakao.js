import React from "react";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { logoutUserAsync } from "../../Slices/userSlice";

const Auth = () => {
  // calllback으로 받은 인가코드
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logoutUserAsync());
  };
  const getToken = async () => {
    try {
      onLogout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return null;
};

export default Auth;
