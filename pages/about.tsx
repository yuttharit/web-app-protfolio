import React, { useEffect, useState } from "react";
import Texts from "../components/Texts";
import _ from "lodash";
import { Button, List, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import constructure_data from "../utils/constructure_data";
import Service from "../components/ServiceProvider";

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
    Service.FetchAboutInfo()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          setaboutdata(res.data.ABOUT_INFO);
        }
      })
      .catch((e) => {
        message.error(e);
      });
  };

  const fetchdataaboutdesc = () => {
    Service.FetchAboutInfoDesc()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          setaboutdesc(res.data.ABOUT_INFO_DESC);
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

  const renderaboutinfo = () => {
    let data: any = [];
    _.map(aboutdata, (item, index) => {
      data.push({
        id: index,
        title: item.TITLE_INFO,
        title_desc: item.TITLE_DESC,
        title_detail: item.TITLE_DETAIL,
      });
    });
    return (
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        dataSource={data}
        renderItem={(item: any) => {
          return (
            <List.Item key={item.id} style={{ textAlign: "center" }}>
              <Texts weight="bold" size={22}>
                {item.title}
              </Texts>
              <div>
                <Texts size={15}>{item.title_desc}</Texts>
                <br />
                <Texts size={15}>{item.title_detail}</Texts>
              </div>
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
        <Texts size={20} weight="bold">
          About Me
        </Texts>
        <div className="content-sub-title">
          <Texts size={16} weight="thin">
            My Introduction
          </Texts>
        </div>
      </div>
      <div className="about-content-info">
        <div style={{ textAlign: "center" }}>
          <img
            src="../static/images/2Jv4e1.jpeg"
            alt="ex"
            className="about-img"
          />
        </div>

        <div className="about-info-data">
          <div className="about-description">
            <Texts>{aboutdesc.ABOUT_DESC}</Texts>
          </div>

          {/* <div className="about-info">{renderaboutinfo()}</div> */}
          {renderaboutinfo()}
          <div className="about-bytton">
            <a href="/static/files/portfolio_ys.png" target="_blank">
              <Button style={{ width: "200px", height: "60px" }}>
                DownloadCV <DownloadOutlined />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
