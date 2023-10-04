import React, { useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";

export const handleError = function CatchErrorHandle(error: any) {
  if (error === 400) {
    return "ส่งค่าไปไม่ครบตามที่กำหนด";
  } else {
    return "เกิดเหตุผิดพลาด กรุณาติดต่อผู้พัฒนา";
  }
};

export const RequestFunction = async function RequestService(
  url: any,
  data: any
) {
  return axios
    .get(
      url,
      {
        unique_id: "",
        ...data,
      }
      // {
      //   headers,
      //   headers: {
      //     Authorization: `Bearer ${""}`,
      //   },
      // }
    )
    .then((res) => {
      console.log(url, res);
      return res;
    })
    .catch((error) => {
      if (!!error.response) {
        throw handleError(error.response.status);
      } else {
        console.log(error);
        throw handleError("etc");
      }
    });
};

export const asyncLocalStorage = {
  setItem: async function (key?: any, value?: any) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  },
  getItem: async function (key?: any, value?: any) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key);
    });
  },
  removeItem: async function (key?: any, value?: any) {
    return Promise.resolve().then(function () {
      return localStorage.removeItem(key);
    });
  },
};
