import React, { useState } from "react";
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
import { BackTop } from "antd";

const RootApp = ({ Component, pageProps }: AppProps) => {
  const [loadcss, setloadcss] = useState([]);
  const [pageName, setpageName] = useState<String | null>(null);

  //function
  //function

  //fetch data
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

  //control

  //render
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
          <Home getloadCss={getloadCss} />
        </div>
        <div id="about">
          <About getloadCss={getloadCss} />
        </div>
        <div id="skills">
          <Skills getloadCss={getloadCss} />
        </div>
        <div id="qulification">
          <Qulification getloadCss={getloadCss} />
        </div>
        <div id="services">
          <Services getloadCss={getloadCss} />
        </div>
        <div id="portfolio">
          <Portfolio getloadCss={getloadCss} />
        </div>
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
        {" "}
        <Footer />
      </div>
    </div>
  );
};

export default RootApp;
