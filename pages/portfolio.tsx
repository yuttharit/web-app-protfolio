import React, { useEffect, useState } from "react";
import Texts from "../components/Texts";
import constructure_data from "../utils/constructure_data";
import _ from "lodash";
import { Button, Card, Col, List, Row, Image, Modal, message } from "antd";
import Gallery from "react-photo-gallery";
import Carousel from "react-images";
import { Modal as UModal } from "@mui/material";
import { CloseCircleOutlined } from "@ant-design/icons";
import Service from "../components/ServiceProvider";
import config_constructure from "../utils/config_constructure";
import i18n from "../components/i18n";

const { Meta } = Card;

type Props = {
  getloadCss?: any;
  getPageName?: any;
  getMenu?: any;
};

const Portfolio = (props: Props) => {
  const [portfoilo, setportfoilo] = useState<any>([]);
  const [selected_project, setselected_project] = useState<any>(null);
  const [is_modaldetail, setis_modaldetail] = useState<any>(false);
  const [is_modalpic, setis_modalpic] = useState<any>(false);
  const [modalIsOpen, setmodalIsOpen] = useState<any>(false);
  //function

  useEffect(() => {
    props.getloadCss(["portfolio/index"]);
    // props.getMenu("mobileadmin");

    fetchdataportfolio();

    return () => {};
  }, []);

  //function

  //fetch data

  const fetchdataportfolio = () => {
    setportfoilo(constructure_data.PORTFOLIO.PORTFOLIO);
    Service.FetchPortfolio()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          setportfoilo(res.data.PORTFOLIO);
        } else {
          setportfoilo(constructure_data.PORTFOLIO.PORTFOLIO);
        }
      })
      .catch((e) => {
        message.error(e);
        setportfoilo(constructure_data.PORTFOLIO.PORTFOLIO);
      });
  };

  //fetch data

  //control

  const toggleModal = (e?: any) => {
    setmodalIsOpen(!modalIsOpen);
  };

  //control

  //render

  const renderportfolio = () => {
    let data: any = [];
    _.map(portfoilo, (item, index) => {
      data.push({
        id: index,
        project_name: item.PORTFOLIO_NAME,
        project_desc: item.PORTFOLIO_DESC,
        project_detail: item.PORTFOLIO_DETAIL,
        project_icons:
          item.PORTFOLIO_NAME_EN == "Webadmin Mobile for cooperative"
            ? "../static/icons/mood-board.svg"
            : item.PORTFOLIO_NAME_EN == "Webportal for cooperative"
            ? "../static/icons/online-lesson.svg"
            : item.PORTFOLIO_NAME_EN == "WebSite for cooperative"
            ? "../static/icons/responsive.svg"
            : null,
      });
    });
    return (
      <div>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          style={{ padding: "5px" }}
          dataSource={data}
          renderItem={(item: any, index: number) => {
            return (
              <List.Item key={index}>
                <Card className="card-list-menu">
                  <div>
                    <div className="card-img-block">
                      <img
                        alt="example"
                        src={item.project_icons}
                        style={{ width: "120px" }}
                      />
                    </div>
                  </div>
                  <div style={{ paddingTop: "15px", textAlign: "center" }}>
                    <Texts size={16} weight="bold">
                      {item.project_name}
                    </Texts>
                  </div>
                  <Row className="port-btn" style={{}}>
                    <Col span={config_constructure.can_show_project ? 12 : 24}>
                      <Button
                        type="dashed"
                        onClick={() => {
                          setselected_project(item);
                          setis_modaldetail(true);
                        }}
                      >
                        {i18n.t("details")}
                      </Button>
                    </Col>
                    {config_constructure.can_show_project ? (
                      <Col span={12}>
                        <Button
                          className="btn-show-pic"
                          onClick={() => {
                            setselected_project(item);
                            setis_modalpic(true);
                          }}
                        >
                          {i18n.t("Examplepicture")}
                        </Button>
                      </Col>
                    ) : null}
                  </Row>
                </Card>
              </List.Item>
            );
          }}
        />
      </div>
    );
  };

  const rendermodaldetailproject = () => {
    return (
      <Modal
        title={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Texts size={20} weight="bold">
              {selected_project?.project_name}
            </Texts>
          </div>
        }
        open={selected_project && is_modaldetail}
        onCancel={() => {
          setselected_project(null);
          setis_modaldetail(false);
        }}
        footer={false}
      >
        <div style={{ paddingTop: "25px" }}>
          <Texts size={16} weight="thin" color="gray">
            {selected_project?.project_desc}
          </Texts>
        </div>
      </Modal>
    );
  };

  const rendermodaldetailprojectpicture = () => {
    let photo: any = [];

    _.map(selected_project?.project_detail, (item: any, index: number) => {
      if (item.DETAIL_IMG1) {
        photo.push({
          id: index,
          src: item.DETAIL_IMG1 ? item.DETAIL_IMG1 : null,
          width:
            index == 2 ||
            index == 4 ||
            index == 6 ||
            index == 11 ||
            index == 15 ||
            index == 21
              ? 6
              : 3,
          height: 3,
          style: { objaecFit: "cover" },
        });
      }
      if (item.DETAIL_IMG2) {
        photo.push({
          id: index,
          src: item.DETAIL_IMG2 ? item.DETAIL_IMG2 : null,
          width:
            index == 2 ||
            index == 4 ||
            index == 6 ||
            index == 11 ||
            index == 15 ||
            index == 21
              ? 6
              : 3,
          height: 3,
          style: { objaecFit: "cover" },
        });
      }
      if (item.DETAIL_IMG3) {
        photo.push({
          id: index,
          src: item.DETAIL_IMG3 ? item.DETAIL_IMG3 : null,
          width:
            index == 2 ||
            index == 4 ||
            index == 6 ||
            index == 11 ||
            index == 15 ||
            index == 21
              ? 6
              : 3,
          height: 3,
          style: { objaecFit: "cover" },
        });
      }
      if (item.DETAIL_IMG4) {
        photo.push({
          id: index,
          src: item.DETAIL_IMG4 ? item.DETAIL_IMG4 : null,
          width:
            index == 2 ||
            index == 4 ||
            index == 6 ||
            index == 11 ||
            index == 15 ||
            index == 21
              ? 6
              : 3,
          height: 3,
          style: { objaecFit: "cover" },
        });
      }
      if (item.DETAIL_IMG5) {
        photo.push({
          id: index,
          src: item.DETAIL_IMG5 ? item.DETAIL_IMG5 : null,
          width:
            index == 2 ||
            index == 4 ||
            index == 6 ||
            index == 11 ||
            index == 15 ||
            index == 21
              ? 6
              : 3,
          height: 3,
          style: { objaecFit: "cover" },
        });
      }
    });

    return (
      <Modal
        title={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Texts size={20} weight="bold">
              {selected_project?.project_name}
            </Texts>
          </div>
        }
        open={selected_project && is_modalpic}
        onCancel={() => {
          setselected_project(null);
          setis_modalpic(false);
        }}
        footer={false}
      >
        <div style={{ paddingTop: "25px" }}>
          {photo.length > 0 ? (
            <div>
              <Gallery
                photos={photo}
                direction={"row"}
                onClick={(e) => {
                  toggleModal(e);
                }}
              />
              <UModal
                keepMounted
                open={modalIsOpen}
                onClose={(e) => {
                  toggleModal(e);
                }}
              >
                <div>
                  <div
                    style={{
                      textAlign: "right",
                      paddingTop: "10px",
                      paddingRight: "20px",
                    }}
                  >
                    <Button
                      type="text"
                      icon={
                        <CloseCircleOutlined
                          style={{ fontSize: "30px", color: "white" }}
                        />
                      }
                      onClick={(e) => {
                        toggleModal(e);
                      }}
                    />
                  </div>
                  <div>
                    <Carousel views={photo} />
                  </div>
                </div>
              </UModal>
            </div>
          ) : null}
        </div>
      </Modal>
    );
  };

  //render

  //render main

  return (
    <div className="web-content port-content">
      <div className="content-title">
        <Texts size={20} weight="thin">
          {i18n.t("pageportfoliotitle")}
        </Texts>
        <div className="content-sub-title">
          <Texts size={40} weight="bold">
            {i18n.t("pageportfoliosubtitle")}
          </Texts>
        </div>
      </div>
      <div className="body-menu-list">{renderportfolio()}</div>
      {rendermodaldetailproject()}
      {rendermodaldetailprojectpicture()}
    </div>
  );
};

export default Portfolio;
