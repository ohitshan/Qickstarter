import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import styles from "../Login/Login.module.css";
import { useAppDispatch } from "../../app/hooks";
import { registerUserAsync } from "../../Slices/userSlice";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const REST_API_KEY = "32f98e56985ea93c617ac50ceca750bf";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/register/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onFinish = () => {
    if (!Email) return;
    let userdata = {
      name: username,
      email: Email,
      password: Password,
    };
    dispatch(registerUserAsync(userdata)).then((res: any) => {
      console.log(res);
      if (res.payload.success) {
        navigate("/login");
      }
    });
  };

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await (window as any).Kakao.API.request({
        url: "/v2/user/me",
      });
      // 사용자 정보 변수에 저장

      let userdata = {
        name: data.properties.nickname,
        email: `${data.id}@naver.com`,
        password: data.id,
      };
      dispatch(registerUserAsync(userdata)).then((res: any) => {
        if (res.payload.success) {
          navigate("/login");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

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
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input onChange={nameChange} value={username} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="Email"
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
            계정 생성하기
          </Button>
        </Form.Item>
        <div className={styles.hrsect}>or </div>
        <h1>
          <a href={KAKAO_AUTH_URL}>Kakao으로 회원가입</a>
        </h1>
      </Form>
    </div>
  );
};

export default RegisterPage;
