import React, { useEffect, useState } from "react";
import Texts from "../components/Texts";
import _ from "lodash";
import Service from "../components/ServiceProvider";
import constructure_data from "../utils/constructure_data";
import { Col, Row, Tooltip, message } from "antd";
import {
  FacebookOutlined,
  GithubOutlined,
  GitlabOutlined,
  MailOutlined,
  QuestionCircleOutlined,
  LinkOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import i18n from "../components/i18n";

type Props = {
  getloadCss?: any;
  getPageName?: any;
};

const Contact = (props: Props) => {
  const [social, setsocial] = useState<any>([]);

  //function

  useEffect(() => {
    props.getloadCss(["contact/index"]);
    fetchsocial();
    return () => {};
  }, []);

  //function

  //fetch data

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

  //control

  //render

  const renderlistsocial = () => {
    let data: any = [];

    _.map(social, (item, index) => {
      item.IS_USE == "1"
        ? data.push({
            id: index,
            desc:
              item.URL_TYPE == "email"
                ? item.URL_PATH
                : item.URL_TYPE == "line"
                ? "LINE"
                : item.URL_TYPE == "phonenumber"
                ? item.URL_PATH
                : null,
            path:
              item.URL_TYPE == "email"
                ? `mailto: ${item.URL_PATH}`
                : item.URL_TYPE == "phonenumber"
                ? `tel: ${item.URL_PATH}`
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
              ) : item.URL_TYPE == "phonenumber" ? (
                <PhoneOutlined />
              ) : (
                <QuestionCircleOutlined />
              ),
          })
        : null;
    });
    return _.map(data, (item: any, index: number) => {
      return (
        <Col key={index} xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
          <Row align={"middle"}>
            <Col span={5}>
              <a href={item.path} target="_blank">
                <Tooltip title="prompt text">
                  <Texts size={28} color="black">
                    {item.icon}
                  </Texts>
                </Tooltip>
              </a>
            </Col>
            <Col span={12} style={{ textAlign: "left" }}>
              <a href={item.path} target="_blank">
                <Texts color="black">{item.desc}</Texts>
              </a>
            </Col>
          </Row>
        </Col>
      );
    });
  };

  //render

  //render main
  return (
    <div className="web-content contact-content">
      <div className="content-title">
        <Texts size={20} weight="thin">
          {i18n.t("pagecontacttitle")}
        </Texts>
        <div className="content-sub-title">
          <Texts size={40} weight="bold">
            {i18n.t("pagecontactsubtitle")}
          </Texts>
        </div>
      </div>
      {/* // */}
      <Row
        className="contact-border"
        style={{ padding: "20px", marginLeft: "40px", marginRight: "40px" }}
      >
        {renderlistsocial()}
      </Row>
    </div>
  );
};

export default Contact;
