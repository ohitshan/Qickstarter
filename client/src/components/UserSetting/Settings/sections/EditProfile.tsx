import { Button, Checkbox, Col, Form, Input, message, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import AutoComplete from "react-google-autocomplete";
import UserPicUpload from "./UserPicUpload";
import { editUserProfileAsync } from "../../../../Slices/userSlice";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;
function EditProfile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state: any) => state.user);
  const [Name, setName] = useState("");
  const [Image, setImage] = useState([]);
  const [Biography, setBiography] = useState("");
  const [Privacy, setPrivacy] = useState(false);
  const [location, setLocation] = useState("");
  const [VanityURL, setVanityURL] = useState("");
  const [Websites, setWebsites] = useState("");
  const [WebsitesList, setWebsitesList] = useState<string[]>([]);
  useEffect(() => {
    setName(user?.authUser?.name);
    setImage(user?.authUser?.image);
    setBiography(user?.authUser?.biography);
    setPrivacy(user?.authUser?.privacy);
    setLocation(user?.authUser?.location);
    setVanityURL(user?.authUser?.vanityURL);
    setWebsitesList(user?.authUser?.websitesList);
  }, [user.authUser]);

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const getImageValue = useCallback((Image) => {
    setImage(Image);
  }, []);

  const onChangeBiography = useCallback((e) => {
    setBiography(e.target.value);
  }, []);

  const onChangePrivacy = useCallback((e) => {
    setPrivacy(e.target.checked);
  }, []);

  const onChangeVanity = useCallback((e) => {
    setVanityURL(e.target.value);
  }, []);

  const onChangeWebsites = useCallback((e) => {
    setWebsites(e.target.value);
  }, []);

  const onAddWebsites = useCallback(() => {
    setWebsitesList([...WebsitesList, Websites]);
    setWebsites("");
  }, [Websites, WebsitesList]);

  const deleteWebsite = useCallback(
    (i) => {
      let WebsiteListsClone = [...WebsitesList];
      WebsiteListsClone.splice(i, 1);
      setWebsitesList(WebsiteListsClone);
    },
    [WebsitesList]
  );

  const SaveSettings = useCallback(() => {
    let body = {
      name: Name,
      image: Image,
      biography: Biography,
      privacy: Privacy,
      location: location,
      vanityURL: VanityURL,
      websitesList: WebsitesList,
    };
    dispatch(editUserProfileAsync(body)).then((res: any) => {
      console.log(res);
      if (res.payload.edit) {
        message.success("saved");
      }
    });
  }, [
    Biography,
    dispatch,
    Name,
    Image,
    Privacy,
    location,
    VanityURL,
    WebsitesList,
  ]);

  return (
    <div style={{ width: "95%", maxWidth: "1400px" }}>
      <Row
        style={{
          textAlign: "start",
          width: "100%",
          borderBottom: "1px solid #D9D9D9 ",
        }}
        gutter={40}
      >
        <Col span={24} sm={10} style={{ margin: "20px 0" }}>
          <div style={{ fontWeight: 800, margin: "10px 0" }}>
            <label>Name</label>
            <Input size="large" value={Name} onChange={onChangeName} />
          </div>
          <div style={{ fontWeight: 800, margin: "10px 0" }}>
            <label>Avatar</label>
            <UserPicUpload getImageValue={getImageValue} />
          </div>
          <div style={{ fontWeight: 800, margin: "10px 0" }}>
            <label>Biography</label>
            <TextArea
              rows={4}
              value={Biography}
              onChange={onChangeBiography}
              id="hi"
            />
            <span style={{ fontWeight: 400 }}>
              We suggest a short bio. If it's 300 characters or less it'll look
              great on your profile.
            </span>
          </div>
          <div style={{ fontWeight: 800, margin: "10px 0" }}>
            <label>Privacy</label>
            <div>
              <Checkbox
                style={{ fontWeight: 600 }}
                onChange={onChangePrivacy}
                checked={Privacy}
              >
                Only show my name and avatar
              </Checkbox>
              <div style={{ fontWeight: 600 }}>
                Uncheck this box to also show your biography, websites, and
                projects you've backed.
              </div>
            </div>
          </div>
        </Col>
        <Col span={0} sm={4}></Col>
        <Col span={24} sm={10} style={{ margin: "20px 0" }}>
          <div style={{ fontWeight: 800, margin: "10px 0" }}>
            <label>Location</label>
            <AutoComplete
              onChange={(e: any) => {
                setLocation(e.target.value);
              }}
              defaultValue={location}
              apiKey={process.env.REACT_APP_Google_API_KEY}
              onPlaceSelected={(place) => setLocation(place.formatted_address)}
              style={{
                width: "100%",
                height: "36px",
              }}
            />
            <div style={{ color: "gray" }}>
              ※구글지도 사용을 위해서 Api Key 갱신필요(유료화)※
            </div>
          </div>
          <div style={{ fontWeight: 800, margin: "10px 0" }}>
            <label>Vanity URL</label>
            <div>https://www.kickstarter.com/profile/</div>
            <Input size="large" value={VanityURL} onChange={onChangeVanity} />
            <div style={{ fontWeight: 600 }}>
              Create a custom URL for your profile page.{" "}
              <span style={{ fontWeight: 800 }}>
                Double check to make sure it’s correct—you can only save this
                setting once.
              </span>
            </div>
          </div>
          <div style={{ fontWeight: 800, margin: "10px 0" }}>
            <label>Websites</label>
            <div style={{ display: "flex" }}>
              <Input
                size="large"
                value={Websites}
                onChange={onChangeWebsites}
              />
              <Button
                style={{
                  height: "40px",
                  marginLeft: "10px",
                  background: "#037362",
                  color: "white",
                }}
                onClick={onAddWebsites}
              >
                Add
              </Button>
            </div>
            {WebsitesList?.map((website, i) => (
              <div
                key={i}
                style={{
                  background: "#EFEFF3",
                  margin: "5px 5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: "10px",
                  padding: "5px",
                }}
              >
                https://{website}
                <Button
                  style={{ background: "#EFEFF3", border: "none" }}
                  onClick={() => {
                    deleteWebsite(i);
                  }}
                >
                  x
                </Button>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <div style={{ textAlign: "start", margin: "15px 0" }}>
        <Button
          style={{ background: "#037362", color: "white", height: "40px" }}
          onClick={SaveSettings}
        >
          Save settings
        </Button>
        <Button
          style={{ background: "none", border: "none", height: "40px" }}
          onClick={() => {
            navigate(`/profile/${user?.authUser?._id}`);
          }}
        >
          View profile
        </Button>
      </div>
    </div>
  );
}

export default EditProfile;
