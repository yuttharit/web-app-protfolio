import React, { useEffect, useState } from "react";
import constructure_data from "../utils/constructure_data";
import _, { flatten } from "lodash";
import { Affix, Button, Drawer, message } from "antd";
import { CaretLeftOutlined } from "@ant-design/icons";
import Texts from "./Texts";
import Router from "next/router";
import SvgFile from "../utils/SvgFile";
import Service from "./ServiceProvider";

type Props = {
  onfunction: any;
};

type Menumain = {
  MENU_NAME: string;
};

const Navbar = (props: Props) => {
  const [menu, setmenu] = useState<Menumain[]>([]);
  const [visiblemenu, setvisiblemenu] = useState<boolean>(false);
  //function

  useEffect(() => {
    fetchdatamenu();
    return () => {};
  }, []);

  //function

  //fetch data

  const fetchdatamenu = () => {
    Service.FetchMenuBar()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          setmenu(res.data.MENU_WEB);
        }
      })
      .catch((e) => {
        message.error(e);
        setmenu(constructure_data.MENU_WEB);
      });
  };

  //fetch data

  //control

  const onpreview = () => {
    setvisiblemenu(!visiblemenu);
  };

  const pushPageURL = (page: string) => {
    Router.push(page);
  };

  const ontest = (test?: any | null) => {
    props.onfunction(test?.PAGE_PATH);
  };

  //control

  //render

  const rendermenumain = () => {
    return (
      <>
        <div
          className="menu-main-right-inmenu"
          onClick={() => {
            ontest();
          }}
        >
          <Texts>หน้าหลัก</Texts>
        </div>
        {_.filter(menu, (item, index) => index != 2).map((item: any, index) => {
          return (
            <div
              key={index}
              className="menu-main-right-inmenu"
              onClick={() => {
                ontest(item);
              }}
            >
              <Texts>{item.MENU_NAME}</Texts>
            </div>
          );
        })}
      </>
    );
  };

  const rendermenumainmobile = () => {
    return (
      <>
        <div
          className="menu-main-right-inmenu"
          onClick={() => {
            pushPageURL("/");
            onpreview();
          }}
        >
          <Texts>Home</Texts>
        </div>
        {_.map(menu, (item: any, index: number) => {
          return (
            <div
              key={index}
              className="menu-main-right-inmenu"
              onClick={() => {
                pushPageURL("/" + item.PAGE_PATH);
                onpreview();
              }}
            >
              <Texts>{item.MENU_NAME}</Texts>
            </div>
          );
        })}
      </>
    );
  };

  //render

  //render main

  return (
    <Affix offsetTop={0}>
      <div className="menu-main">
        <div className="menu-main-left">
          {/* <SvgFile name={"portfoilo"} width={110} height={110} fill={"red"} /> */}
          <img
            src="/static/icons/portfolio.svg"
            style={{ maxWidth: "50px", width: "100%", borderRadius: "10px" }}
          />
        </div>
        <div className="menu-main-right">{rendermenumain()}</div>
        <div className="menu-main-right-mobile">
          <Button
            type="primary"
            icon={<CaretLeftOutlined />}
            style={{ width: "50px" }}
            onClick={() => {
              onpreview();
            }}
          />
        </div>
        <Drawer
          open={visiblemenu}
          onClose={() => {
            onpreview();
          }}
          title="MENU"
        >
          {rendermenumainmobile()}
        </Drawer>
      </div>
    </Affix>
  );
};

export default Navbar;
