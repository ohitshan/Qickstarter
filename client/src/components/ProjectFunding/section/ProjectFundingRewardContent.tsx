import { ShoppingCartOutlined } from "@ant-design/icons";
import React from "react";
import styles from "../ProjectFunding.module.css";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../app/hooks";
import { UploadPost } from "../../../Slices/postSlice";

const { Panel } = Collapse;
function ProjectFundingRewardContent() {
  const post = useAppSelector(
    (state: { user: any; post: { getpost?: UploadPost[] } }) =>
      state.post?.getpost
  );

  const today = new Date(`${post?.[0]?.launch}`);
  const finishDate = new Date(today);
  finishDate.setDate(today.getDate() + Number(post?.[0]?.duration));

  return (
    <div style={{ margin: "20px 0" }}>
      <div className={styles.guaranteed}>
        <div>
          <div className={styles.guaranteedContent}>
            <div
              style={{
                fontSize: "24px",
              }}
            >
              <ShoppingCartOutlined />
            </div>
            <div
              style={{
                textAlign: "start",

                marginLeft: "10px",
              }}
            >
              Rewards aren't
              <br />
              guaranteed.
            </div>
          </div>
        </div>
      </div>
      <p style={{ textAlign: "start", marginTop: "10px", fontSize: "12px" }}>
        Your pledge will support an ambitious creative project that has yet to
        be developed. There’s a risk that, despite a creator’s best efforts,
        your reward will not be fulfilled, and we urge you to consider this risk
        prior to pledging. Kickstarter is not responsible for project claims or
        reward fulfillment.
      </p>
      <p>
        <a>Learn more about accountability</a>
      </p>
      <h5>FREQUENTLY ASKED QUESTIONS</h5>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: "none", fontSize: "12px" }}
      >
        <Panel header="How do i pledge" key="1" style={{ border: "none" }}>
          <p>
            Enter your pledge amount and select a reward. Then, enter your
            payment information to complete the checkout process.
          </p>
        </Panel>
        <Panel
          header="when is my card charged"
          key="2"
          style={{ border: "none" }}
        >
          <p>
            If this project is successfully funded, your card will be charged on
            {finishDate.toLocaleString()} along with all the other backers of
            this project.
          </p>
        </Panel>
        <Panel
          header="So I'm only charged if funding succeeds"
          key="3"
          style={{ border: "none" }}
        >
          <p>
            Yes! That's part of what makes Kickstarter special. If a project
            isn't successfully funded, no one pays anything.
          </p>
        </Panel>
        <Panel
          header="What can others see about my pledge?"
          key="4"
          style={{ border: "none" }}
        >
          <p>
            The project will be added to the list of backings on your profile
            page, but the amount you pledge, and the reward you choose, will not
            be made public.
          </p>
        </Panel>
        <Panel
          header="What if I want to change my pledge?"
          key="5"
          style={{ border: "none" }}
        >
          <p>
            You can change or cancel your pledge anytime before
            {finishDate.toLocaleString()}
          </p>
        </Panel>
        <Panel
          header="If this project is funded. how do I get my reward?"
          key="6"
          style={{ border: "none" }}
        >
          <p>
            When your reward is ready, Lucky Duck Games will send you a survey
            via email to request any info needed to deliver y
          </p>
        </Panel>
      </Collapse>
    </div>
  );
}

export default ProjectFundingRewardContent;
