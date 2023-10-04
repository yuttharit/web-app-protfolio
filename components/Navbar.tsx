import React, { useEffect, useState } from "react";
import constructure_data from "../utils/constructure_data";
import _, { flatten } from "lodash";
import { Affix, Button, Drawer, message } from "antd";
import { CaretLeftOutlined } from "@ant-design/icons";
import Texts from "./Texts";
import Router from "next/router";
import SvgFile from "../utils/SvgFile";
import Service from "./ServiceProvider";
import config_constructure from "../utils/config_constructure";
import i18n from "./i18n";
import { asyncLocalStorage } from "../utils/function";
import Storage from "./Storage";
import { Button as ButtonM } from "@mui/material";

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
    setmenu(constructure_data.MENU_WEB.MENU_WEB);
    Service.FetchMenuBar()
      .then((res) => {
        if (!!res.data && res.data.RESULT) {
          setmenu(res.data.MENU_WEB);
        } else {
          setmenu(constructure_data.MENU_WEB.MENU_WEB);
        }
      })
      .catch((e) => {
        message.error(e);
        setmenu(constructure_data.MENU_WEB.MENU_WEB);
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

  const filterMenu = (arrID: any = [], arrMenu: any) => {
    return arrID.indexOf(parseInt(arrMenu.MENU_ID)) == -1;
  };

  //เปลี่ยนสถานะ Setting ภาษา
  const changeLanguage = async (value: any) => {
    await asyncLocalStorage.setItem(Storage["LANGUAGE_LOCALE"], value);

    i18n.changeLanguage(value);
  };

  //control

  //render

  const rendermenumain = () => {
    let data: any = [];
    _.map(menu, (item, index) => {
      data.push({
        MENU_ID: index,
        ...item,
      });
    });
    return (
      <>
        <div
          className="menu-main-right-inmenu"
          onClick={() => {
            ontest();
          }}
        >
          <Texts>{i18n.language == "th" ? "หน้าหลัก" : "Home"}</Texts>
        </div>
        {_.filter(
          data,
          filterMenu.bind(this, config_constructure.menu_bind)
        ).map((item, index) => {
          return (
            <div
              key={index}
              className="menu-main-right-inmenu"
              onClick={() => {
                ontest(item);
              }}
            >
              <Texts>
                {i18n.language == "th" ? item.MENU_NAME : item.MENU_NAME_EN}
              </Texts>
            </div>
          );
        })}
        {config_constructure.can_change_language && renderchangelangaue()}
      </>
    );
  };

  const rendermenumainmobile = () => {
    let data: any = [];
    _.map(menu, (item, index) => {
      data.push({
        MENU_ID: index,
        ...item,
      });
    });
    return (
      <>
        <div
          className="menu-main-right-inmenu"
          onClick={() => {
            pushPageURL("/");
            onpreview();
          }}
        >
          <Texts>
            <Texts>{i18n.language == "th" ? "หน้าหลัก" : "Home"}</Texts>
          </Texts>
        </div>
        {_.filter(
          data,
          filterMenu.bind(this, config_constructure.menu_bind)
        ).map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="menu-main-right-inmenu"
              onClick={() => {
                pushPageURL("/" + item.PAGE_PATH);
                onpreview();
              }}
            >
              <Texts>
                {i18n.language == "th" ? item.MENU_NAME : item.MENU_NAME_EN}
              </Texts>
            </div>
          );
        })}
      </>
    );
  };

  const renderchangelangaue = () => {
    return (
      <div>
        <div>
          <ButtonM
            onClick={() => {
              changeLanguage("th");
            }}
            style={{ borderRadius: 0 }}
          >
            <span className={i18n.language == "th" ? "link-text" : ""}>
              ไทย
            </span>
          </ButtonM>
        </div>
        <div>
          <ButtonM
            onClick={() => {
              changeLanguage("en");
            }}
            style={{ borderRadius: 0 }}
          >
            <span className={i18n.language == "en" ? "link-text" : ""}>
              English
            </span>
          </ButtonM>
        </div>
      </div>
    );
  };

  //render

  //render main

  return (
    <Affix offsetTop={0}>
      <div className="menu-main">
        <div className="menu-main-left">
          <img
            src="/static/icons/portfolio.svg"
            style={{ maxWidth: "50px", width: "100%", borderRadius: "10px" }}
          />
        </div>
        <div className="menu-main-right">{rendermenumain()}</div>
        <div className="menu-main-right-mobile">
          <Button
            className="btn-show-menu"
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
