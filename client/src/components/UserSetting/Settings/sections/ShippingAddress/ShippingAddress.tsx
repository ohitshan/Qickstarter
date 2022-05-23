import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import {
  AddressListForm,
  deleteAddressAsync,
  editAddressListAsync,
} from "../../../../../Slices/userSlice";
import styles from "../../Settings.module.css";
const { Option } = Select;
function ShippingAddress() {
  const user = useAppSelector((state: any) => state.user);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [Country, setCountry] = useState("Korea");
  const [AddressNickname, setAddressNickname] = useState("");
  const [FullName, setFullName] = useState("");
  const [AddressMain, setAddressMain] = useState("");
  const [AddressSub, setAddressSub] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [ShippingAddressLists, setShippingAddressLists] = useState<
    AddressListForm[]
  >([]);

  useEffect(() => {
    setShippingAddressLists(user?.authUser?.addressList);
  }, [user]);
  console.log(ShippingAddressLists);

  const onFinish = useCallback(() => {
    let body = {
      id: Date.now(),
      country: Country,
      addressNickname: AddressNickname,
      fullName: FullName,
      addressMain: AddressMain,
      addressSub: AddressSub,
      city: City,
      state: State,
      postalCode: PostalCode,
      phoneNumber: PhoneNumber,
    };
    dispatch(editAddressListAsync(body)).then((res: any) => {
      if (res.payload.edit) {
        form.resetFields();
        setCountry("Korea");
      }
    });
  }, [
    form,
    Country,
    dispatch,
    AddressNickname,
    FullName,
    AddressMain,
    AddressSub,
    City,
    State,
    PostalCode,
    PhoneNumber,
  ]);
  console.log(Country);

  const onCountryChange = useCallback((value) => {
    setCountry(value);
  }, []);

  const onAddressNicknameChange = useCallback((e) => {
    setAddressNickname(e.target.value);
  }, []);

  const onFullNameChange = useCallback((e) => {
    setFullName(e.target.value);
  }, []);

  const onAddressMainChange = useCallback((e) => {
    setAddressMain(e.target.value);
  }, []);

  const onAddressSubChange = useCallback((e) => {
    setAddressSub(e.target.value);
  }, []);

  const onCityChange = useCallback((e) => {
    setCity(e.target.value);
  }, []);

  const onStateChange = useCallback((e) => {
    setState(e.target.value);
  }, []);

  const onPostalCodeChange = useCallback((e) => {
    setPostalCode(e.target.value);
  }, []);

  const onPhoneNumberChange = useCallback((e) => {
    setPhoneNumber(e.target.value);
  }, []);

  const onDeleteAddress = useCallback(
    (addressId) => {
      let body = {
        id: addressId,
      };
      dispatch(deleteAddressAsync(body)).then((res: any) => {
        let newAddressList = [...ShippingAddressLists];
        let filtered = newAddressList.filter((list) => list.id !== addressId);
        setShippingAddressLists(filtered);
      });
    },
    [ShippingAddressLists, dispatch]
  );

  return (
    <div style={{ maxWidth: "1400px", width: "100%" }}>
      <Row
        style={{
          textAlign: "start",
          width: "100%",
          borderBottom: "1px solid #D9D9D9 ",
          padding: "30px 20px",
        }}
      >
        <Col span={24} sm={10}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
          >
            <h1>New address</h1>
            <Form.Item label="Country" name="Country">
              <Select
                size="large"
                onChange={onCountryChange}
                value={Country}
                defaultValue={"Korea"}
              >
                <Option value="Korea">Korea</Option>
                <Option value="Japan">Japan</Option>
                <Option value="China">China</Option>
                <Option value="USA">USA</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Address nickname (optional)"
              name="AddressNickname"
            >
              <Input
                size="large"
                onChange={onAddressNicknameChange}
                value={AddressNickname}
              />
            </Form.Item>

            <Form.Item
              label="Full name"
              name="FullName"
              rules={[
                { required: true, message: "Please input your Full name!" },
              ]}
            >
              <Input
                size="large"
                onChange={onFullNameChange}
                value={FullName}
              />
            </Form.Item>

            <Form.Item
              label="Address"
              name="Address"
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
            >
              <Input
                size="large"
                placeholder="Street and number, P.O.box. c/o"
                onChange={onAddressMainChange}
                value={AddressMain}
              />
            </Form.Item>
            <Form.Item name="AddressSub">
              <Input
                size="large"
                placeholder="Apartment,suite,unit,building,floor (optional)"
                onChange={onAddressSubChange}
                value={AddressSub}
              />
            </Form.Item>
            <Form.Item
              label="City"
              name="City"
              rules={[{ required: true, message: "Please input your City!" }]}
            >
              <Input size="large" onChange={onCityChange} value={City} />
            </Form.Item>

            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input your State/Territory!",
                    },
                  ]}
                  label="State/Territory"
                  name="StateTerritory"
                >
                  <Input size="large" onChange={onStateChange} value={State} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input your Postal code!",
                    },
                  ]}
                  label="Postal code"
                  name="PostalCode"
                >
                  <Input
                    size="large"
                    onChange={onPostalCodeChange}
                    value={PostalCode}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Phone number (optional)" name="PhoneNumber">
              <Input
                size="large"
                onChange={onPhoneNumberChange}
                value={PhoneNumber}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", height: "40px", background: "#037362" }}
            >
              Submit
            </Button>
          </Form>
        </Col>
        <Col span={0} sm={4}></Col>
        <Col span={24} sm={10}>
          <h1>Saved addresses</h1>
          {ShippingAddressLists?.length === 0 ? (
            <div>You haven't saved any addresses.</div>
          ) : (
            <div>
              <p>
                Easily apply one shipping address to all of your editable reward
                surveys.
              </p>
              {ShippingAddressLists?.map((address, i) => (
                <div
                  style={{
                    border: "1px solid #D9D9D9",
                    padding: "10px 20px",
                    fontSize: "14px",
                    marginBottom: "30px",
                  }}
                  key={i}
                >
                  <h2>{address.addressNickname}</h2>
                  <p>{address.fullName}</p>
                  <div>{address.addressMain}</div>
                  <div>{address.addressSub}</div>
                  <div style={{ margin: "10px 0px" }}>
                    <div>
                      {address.city},{address.state}
                    </div>
                    <div>
                      {address.postalCode},{address.country}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>{address.phoneNumber}</div>
                    <div
                      className={styles.DeleteAddress}
                      onClick={() => {
                        onDeleteAddress(address.id);
                      }}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              ))}
              <p style={{ fontSize: "11px", fontFamily: "cursive" }}>
                You can only apply a saved address if the country matches the
                destination you selected when backing a project. Shipping to a
                different country can increase the creator’s shipping costs, so
                contact them directly if you need to discuss other delivery
                options.
              </p>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ShippingAddress;
