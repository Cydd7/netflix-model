import React from "react";

// ----------------------------------------------------------------------------------------
// Banner
export function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

export function showDesc(setDesc) {
  setDesc(false);
}

export function hideDesc(setDesc) {
  setDesc(true);
}

const Utils = () => {
  return <></>;
};

export default Utils;
