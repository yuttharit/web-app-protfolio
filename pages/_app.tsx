import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import config_constructure from "../utils/config_constructure";

import Home from ".";
import Skills from "./skills";
import About from "./about";
import Services from "./services";
import Portfolio from "./portfolio";
import Qulification from "./qulification";
import Footer from "../components/Footer";
import { BackTop, message } from "antd";
import Service from "../components/ServiceProvider";
import constructure_data from "../utils/constructure_data";
import _, { flatten } from "lodash";
import Contact from "./contact";

type Menumain = {
  MENU_NAME: string;
};

const RootApp = ({ Component, pageProps }: AppProps) => {
  const [loadcss, setloadcss] = useState([]);
  const [pageName, setpageName] = useState<String | null>(null);
  const [menu, setmenu] = useState<Menumain[]>([]);

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

  const getloadCss = (loadcss: any) => {
    setloadcss((prevLoadCss): any => {
      return [...prevLoadCss, ...loadcss];
    });
  };

  const getPageName = (page_name: string) => {
    setpageName(page_name);
  };

  const getMenu = (menu: any) => {};

  const onpage = (test: any = null) => {
    const elementToScrollTo = document.getElementById(test ? test : "home");
    if (elementToScrollTo) {
      elementToScrollTo.scrollIntoView({
        behavior: "smooth", // Use "auto" for instant scrolling
        block: "start", // Scroll to the top of the element
        inline: "nearest", // Scroll horizontally to the element if it's already in view
      });
    }
  };

  const filterMenu = (arrID: any = [], arrMenu: any) => {
    return arrID.indexOf(parseInt(arrMenu.MENU_ID)) == -1;
  };

  //control

  //render
  // _.filter(data, filterMenu.bind(this, [2, 3])).map((item, index) => {});
  const renderwebsite = () => {
    let data: any = [];
    _.map(menu, (item, index) => {
      data.push({
        MENU_ID: index,
        ...item,
      });
    });

    return _.filter(data, filterMenu.bind(this, [3])).map(
      (item: any, index: number) => {
        return (
          <div id={item.PAGE_PATH} key={index}>
            {item.PAGE_PATH == "about" ? (
              <About getloadCss={getloadCss} />
            ) : item.PAGE_PATH == "skills" ? (
              <Skills getloadCss={getloadCss} />
            ) : item.PAGE_PATH == "qulification" ? (
              <Qulification getloadCss={getloadCss} />
            ) : item.PAGE_PATH == "portfolio" ? (
              <Portfolio getloadCss={getloadCss} />
            ) : item.PAGE_PATH == "services" ? (
              <Services getloadCss={getloadCss} />
            ) : item.PAGE_PATH == "contact" ? (
              <Contact getloadCss={getloadCss} />
            ) : (
              <Home getloadCss={getloadCss} />
            )}
          </div>
        );
      }
    );
  };
  //render

  //render main

  return (
    <div>
      <Head>
        <link
          href={`${config_constructure.root_path}/static/css/initial.css`}
          rel="stylesheet"
        />
      </Head>
      <Header
        loadcss={["layout/menumain", "layout/framemaster", ...loadcss]}
        page_name={pageName}
      />
      <Navbar onfunction={onpage} />
      <div className="web-site">
        <div id="home">
          <Home getloadCss={getloadCss} onfunction={onpage} />
        </div>
        {renderwebsite()}
      </div>
      <div className="web-mobile">
        <Component
          {...pageProps}
          getloadCss={getloadCss}
          getPageName={getPageName}
          getMenu={getMenu}
        />
      </div>
      <div>
        <BackTop />
        <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}></strong>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default RootApp;
