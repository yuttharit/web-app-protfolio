import React, { useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";

export const handleError = function CatchErrorHandle(error: any) {};

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
