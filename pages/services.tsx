import React, { useEffect, useState } from "react";
import Texts from "../components/Texts";
import _ from "lodash";
import constructure_data from "../utils/constructure_data";
import { Button, Card, List, Modal, message } from "antd";
import DataObjectIcon from "@mui/icons-material/DataObject";
import StorageIcon from "@mui/icons-material/Storage";
import BrushIcon from "@mui/icons-material/Brush";
import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import Service from "../components/ServiceProvider";
const { Meta } = Card;

type Props = {
  getloadCss?: any;
  getPageName?: any;
};

const Services = (props: Props) => {
  const [onservice, setonservice] = useState<any>([]);
  const [selected_service, setselected_service] = useState<any>(null);
  const [is_visable_service, setis_visable_service] = useState<boolean>(false);
  //function

  useEffect(() => {
    props.getloadCss(["service/index"]);
    fetchservice();

    return () => {};
  }, []);

  //function

  //fetch data

  const fetchservice = () => {
    Service.FetchService()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          setonservice(res.data.SERVICE_ON_WORK);
        }
      })
      .catch((e) => {
        message.error(e);
      });
  };

  //fetch data

  //controll
  //controll

  //render

  const renderservice = () => {
    let data: any = [];
    _.map(onservice, (item, index) => {
      data.push({
        id: index,
        title: item.SERVICE_NAME,
        detail: item.SERVICE_DETAIL,
        icons:
          item.SERVICE_NAME == "Frontend Developer" ? (
            <DataObjectIcon />
          ) : item.SERVICE_NAME == "Backend Developer" ? (
            <StorageIcon />
          ) : item.SERVICE_NAME == "Ui/Ux Designer" ? (
            <BrushIcon />
          ) : null,
      });
    });
    return (
      <List
        className="service-list"
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
        renderItem={(item: any) => {
          return (
            <List.Item key={item.id}>
              <div className="service-list-item">
                <Card className="service-card-modal" bordered={false}>
                  <Meta
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div>{item.icons}</div>
                        <Texts size={18} style={{ paddingLeft: "5px" }}>
                          {item.title}
                        </Texts>
                      </div>
                    }
                    description={
                      <div className="card-description">
                        <div className="card-description-web">
                          <Button
                            type="primary"
                            className="btn-card-desc"
                            onClick={() => {
                              setselected_service(item);
                              setis_visable_service(true);
                            }}
                          >
                            <Texts size={16}>View More</Texts>
                            <Texts
                              size={14}
                              style={{ paddingLeft: "5px", paddingTop: "2px" }}
                            >
                              <ArrowRightOutlined className="service-icon" />
                            </Texts>
                          </Button>
                        </div>
                        <div className="card-description-mobile">
                          <Button
                            type="text"
                            onClick={() => {
                              setselected_service(item);
                              setis_visable_service(true);
                            }}
                          >
                            <Texts size={16} color="gray">
                              View More
                            </Texts>
                          </Button>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </div>
            </List.Item>
          );
        }}
      />
    );
  };

  const rendermodalservice = () => {
    return (
      <Modal
        title={<Texts size={25}>{selected_service?.title}</Texts>}
        open={selected_service && is_visable_service}
        onCancel={() => {
          setis_visable_service(false);
          setselected_service(null);
        }}
        footer={false}
      >
        <div style={{ paddingTop: "35px", paddingBottom: "20px" }}>
          {_.map(selected_service?.detail, (item, index) => {
            return (
              <div
                key={index}
                style={{
                  paddingTop: "20px",
                  paddingLeft: "10px",
                }}
              >
                <CheckCircleOutlined style={{ color: "green" }} />
                <Texts size={18} style={{ paddingLeft: "5px" }}>
                  {item.DETAIL}
                </Texts>
              </div>
            );
          })}
        </div>
      </Modal>
    );
  };

  //render

  //render mian
  return (
    <div className="web-content service-content">
      <div className="content-title">
        <Texts size={20} weight="bold">
          Services
        </Texts>
        <div className="content-sub-title">
          <Texts size={16} weight="thin">
            What i offer
          </Texts>
        </div>
      </div>
      <div style={{ padding: "10px" }}>{renderservice()}</div>
      {rendermodalservice()}
    </div>
  );
};

export default Services;
