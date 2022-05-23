import { Button, Col, Form, Input, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { changePasswordUserAsync } from "../../../../Slices/userSlice";

function Account() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user);
  const [email, setEmail] = useState(user?.authUser?.email);
  const [password, setPassword] = useState("");
  const [CurrentPassword, setCurrentPassword] = useState("");
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  // const []
  useEffect(() => {
    setEmail(user?.authUser?.email);
  }, [user]);
  console.log(user);
  const onPasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const onCurrentPasswordChange = useCallback((e) => {
    setCurrentPassword(e.target.value);
  }, []);

  return (
    <div style={{ width: "95%", maxWidth: "1400px" }}>
      <Row style={{ textAlign: "start", width: "100%" }}>
        <Col span={16}>
          <div style={{ width: "50%", fontWeight: 800 }}>
            <label>Email</label>
            <Input size="large" disabled value={email} />
          </div>
          <Form
            style={{ width: "50%", fontWeight: 800, marginTop: "20px" }}
            layout="vertical"
            initialValues={{ initialemail: user?.authUser?.email }}
            onFinish={() => {
              alert("12");
              let body = {
                id: user?.authUser?._id,
                email: user?.authUser?.email,
                password: password,
                CurrentPassword: CurrentPassword,
              };
              dispatch(changePasswordUserAsync(body)).then((res: any) =>
                console.log(res)
              );
            }}
          >
            <Form.Item label="Password" name="Password">
              <Button
                onClick={() => {
                  setShowChangePasswordForm(!showChangePasswordForm);
                }}
                style={{
                  background: "#3D3D66",
                  color: "white",
                  height: "40px",
                }}
              >
                Change password
              </Button>
            </Form.Item>
            {showChangePasswordForm && (
              <div>
                <Form.Item
                  label="New Password"
                  name="password"
                  rules={[
                    { required: true, message: "Minimum 6 characters" },
                    {
                      min: 6,
                      message: "Please input longer password!",
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    onChange={onPasswordChange}
                    value={password}
                  />
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
                  name="Confirm Password"
                  rules={[
                    {
                      required: true,
                      message: "Make sure they match!",
                    },

                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password size="large" />
                </Form.Item>
              </div>
            )}
            <Form.Item
              label="Current Password"
              name="Current Password"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              help="Enter your current password to save these changes."
            >
              <Input.Password
                size="large"
                onChange={onCurrentPasswordChange}
                value={CurrentPassword}
              />
            </Form.Item>
            <Button
              style={{
                marginTop: "10px",
                background: "#037362",
                color: "white",
                height: "40px",
              }}
              htmlType="submit"
            >
              Save settings
            </Button>
          </Form>
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );
}

export default Account;
