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
import Router from "next/router";
import i18n from "../components/i18n";

type Props = {
  getloadCss?: any;
  getPageName?: any;
  onfunction?: any;
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
    setname(constructure_data.PROFILE_INFO.FULL_NAME);
    setnickname(constructure_data.PROFILE_INFO.NICK_NAME);
    setjob_position(constructure_data.PROFILE_INFO.JOB_CUR);
    setphone_number(constructure_data.PROFILE_INFO.PHONE_NUMBER);
    setdescription(null);
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
    setsocial(constructure_data.SOCIAL_DETAIL.SOCIAL_DETAIL);
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

  const ontest = (test?: any | null) => {
    console.log("=>", test);
    props.onfunction(test);
  };

  const pushPageURL = (page: string) => {
    Router.push(page);
  };

  //control

  //render

  const renderimgsvg = () => {
    return (
      <div className="home-social-list">
        <img
          src="../static/images/2Jv4e1.jpeg"
          alt="ex"
          className="img-svg-test"
          style={{ borderRadius: "100%" }}
        />
      </div>
    );
  };

  const renderhomedetail = () => {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div className="detail-title">{i18n.t("Greeting")}</div>
        <div className="detail-title-name">{name}</div>
        <div className="detail-title-job">{job_position}</div>
        <Row style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={12}
            xxl={12}
            style={{ paddingBottom: "5px" }}
          >
            <ButtonM
              variant="outlined"
              style={{
                paddingTop: "15px",
                paddingBottom: "15px",
                borderRadius: "30px",
                color: "black",
                borderColor: "black",
              }}
              href="/static/files/portfolio_ys.png"
              target="_blank"
            >
              <Texts size={16}>{i18n.t("DownloadCV")}</Texts>
            </ButtonM>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={12}
            xxl={12}
            style={{ paddingBottom: "5px" }}
          >
            <div className="btn-web">
              <ButtonM
                variant="contained"
                style={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  borderRadius: "30px",
                  backgroundColor: "black",
                }}
                onClick={() => {
                  console.log("web");
                  ontest("contact");
                }}
              >
                <Texts size={16}>{i18n.t("ContactInfo")}</Texts>
              </ButtonM>
            </div>
            <div className="btn-mobile">
              <ButtonM
                variant="contained"
                style={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  borderRadius: "30px",
                  backgroundColor: "black",
                }}
                onClick={() => {
                  console.log("mobile");
                  pushPageURL("/" + "contact");
                }}
              >
                <Texts size={16}>{i18n.t("ContactInfo")}</Texts>
              </ButtonM>
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  //render

  //render main
  return (
    <div className="web-content home-content">
      <div>
        <div className="home-social">{renderimgsvg()}</div>
      </div>
      <div>{renderhomedetail()}</div>
    </div>
  );
};

export default Home;
