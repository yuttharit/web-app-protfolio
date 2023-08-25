import React, { useEffect, useState } from "react";
import constructure_data from "../utils/constructure_data";
import _ from "lodash";
import {
  FacebookOutlined,
  GithubOutlined,
  GitlabOutlined,
  MailOutlined,
  QuestionCircleOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Tooltip, message } from "antd";
import Texts from "../components/Texts";
import { Button as ButtonM } from "@mui/material";
import Service from "../components/ServiceProvider";

type Props = {
  getloadCss?: any;
  getPageName?: any;
};

const Home = (props: Props) => {
  const [social, setsocial] = useState<any>([]);
  const [name, setname] = useState<any>(null);
  const [nickname, setnickname] = useState<any>(null);
  const [phone_number, setphone_number] = useState<any>(null);
  const [job_position, setjob_position] = useState<any>(null);
  const [description, setdescription] = useState<any>(null);

  //function
  useEffect(() => {
    props.getloadCss(["index/index"]);

    fetchprofile();
    fetchsocial();
    return () => {};
  }, []);

  //function

  //fetch data

  const fetchprofile = () => {
    Service.FetchProfileInfo()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          setname(res.data.FULL_NAME);
          setnickname(res.data.NICK_NAME);
          setjob_position(res.data.JOB_CUR);
          setphone_number(res.data.PHONE_NUMBER);
          setdescription(null);
        } else {
          setname(constructure_data.PROFILE_INFO.FULL_NAME);
          setnickname(constructure_data.PROFILE_INFO.NICK_NAME);
          setjob_position(constructure_data.PROFILE_INFO.JOB_CUR);
          setphone_number(constructure_data.PROFILE_INFO.PHONE_NUMBER);
          setdescription(null);
        }
      })
      .catch((e) => {
        message.error(e);
        setname(constructure_data.PROFILE_INFO.FULL_NAME);
        setnickname(constructure_data.PROFILE_INFO.NICK_NAME);
        setjob_position(constructure_data.PROFILE_INFO.JOB_CUR);
        setphone_number(constructure_data.PROFILE_INFO.PHONE_NUMBER);
        setdescription(null);
      });
  };

  const fetchsocial = () => {
    Service.FetchSocialInfo()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          setsocial(res.data.SOCIAL_DETAIL);
        } else {
          setsocial(constructure_data.SOCIAL_DETAIL.SOCIAL_DETAIL);
        }
      })
      .catch((e) => {
        message.error(e);
        setsocial(constructure_data.SOCIAL_DETAIL.SOCIAL_DETAIL);
      });
  };
  //fetch data

  //control

  //control

  //render

  const renderlistsocial = () => {
    let data: any = [];
    _.map(social, (item, index) => {
      item.IS_USE == "1"
        ? data.push({
            id: index,
            desc: item.URL_TYPE,
            path:
              item.URL_TYPE == "email"
                ? `mailto: ${item.URL_PATH}`
                : item.URL_PATH,
            icon:
              item.URL_TYPE == "facebook" ? (
                <FacebookOutlined />
              ) : item.URL_TYPE == "github" ? (
                <GithubOutlined />
              ) : item.URL_TYPE == "gitlab" ? (
                <GitlabOutlined />
              ) : item.URL_TYPE == "line" ? (
                <LinkOutlined />
              ) : item.URL_TYPE == "email" ? (
                <MailOutlined />
              ) : (
                <QuestionCircleOutlined />
              ),
          })
        : null;
    });
    return _.map(data, (item) => {
      return (
        <a
          key={item.id}
          href={item.path}
          target="_blank"
          className="home-social-list"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip title="prompt text">
              <Texts size={28} color="black">
                {item.icon}
              </Texts>
            </Tooltip>

            <div className="home-social-desc">
              <Texts color="black" style={{ paddingLeft: "8px" }}>
                {item.desc}
              </Texts>
            </div>
          </div>
        </a>
      );
    });
  };

  const renderimgsvg = () => {
    return (
      <div>
        <img
          className="img-svg-test"
          src="../static/svg/web-programming.svg"
          alt=""
        />
      </div>
    );
  };

  const renderhomedetail = () => {
    return (
      <Row
        style={{
          padding: "20px",
        }}
      >
        <Col span={24}>
          <Texts>{`สวัสดี ผมชื่อ ${name}`}</Texts>
        </Col>
        <Col span={24}>
          <Texts size={25}>{job_position}</Texts>
        </Col>
        <Col span={24}>
          <Texts size={25}>{description}</Texts>
        </Col>
        <Col span={24} style={{ paddingTop: "15px" }}>
          <a href={`tel:${phone_number}`}>
            <ButtonM variant="contained" size="large">
              <Texts>ติดต่อ</Texts>
            </ButtonM>
          </a>
        </Col>
      </Row>
    );
  };

  //render

  //render main
  return (
    <Row className="web-content home-content">
      <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8} className="">
        <div className="home-social">{renderlistsocial()}</div>
      </Col>
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={24}
        xl={0}
        xxl={0}
        style={{ textAlign: "center" }}
      >
        <div className="home-social">{renderimgsvg()}</div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
        {renderhomedetail()}
      </Col>
    </Row>
  );
};

export default Home;
