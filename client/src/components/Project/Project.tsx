import React, { useCallback, useState } from "react";
import { Steps, Button, Row, Col } from "antd";
import styles from "./Project.module.css";
import ProjectTitle, { Title } from "./First/ProjectTitle";
import ProjectCategory, { Category } from "./First/ProjectCategory";
import ProjectLocation from "./First/ProjectLocation";
import ProjectImage from "./First/ProjectImage";
import ProjectVideo from "./First/ProjectVideo";
import ProjectDuration from "./First/ProjectDuration";
import ProjectTarget from "./First/ProjectTarget";
import ProjectFund from "./First/ProjectFund";
import ProjectDescription from "./ProjectDescription";
import ProjectRisk from "./ProjectRisk";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { uploadPostAsync } from "../../Slices/postSlice";
import { useNavigate } from "react-router-dom";
import ProjectReward from "./Second/ProjectReward";
import ProjectRewardForm from "./Second/ProjectRewardForm";

const { Step } = Steps;
function Project() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const rewards = useAppSelector((state: any) => state.reward);
  const user = useAppSelector((state: any) => state.user);
  const [current, setCurrent] = useState(0);
  const [Title, setTitle] = useState({
    title: "",
    subtitle: "",
  });
  const [category, setCategory] = useState({
    PrimaryCategory: "",
    PrimarySubcategory: "",
    Category: "",
    Subcategory: "",
  });
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [Videos, setVideos] = useState([]);
  const [Funding, setFunding] = useState(0);
  const [Launch, setLaunch] = useState("");
  const [Duration, setDuration] = useState("");
  const [Description, setDescription] = useState("");
  const [Risk, setRisk] = useState("");
  const [newReward, setNewReward] = useState(false);

  const onClick = () => {
    let body = {
      writer: user.authUser._id,
      title: Title,
      category: category,
      location: location,
      images: images,
      videos: Videos,
      funding: Funding,
      launch: Launch,
      duration: Duration,
      description: Description,
      risk: Risk,
      reward: rewards,
    };
    if (window.confirm("Do you want to submit??")) {
      dispatch(uploadPostAsync(body)).then((res: any) => {
        if (res.payload.success) {
          navigate("/");
        }
      });
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const getTitleValue = useCallback((title: Title) => {
    setTitle(title);
  }, []);
  const getCategoryValue = useCallback((category: Category) => {
    setCategory(category);
  }, []);
  const getLocationValue = useCallback((location: string) => {
    setLocation(location);
  }, []);
  const getImagesValue = useCallback((images: any) => {
    setImages(images);
  }, []);
  const getVideoValue = useCallback((video: any) => {
    setVideos(video);
  }, []);
  const getFundingValue = useCallback((amount: number) => {
    setFunding(amount);
  }, []);
  const getTargetValue = useCallback((launch: string) => {
    setLaunch(launch);
  }, []);
  const getDurationValue = useCallback((duration: any) => {
    setDuration(duration);
  }, []);
  const getDescriptionValue = useCallback((description: string) => {
    setDescription(description);
  }, []);
  const getRiskValue = useCallback((risk: string) => {
    setRisk(risk);
  }, []);

  const onRewardClick = useCallback(() => {
    setNewReward(!newReward);
  }, [newReward]);

  const getClick = useCallback((click: boolean) => {
    setNewReward(click);
  }, []);
  console.log(rewards);
  const steps = [
    {
      title: "First",
      content: (
        <div>
          <div style={{ marginBottom: "50px" }}>
            <h1>Start with the basics</h1>
            <span>Make it easy for people to learn about your project.</span>
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProjectTitle getTitleValue={getTitleValue} />
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProjectCategory getCategoryValue={getCategoryValue} />
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProjectLocation getLocationValue={getLocationValue} />
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProjectImage getImagesValue={getImagesValue} />
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProjectVideo getVideoValue={getVideoValue} />
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProjectFund getFundingValue={getFundingValue} />
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProjectTarget getTargetValue={getTargetValue} />
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProjectDuration getDurationValue={getDurationValue} />
          </div>
        </div>
      ),
    },
    {
      title: "Second",
      content: (
        <div>
          <div style={{ marginBottom: "50px" }}>
            <h1>Add your rewards</h1>
            <span>
              Offer simple, meaningful ways to bring backers closer to your
              project and celebrate it coming to life.
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Row>
              <Col span={18}>
                <span>
                  Most creators offer 3-10 reward tiers, which can be physical
                  items or special experiences. Make sure to set reasonable
                  backer expectations.
                </span>
              </Col>
              <Col span={6}>
                <Button onClick={onRewardClick}>new Reward</Button>
              </Col>
            </Row>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {rewards.map((item: any, i: number) => (
              <ProjectRewardForm key={i} reward={item} />
            ))}
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {newReward && (
              <ProjectReward newReward={newReward} getClick={getClick} />
            )}
          </div>
          <hr />
        </div>
      ),
    },
    {
      title: "Third",
      content: (
        <div>
          <hr />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProjectDescription getDescriptionValue={getDescriptionValue} />
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProjectRisk getRiskValue={getRiskValue} />
          </div>
          <hr />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Steps current={current} style={{ padding: "20px" }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className={styles.stepsContent}>{steps[current].content}</div>
      <div className={styles.stepsAction}>
        {current < steps.length - 1 && (
          <Button
            style={{ marginBottom: "20px" }}
            type="primary"
            onClick={() => next()}
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            style={{ marginBottom: "20px" }}
            type="primary"
            onClick={onClick}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ marginBottom: "20px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
}

export default Project;
