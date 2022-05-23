import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import styles from "./Login.module.css";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { loginUserAsync } from "../../Slices/userSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const REST_API_KEY = "32f98e56985ea93c617ac50ceca750bf";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/login/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await (window as any).Kakao.API.request({
        url: "/v2/user/me",
      });
      // 사용자 정보 변수에 저장
      console.log(data);
      let body = {
        email: `${data.id}@naver.com`,
        password: data.id.toString(),
      };
      dispatch(loginUserAsync(body)).then((res: any) => {
        console.log(res);
        if (res.payload.loginSuccess) {
          navigate("/");
        } else {
          navigate("/signup");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  const onFinish = () => {
    let body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUserAsync(body)).then((res: any) => {
      if (res.payload.loginSuccess) {
        navigate("/");
      }
    });
  };

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input onChange={emailChange} value={Email} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password onChange={passwordChange} value={Password} />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <div className={styles.account}>
          아직 계정이 없으신가요?{" "}
          <Link to="/signup">
            <span className={styles.create}>계정만들기</span>
          </Link>
        </div>
        <h1>
          <a href={KAKAO_AUTH_URL}>Kakao으로 로그인</a>
        </h1>
      </Form>
    </div>
  );
};

// import { useUsersMutation } from "../../api/userapi";
// import axios from "axios";
// import { useEffect } from "react";
// function Login() {
//   // const { data, error, isLoading, isFetching, isSuccess } = useUsersMutation();
//   useEffect(() => {
//     let body = {
//       email: "test1@naver.com",
//       password: "12345678",
//     };
//     let req = axios.post("api/users/login", body).then((res) => res.data);
//     req.then((res) => console.log(res));
//   }, []);
//   return (
//     <div>
//       <AddContent />
//     </div>
//   );
// }

// export const AddContent = () => {
//   const [users] = useUsersMutation();
//   const user = {
//     name: "jklje",
//     email: "tiwoiruifgsl@naver.com",
//     password: "12345678",
//   };
//   const addHandler = async () => {
//     await users(user).then((res) => console.log(res));
//   };
//   return (
//     <>
//       <button onClick={addHandler}> Add</button>
//     </>
//   );
// };

export default Login;
