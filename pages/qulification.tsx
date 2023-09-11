import React, { useEffect, useState } from "react";
import constructure_data from "../utils/constructure_data";
import Texts from "../components/Texts";
import { Radio, Timeline, message } from "antd";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";
import config_constructure from "../utils/config_constructure";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import { Button } from "@mui/material";
import Service from "../components/ServiceProvider";
import i18n from "../components/i18n";

moment.locale("th");

type Props = {
  getloadCss?: any;
  getPageName?: any;
};

const Qulification = (props: Props) => {
  const [work, setwork] = useState<any>([]);
  const [education, seteducation] = useState<any>([]);
  const [onvalue, setonvalue] = useState<string>("education");
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  //function
  useEffect(() => {
    props.getloadCss(["qulification/index"]);

    window.addEventListener("resize", handleResize);
    handleResize();

    fetcheducation();
    fetchwork();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //function

  //fetch data

  const fetcheducation = () => {
    seteducation(constructure_data.EDUCATION_INFO.EDUCATION_INFO);
    Service.FetchEducation()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          seteducation(res.data.EDUCATION_INFO);
        } else {
          seteducation(constructure_data.EDUCATION_INFO.EDUCATION_INFO);
        }
      })
      .catch((e) => {
        message.error(e);
        seteducation(constructure_data.EDUCATION_INFO.EDUCATION_INFO);
      });
  };

  const fetchwork = () => {
    setwork(constructure_data.WORK.WORK);
    Service.FetchWork()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          setwork(res.data.WORK);
        } else {
          setwork(constructure_data.WORK.WORK);
        }
      })
      .catch((e) => {
        message.error(e);
        setwork(constructure_data.WORK.WORK);
      });
  };

  //fetch data

  //control

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 781);
  };

  //control

  //render

  const renderheader = () => {
    const options: any = [
      { value: "education", label: i18n.t("Education"), icons: <SchoolIcon /> },
      config_constructure.can_show_internship && {
        value: "internship",
        label: "Internship",
        icons: <SchoolIcon />,
      },
      { value: "work", label: i18n.t("Work"), icons: <WorkIcon /> },
    ].filter(Boolean);

    return _.map(options, (item, index) => {
      return (
        <Button
          // className="btn-select-qul"
          variant={onvalue == item.value ? "outlined" : "contained"}
          key={index}
          startIcon={item.icons}
          style={{
            backgroundColor: onvalue == item.value ? "#DFD3C3" : "#C7B198",
            width: "250px",
            marginRight: "10px",
            marginLeft: "10px",
            marginTop: "10px",
            paddingTop: "10px",
            paddingBottom: " 10px",
            borderRadius: "2rem",
          }}
          onClick={() => {
            setonvalue(item.value);
          }}
          disabled={onvalue == item.value}
        >
          <Texts>{item.label}</Texts>
        </Button>
      );
    });
  };

  const renderqulification = () => {
    let data: any = [];
    onvalue == "education"
      ? education.map((item: any, index: number) => {
          data.push({
            id: index,
            // dot:
            //   item.ED_STATUS == "1" ? (
            //     <CheckCircleOutlined style={{ color: "green" }} />
            //   ) : null,
            children: (
              <div className="timeline-border">
                <div>
                  <Texts size={22}>{item.ED_QUALIFI}</Texts>
                </div>
                {/* // */}
                <div style={{ paddingTop: "5px" }}>
                  <Texts size={15} weight="thin">
                    {item?.MAJOR
                      ? `สาขาวิชา ${item?.MAJOR}`
                      : item?.DEPARTMENT
                      ? `แผนกวิชา ${item?.DEPARTMENT}`
                      : null}
                  </Texts>
                </div>
                {/* // */}
                {item?.FACULTY ? (
                  <div>
                    <Texts
                      size={15}
                      weight="thin"
                    >{`คณะ ${item?.FACULTY}`}</Texts>
                  </div>
                ) : null}
                {/* // */}
                <div style={{ paddingTop: "15px" }}>
                  <Texts size={18} color="gray">
                    {item?.SCHOOL_NAME}
                  </Texts>
                </div>
                {/* // */}
                <div>
                  <CalendarOutlined style={{ color: "gray" }} />
                  {item?.ED_START && (
                    <Texts size={14} weight="bold" color="gray">
                      {` ${moment(item.ED_START).format("YYYY")}`}
                    </Texts>
                  )}
                  {item?.ED_END && (
                    <Texts size={14} weight="bold" color="gray">
                      {` - ${moment(item.ED_END).format("YYYY")}`}
                    </Texts>
                  )}
                </div>
              </div>
            ),
          });
        })
      : work.map((item: any, index: number) => {
          data.push({
            id: index,
            // dot:
            //   item.WORK_STATUS == "1" ? (
            //     <CheckCircleOutlined style={{ color: "green" }} />
            //   ) : null,
            children: (
              <div className="timeline-border">
                <div>
                  <Texts size={22}>{item.POSITION}</Texts>
                </div>
                {/* // */}
                <div style={{ paddingTop: "5px" }}>
                  <Texts size={15} weight="thin">
                    {item.WORK_NAME_EN}
                  </Texts>
                  {item.WORK_TYPE != "1"
                    ? item.WORK_Vender_EN && (
                        <Texts size={15} weight="thin">
                          {` , ${item.WORK_Vender_EN}`}
                        </Texts>
                      )
                    : null}
                </div>
                {/* // */}
                <div>
                  <Texts size={15} weight="thin">
                    {item.WORK_TYPE == "1"
                      ? "Fulltime"
                      : "Employment Agreement"}
                  </Texts>
                </div>
                {/* // */}
                <div style={{ paddingTop: "20px" }}>
                  <CalendarOutlined style={{ color: "gray" }} />
                  {item?.WORK_START && (
                    <Texts size={14} weight="bold" color="gray">
                      {` ${moment(item.WORK_START).format("YYYY")}`}
                    </Texts>
                  )}
                  {item?.WORK_END && item.WORK_STATUS == "1" ? (
                    <Texts size={14} weight="bold" color="gray">
                      {` - ${moment(item.WORK_END).format("YYYY")}`}
                    </Texts>
                  ) : (
                    <Texts size={14} weight="bold" color="gray">
                      {` - ${moment().format("YYYY")}`}
                    </Texts>
                  )}
                </div>
              </div>
            ),
          });
        });

    return (
      <Timeline
        className="qulifi-timeline"
        mode={isSmallScreen ? "left" : "alternate"}
        items={data}
        key="id"
      />
    );
  };

  //render

  //render main

  return (
    <div className="web-content qulifi-content">
      <div className="content-title">
        <Texts size={20} weight="thin">
          {i18n.t("pagequlificationtitle")}
        </Texts>

        <div className="content-sub-title">
          <Texts size={40} weight="bold">
            {i18n.t("pagequlificationsubtitle")}
          </Texts>
        </div>
      </div>
      <div style={{ paddingTop: "22px", textAlign: "center" }}>
        {renderheader()}
      </div>
      <div style={{ padding: "50px" }}>{renderqulification()}</div>
    </div>
  );
};

export default Qulification;
