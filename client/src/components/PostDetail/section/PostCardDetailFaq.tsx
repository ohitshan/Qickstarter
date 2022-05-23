import { Modal, Button, Col, Row, Input, Collapse } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  AnswerQuestionAsync,
  AskQuestionAsync,
} from "../../../Slices/postSlice";
import Login from "../../Login/Login";
import "../PostCardDetail.css";
import FaqAnswerForm from "./FaqSub/FaqAnswerForm";
import FaqForm from "./FaqSub/FaqForm";

function PostCardDetailFaq() {
  const dispatch = useAppDispatch();
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [AnswerTitle, setAnswerTitle] = useState("");
  const [Content, setContent] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [showNumber, setShowNumber] = useState(2);
  const post = useAppSelector((state: any) => state.post?.getpost);
  const user = useAppSelector((state: any) => state.user);
  useEffect(() => {
    if (post?.[0]?.writer?._id === user?.authUser?._id) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
    const slicedQuestion =
      post?.[0]?.faq?.slice(0, showNumber) ||
      post?.postInfo?.faq?.slice(0, showNumber);
    console.log(slicedQuestion);
    setQuestions(slicedQuestion);
    setShowQuestions(post?.[0]?.answerfaq);
  }, [post, user, showNumber]);
  console.log(showQuestions);
  console.log(AnswerTitle);
  useEffect(() => {
    return () => {
      setShowNumber(2);
    };
  }, []);

  const onAnserTitleChange = useCallback((e) => {
    setAnswerTitle(e.target.value);
  }, []);

  const onClickButton = useCallback(() => {
    setShowNumber((prev) => prev + 2);
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    let body = {
      postId: post?.[0]?._id,
      from: user,
      content: Content,
    };
    dispatch(AskQuestionAsync(body)).then((res: any) => {
      if (res.payload.success) {
        setIsModalVisible(false);
        setContent("");
      }
    });
  };
  const handleAnswerOk = () => {
    setIsModalVisible(false);
    let body = {
      postId: post?.[0]?._id,
      answertitle: AnswerTitle,
      content: Content,
    };
    dispatch(AnswerQuestionAsync(body));
    setContent("");
    setAnswerTitle("");
  };

  const onChangeContent = useCallback((e) => {
    setContent(e.target.value);
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div
      style={{
        maxWidth: "1400px",
        width: "100%",
        marginTop: "50px",
        textAlign: "start",
        minHeight: "1000px",
      }}
    >
      <h1 style={{ marginLeft: "100px" }}>Frequently Asked Questions</h1>
      <Row style={{ width: "100%" }}>
        <Col span={16} style={{ minHeight: "400px" }}>
          {showQuestions?.length === 0 && !isOwner ? (
            <div
              style={{
                marginLeft: "42px",
                marginTop: "10px",
                padding: "0 20px",
                fontSize: "16px",
              }}
            >
              <p>
                Looks like there aren't any frequently asked questions yet. Ask
                the project creator directly.
              </p>
              <Button
                style={{
                  background: "#464646",
                  color: "white",
                  height: "40px",
                  width: "132px",
                }}
                onClick={showModal}
              >
                Ask a question
              </Button>

              <Modal
                title={`Ask a question about  ${post?.[0]?.title.title}`}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                maskStyle={{ background: "#FFFFFF", opacity: "0.9" }}
              >
                {user?.authUser?.isAuth ? (
                  <div>
                    {" "}
                    <div>
                      <span style={{ fontWeight: "bolder" }}>To : </span>
                      <span> {post?.[0]?.writer?.email}</span>
                    </div>
                    <TextArea
                      onChange={onChangeContent}
                      value={Content}
                      style={{ minHeight: "300px" }}
                    ></TextArea>
                  </div>
                ) : (
                  <Login />
                )}
              </Modal>
            </div>
          ) : (
            <div
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {isOwner && (
                <div>
                  <h2>Question List</h2>
                  <hr />
                  {questions?.map((question, i) => (
                    <FaqForm question={question} key={i} />
                  ))}
                </div>
              )}
              {showNumber >= post?.[0]?.faq?.length
                ? null
                : isOwner && (
                    <Button
                      style={{
                        marginTop: "20px",
                      }}
                      onClick={onClickButton}
                    >
                      Show more
                    </Button>
                  )}
            </div>
          )}
          {showQuestions?.map((question, i) => (
            <FaqAnswerForm question={question} i={i} key={i} />
          ))}
        </Col>

        {/* 오른쪽 파트 */}

        <Col span={8}>
          {!isOwner ? (
            showQuestions?.length !== 0 ? (
              <div
                style={{
                  marginLeft: "42px",
                  padding: "0 20px",
                  borderLeft: "0.3rem solid #DCDEDD",
                  fontSize: "16px",
                }}
              >
                <p>
                  Don't see the answer to your question? Ask the project creator
                  directly.
                </p>
                <Button
                  style={{
                    background: "#464646",
                    color: "white",
                    height: "40px",
                    width: "132px",
                  }}
                  onClick={showModal}
                >
                  Ask a question
                </Button>
                <Modal
                  title={`Ask a question about  ${post?.[0]?.title?.title}`}
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  maskStyle={{ background: "#FFFFFF", opacity: "0.9" }}
                >
                  {user?.authUser?.isAuth ? (
                    <div>
                      {" "}
                      <div>
                        <span style={{ fontWeight: "bolder" }}>To : </span>
                        <span> {post?.[0]?.writer?.email}</span>
                      </div>
                      <TextArea
                        onChange={onChangeContent}
                        value={Content}
                        style={{ minHeight: "500px" }}
                      ></TextArea>
                    </div>
                  ) : (
                    <Login />
                  )}
                </Modal>
              </div>
            ) : null
          ) : (
            <div
              style={{
                marginLeft: "42px",
                padding: "0 20px",
                borderLeft: "0.3rem solid #DCDEDD",
                fontSize: "16px",
              }}
            >
              <p>Pick one Question and Answer it!</p>
              <Button
                style={{
                  background: "#464646",
                  color: "white",
                  height: "40px",
                  width: "auto",
                }}
                onClick={showModal}
              >
                Answer a question
              </Button>
              <Modal
                title={`Ask a question about  ${post?.[0]?.title?.title}`}
                visible={isModalVisible}
                onOk={handleAnswerOk}
                onCancel={handleCancel}
                maskStyle={{ background: "#FFFFFF", opacity: "0.9" }}
              >
                {user?.authUser?.isAuth ? (
                  <div>
                    {" "}
                    <div>
                      <label>Question Content</label>
                      <Input
                        onChange={onAnserTitleChange}
                        value={AnswerTitle}
                      />
                    </div>
                    <div>
                      <label>Answer</label>
                      <TextArea
                        onChange={onChangeContent}
                        value={Content}
                        style={{ minHeight: "300px" }}
                      ></TextArea>
                    </div>
                  </div>
                ) : (
                  <Login />
                )}
              </Modal>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default PostCardDetailFaq;
