import Head from "next/head";
import React from "react";
import config_constructure from "../utils/config_constructure";

type Props = {
  loadcss?: any;
  page_name?: any;
};

const Header = (props: Props) => {
  //function

  //function

  //fetch data
  //fetch data

  //control

  //control

  //render
  //render

  //render main
  return (
    <Head>
      <title>Header</title>
      <link
        href={`${config_constructure.root_path}/static/css/main.css`}
        rel="stylesheet"
      />
      {!!props.loadcss
        ? props.loadcss.map((item: string, key: number) => {
            let data = `${config_constructure.root_path}/static/css/${item}.css`;
            return <link rel="stylesheet" key={key} href={data} />;
          })
        : null}
    </Head>
  );
};

export default Header;
