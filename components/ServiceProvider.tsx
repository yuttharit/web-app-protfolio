import React from "react";
import { RequestFunction } from "../utils/function";
import config_constructure from "../utils/config_constructure";

type Props = {};

//get จรง จาก json ยังไม่ได้ เรียกจาก ไฟล์

const Service = {
  FetchMenuBar() {
    let url = config_constructure.root_path_service;
    return RequestFunction(`${url}/MENU_WEB`, null);
  },
  FetchSocialInfo() {
    let url = config_constructure.root_path_service;
    return RequestFunction(`${url}/SOCIAL_DETAIL`, null);
  },
  FetchProfileInfo() {
    let url = config_constructure.root_path_service;
    return RequestFunction(`${url}/PROFILE_INFO`, null);
  },
  FetchAboutInfo() {
    let url = config_constructure.root_path_service;
    return RequestFunction(`${url}/ABOUT_INFO`, null);
  },
  FetchAboutInfoDesc() {
    let url = config_constructure.root_path_service;
    return RequestFunction(`${url}/ABOUT_INFO_DESC`, null);
  },
  FetchSkills() {
    let url = config_constructure.root_path_service;
    return RequestFunction(`${url}/SKILLS_PROGRAMMING`, null);
  },
  FetchEducation() {
    let url = config_constructure.root_path_service;
    return RequestFunction(`${url}/EDUCATION_INFO`, null);
  },
  FetchWork() {
    let url = config_constructure.root_path_service;
    return RequestFunction(`${url}/WORK`, null);
  },
  FetchService() {
    let url = config_constructure.root_path_service;
    return RequestFunction(`${url}/SERVICE_ON_WORK`, null);
  },
  FetchPortfolio() {
    let url = config_constructure.root_path_service;
    return RequestFunction(`${url}/PORTFOLIO`, null);
  },
};

export default Service;
