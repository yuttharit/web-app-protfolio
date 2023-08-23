import React, { useEffect, useState } from "react";
import constructure_data from "../utils/constructure_data";
import _ from "lodash";
import { Card, List, Progress, Rate, Collapse, message } from "antd";
import Texts from "../components/Texts";
import DataObjectIcon from "@mui/icons-material/DataObject";
import StorageIcon from "@mui/icons-material/Storage";
import {
  DoubleLeftOutlined,
  DownOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Service from "../components/ServiceProvider";

const { Panel } = Collapse;

type Props = {
  getloadCss?: any;
  getPageName?: any;
};

const Skills = (props: Props) => {
  const [skills, setskills] = useState<any>([]);

  //function
  useEffect(() => {
    props.getloadCss(["skills/index"]);
    fetchdataskills();
    return () => {};
  }, []);

  //function

  //fetch data

  const fetchdataskills = () => {
    Service.FetchSkills()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          setskills(res.data.SKILLS_PROGRAMMING);
        }
      })
      .catch((e) => {
        message.error(e);
      });
  };
  //fetch data

  //control

  //control

  //render

  const renderlistskills = () => {
    return (
      <Collapse
        ghost
        defaultActiveKey={[0, 1]}
        bordered={false}
        expandIcon={({ isActive }) => {
          return <DoubleLeftOutlined rotate={isActive ? -90 : 90} style={{}} />;
        }}
        expandIconPosition={"end"}
        onChange={(e) => {
          // console.log("=>", e);
        }}
        className="skills-collapse"
      >
        {_.map(skills, (item, index) => {
          return (
            <Panel
              key={index}
              forceRender={true}
              header={
                <div>
                  <Texts className="skills-title">{item.TITLE_INFO}</Texts>
                  <div>
                    <Texts className="skills-subtitle">{item.DESC_INFO}</Texts>
                  </div>
                </div>
              }
              style={{ width: "100%" }}
            >
              {_.map(item.SKILLS, (item, index) => {
                let on_percentage = (item.SKILL_RATE / 5) * 100;
                const desc = ["bad", "normal", "good", "great", "wonderful"];
                return (
                  <div className="skills-data" key={index}>
                    <div className="skills-title">
                      <div className="skills-name">
                        <Texts>{item.SKILLS_NAME}</Texts>
                      </div>
                      <div className="skills-number">
                        <Texts>{`${on_percentage} %`}</Texts>
                      </div>
                    </div>

                    <Rate disabled defaultValue={item.SKILL_RATE} />

                    <Texts
                      className="ant-rate-text"
                      style={{ paddingLeft: "10px" }}
                      size={15}
                    >
                      {desc[item.SKILL_RATE - 1]}
                    </Texts>
                  </div>
                );
              })}
            </Panel>
          );
        })}
      </Collapse>
    );
  };

  //render

  //render main
  return (
    <div className="web-content skills-content">
      <div className="content-title">
        <Texts size={20} weight="bold">
          Skills
        </Texts>
        <div className="content-sub-title">
          <Texts size={16} weight="thin">
            My technical level
          </Texts>
        </div>
      </div>

      <div className="skills-programming">{renderlistskills()}</div>
    </div>
  );
};

export default Skills;
