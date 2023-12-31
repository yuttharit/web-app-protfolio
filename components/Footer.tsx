import { Col, Row, message } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import constructure_data from "../utils/constructure_data";
import Texts from "./Texts";
import config_constructure from "../utils/config_constructure";
import { Avatar as AvatarMui } from "@mui/material";
import { MailOutlined } from "@ant-design/icons";
import Router from "next/router";
import Service from "./ServiceProvider";
import i18n from "./i18n";

type Props = {};

const Footer = (props: Props) => {
  const [profileData, setprofileData] = useState<any>([]);
  const [socialData, setsocialData] = useState<any>([]);
  const [allMenuData, setallMenuData] = useState<any>([]);
  const [fullname, setfullname] = useState<any>(null);
  const [fullname_en, setfullname_en] = useState<any>(null);
  const [address, setaddress] = useState<any>(null);
  const [address_en, setaddress_en] = useState<any>(null);
  const [phone_number, setphone_number] = useState<any>(null);

  //function

  useEffect(() => {
    fetchdatamenu();
    fetchprofileData();
    fetchdatsocial();

    return () => {};
  }, []);

  //function

  //fetch data

  const fetchdatamenu = () => {
    setallMenuData(constructure_data.MENU_WEB.MENU_WEB);
    Service.FetchMenuBar()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          setallMenuData(res.data.MENU_WEB);
        } else {
          setallMenuData(constructure_data.MENU_WEB.MENU_WEB);
        }
      })
      .catch((e) => {
        setallMenuData(constructure_data.MENU_WEB.MENU_WEB);
        message.error(e);
      });
  };

  const fetchprofileData = () => {
    setprofileData(constructure_data.PROFILE_INFO);
    setfullname(constructure_data.PROFILE_INFO.FULL_NAME);
    setfullname_en(constructure_data.PROFILE_INFO.FULL_NAME_EN);
    setaddress(constructure_data.PROFILE_INFO.ADDRESS);
    setaddress_en(constructure_data.PROFILE_INFO.ADDRESS_EN);
    setphone_number(constructure_data.PROFILE_INFO.PHONE_NUMBER);
    Service.FetchProfileInfo()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          setprofileData(res.data.PROFILE_INFO);
          setfullname(res.data.FULL_NAME);
          setfullname_en(res.data.FULL_NAME_EN);
          setaddress(res.data.ADDRESS);
          setaddress_en(res.data.ADDRESS_EN);
          setphone_number(res.data.PHONE_NUMBER);
        } else {
          setprofileData(constructure_data.PROFILE_INFO);
          setfullname(constructure_data.PROFILE_INFO.FULL_NAME);
          setfullname_en(constructure_data.PROFILE_INFO.FULL_NAME_EN);
          setaddress(constructure_data.PROFILE_INFO.ADDRESS);
          setaddress_en(constructure_data.PROFILE_INFO.ADDRESS_EN);
          setphone_number(constructure_data.PROFILE_INFO.PHONE_NUMBER);
        }
      })
      .catch((e) => {
        message.error(e);
        setprofileData(constructure_data.PROFILE_INFO);
        setfullname(constructure_data.PROFILE_INFO.FULL_NAME);
        setfullname_en(constructure_data.PROFILE_INFO.FULL_NAME_EN);
        setaddress(constructure_data.PROFILE_INFO.ADDRESS);
        setaddress_en(constructure_data.PROFILE_INFO.ADDRESS_EN);
        setphone_number(constructure_data.PROFILE_INFO.PHONE_NUMBER);
      });
  };

  const fetchdatsocial = () => {
    setsocialData(constructure_data.SOCIAL_DETAIL.SOCIAL_DETAIL);
    Service.FetchSocialInfo()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          setsocialData(res.data.SOCIAL_DETAIL);
        } else {
          setsocialData(constructure_data.SOCIAL_DETAIL.SOCIAL_DETAIL);
        }
      })
      .catch((e) => {
        message.error(e);
        setsocialData(constructure_data.SOCIAL_DETAIL.SOCIAL_DETAIL);
      });
  };

  //fetch data

  //control

  const changePage = (page: string) => {
    Router.push(page);
  };

  const filterMenu = (arrID: any = [], arrMenu: any) => {
    return arrID.indexOf(parseInt(arrMenu.MENU_ID)) == -1;
  };

  //control

  //render

  const renderallmenu = () => {
    let data: any = [];

    _.map(allMenuData, (menu, index) => {
      data.push({
        MENU_ID: index,
        ...menu,
      });
    });

    return _.filter(
      data,
      filterMenu.bind(this, config_constructure.menu_bind)
    ).map((menu, index) => {
      return (
        <Col xs={12} sm={12} md={12} lg={6} xl={6} key={index}>
          <div
            className="list-menu"
            onClick={() => {
              changePage(menu.PAGE_PATH);
            }}
          >
            <Texts size={14}>
              {i18n.language == "th" ? menu.MENU_NAME : menu.MENU_NAME_EN}
            </Texts>
          </div>
        </Col>
      );
    });
  };

  const rendersocial = () => {
    let data: any = [];
    _.map(socialData, (item, index) => {
      item.IS_USE == "1"
        ? item.URL_TYPE != "phonenumber"
          ? data.push({
              id: index,
              path:
                item.URL_TYPE == "line"
                  ? item.URL_PATH
                  : item.URL_TYPE == "email"
                  ? `mailto: ${item.URL_PATH}`
                  : null,
              icon:
                item.URL_TYPE == "line" ? (
                  <object
                    type="image/png"
                    data={`/static/icons/line.png`}
                    style={{ width: "1em", cursor: "pointer" }}
                  ></object>
                ) : item.URL_TYPE == "email" ? (
                  <MailOutlined />
                ) : null,
            })
          : null
        : null;
    });
    return _.map(data, (item) => {
      return (
        <a key={item.id} href={item.path} target="_blank">
          <AvatarMui
            sizes="small"
            style={{
              marginRight: "10px",
              backgroundColor: "white",
              color: "#2a2a2a",
            }}
          >
            {item.icon}
          </AvatarMui>
        </a>
      );
    });
  };
  //render

  //render main
  return (
    <div>
      <div className="footer">
        <Row className="footer-menu">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Row className="container-contant">{renderallmenu()}</Row>
          </Col>
        </Row>
      </div>
      <div className="copyright">
        <Row className="container-contant">
          {" "}
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={{ span: 8 }}
            xxl={{ span: 8 }}
          >
            <div className="footer-title">{i18n.t("address")}</div>
            <div style={{ paddingTop: 5 }}>
              <p>{i18n.language == "th" ? fullname : fullname_en}</p>
              <p>
                {address
                  ? i18n.language == "th"
                    ? address
                    : address_en
                  : null}
              </p>
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={{ span: 8 }}
            xxl={{ span: 8 }}
          >
            <div className="footer-title">{i18n.t("contact")}</div>
            <div style={{ paddingTop: 5 }}>
              {phone_number ? (
                <a href={`tel:${phone_number}`} style={{ color: "inherit" }}>
                  {phone_number}
                </a>
              ) : null}
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={{ span: 8 }}
            xxl={{ span: 8 }}
          >
            <div style={{ paddingTop: 5 }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  paddingBottom: 16,
                }}
              >
                {rendersocial()}
              </div>
            </div>
          </Col>
        </Row>
        <div style={{ paddingTop: 30, textAlign: "center" }}>
          {/* <p>copyright &copy; {profileData.FULL_NAME_EN}</p> */}
          <p>
            Powered by{" "}
            <a href={""} target="_blank" style={{ color: "white" }}>
              {fullname_en}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
