import React, { useEffect, useState } from "react";
import Texts from "../components/Texts";
import _ from "lodash";
import { Button, Card, Col, List, Row, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import constructure_data from "../utils/constructure_data";
import Service from "../components/ServiceProvider";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import WorkIcon from "@mui/icons-material/Work";
import i18n from "../components/i18n";

type Props = {
  getloadCss?: any;
  getPageName?: any;
};

const About = (props: Props) => {
  const [aboutdata, setaboutdata] = useState<any>([]);
  const [aboutdesc, setaboutdesc] = useState<any>([]);

  //function
  useEffect(() => {
    props.getloadCss(["about/index"]);
    fetchdataabout();
    fetchdataaboutdesc();

    return () => {};
  }, []);
  //function

  //fetch data

  const fetchdataabout = () => {
    setaboutdata(constructure_data.ABOUT_INFO.ABOUT_INFO);
    Service.FetchAboutInfo()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          setaboutdata(res.data.ABOUT_INFO);
        } else {
          setaboutdata(constructure_data.ABOUT_INFO.ABOUT_INFO);
        }
      })
      .catch((e) => {
        message.error(e);
        setaboutdata(constructure_data.ABOUT_INFO.ABOUT_INFO);
      });
  };

  const fetchdataaboutdesc = () => {
    setaboutdesc(constructure_data.ABOUT_INFO_DESC.ABOUT_INFO_DESC);
    Service.FetchAboutInfoDesc()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          setaboutdesc(res.data.ABOUT_INFO_DESC);
        } else {
          setaboutdesc(constructure_data.ABOUT_INFO_DESC.ABOUT_INFO_DESC);
        }
      })
      .catch((e) => {
        message.error(e);
        setaboutdesc(constructure_data.ABOUT_INFO_DESC.ABOUT_INFO_DESC);
      });
  };

  //fetch data

  //control
  //control

  //render

  const renderaboutinfo = () => {
    let data: any = [];
    _.map(aboutdata, (item, index) => {
      data.push({
        id: index,
        title: item.TITLE_INFO,
        title_desc:
          i18n.language == "th" ? item.TITLE_DESC : item.TITLE_DESC_EN,
        title_detail:
          i18n.language == "th" ? item.TITLE_DETAIL : item.TITLE_DETAIL_EN,
        icons:
          item.TITLE_DETAIL_EN == "experience" ? (
            <MilitaryTechIcon />
          ) : item.TITLE_DETAIL_EN == "project" ? (
            <AccountTreeIcon />
          ) : item.TITLE_DETAIL_EN == "actually_work" ? (
            <AssuredWorkloadIcon />
          ) : item.TITLE_DETAIL_EN == "worked" ? (
            <WorkIcon />
          ) : null,
      });
    });
    return (
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        dataSource={data}
        renderItem={(item: any, index: number) => {
          return (
            <List.Item key={index}>
              <Card
                className="list-about"
                title={
                  <div>
                    <div>{item.icons}</div>
                    <div>{item.title_detail}</div>
                  </div>
                }
                headStyle={{
                  backgroundColor: "#c7b198",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <Texts weight="bold" size={22}>
                  {`${item.title} ${item.title_desc}`}
                </Texts>
              </Card>
            </List.Item>
          );
        }}
      />
    );
  };
  //render

  //render main
  return (
    <div className="web-content about-content">
      <div className="content-title">
        <Texts size={20} weight="thin">
          {i18n.t("pageabouttitle")}
        </Texts>
        <div className="content-sub-title">
          <Texts size={40} weight="bold">
            {i18n.t("pageaboutsubtitle")}
          </Texts>
        </div>
      </div>
      <Row className="about-info-data">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={12}
          xxl={12}
          style={{ paddingLeft: "20px" }}
        >
          <img
            src="../static/images/2Jv4e1.jpeg"
            alt="ex"
            className="about-img"
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={12}
          xxl={12}
          className="about-info-data-detail"
        >
          <div className="about-info-frame">{renderaboutinfo()}</div>
          <div style={{ paddingTop: "50px", paddingRight: "20px" }}>
            <div className="about-description">
              <Texts>
                {i18n.language == "th"
                  ? aboutdesc.ABOUT_DESC
                  : aboutdesc.ABOUT_DESC_EN}
              </Texts>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default About;
