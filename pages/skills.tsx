import React, { useEffect, useState } from "react";
import constructure_data from "../utils/constructure_data";
import _ from "lodash";
import { Card, List, Progress, Rate, Collapse, message, Row, Col } from "antd";
import Texts from "../components/Texts";
import DataObjectIcon from "@mui/icons-material/DataObject";
import StorageIcon from "@mui/icons-material/Storage";
import {
  DoubleLeftOutlined,
  DownOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Service from "../components/ServiceProvider";
import VerifiedIcon from "@mui/icons-material/Verified";
import i18n from "../components/i18n";

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
    setskills(constructure_data.SKILLS_PROGRAMMING.SKILLS_PROGRAMMING);
    Service.FetchSkills()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          setskills(res.data.SKILLS_PROGRAMMING);
        } else {
          setskills(constructure_data.SKILLS_PROGRAMMING.SKILLS_PROGRAMMING);
        }
      })
      .catch((e) => {
        message.error(e);
        setskills(constructure_data.SKILLS_PROGRAMMING.SKILLS_PROGRAMMING);
      });
  };

  //fetch data

  //control

  //control

  //render

  const renderlistskills = () => {
    const desc = [
      i18n.t("bad"),
      i18n.t("basic"),
      i18n.t("intermediate"),
      i18n.t("experienced"),
      i18n.t("wonderful"),
    ];

    return (
      <Row>
        {_.map(skills, (item, index) => {
          return (
            <Col key={index} xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
              <div className="skill-border-main">
                <div style={{ textAlign: "center" }}>
                  <Texts size={25} weight="bold" color="#596E79">
                    {i18n.language == "th"
                      ? item.TITLE_INFO
                      : item.TITLE_INFO_EN}
                  </Texts>
                  <div>
                    <Texts size={16} weight="bold" color="#596E79">
                      {i18n.language == "th"
                        ? item.DESC_INFO
                        : item.DESC_INFO_EN}
                    </Texts>
                  </div>
                </div>
                <div className="skill-list">
                  <List
                    className="skill-box"
                    grid={{
                      gutter: 24,
                      xs: 1,
                      sm: 1,
                      md: 1,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                    dataSource={item.SKILLS}
                    renderItem={(item: any, index: number) => {
                      return (
                        <List.Item key={index}>
                          <Row align={"middle"} style={{ width: "100%" }}>
                            <Col span={8}>
                              <VerifiedIcon />
                            </Col>
                            <Col span={12}>
                              <Row>
                                <Col span={24}>
                                  <Texts>{item.SKILLS_NAME}</Texts>
                                </Col>
                                <Col span={24}>
                                  <Texts className="ant-rate-text" size={15}>
                                    {desc[item.SKILL_RATE - 1]}
                                  </Texts>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </List.Item>
                      );
                    }}
                  />
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    );
  };

  //render

  //render main
  return (
    <div className="web-content skills-content">
      <div className="content-title">
        <Texts size={20} weight="thin">
          {i18n.t("pageskilltitle")}
        </Texts>
        <div className="content-sub-title">
          <Texts size={40} weight="bold">
            {i18n.t("pageskillsubtitle")}
          </Texts>
        </div>
      </div>

      <div className="skills-programming">{renderlistskills()}</div>
    </div>
  );
};

export default Skills;
