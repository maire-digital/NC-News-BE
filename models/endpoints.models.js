const { readFile } = require("fs/promises");
const db = require("../db/connection");

exports.selectEndpointsJson = () => {
  return readFile("./endpoints.json", "utf-8").then((fileContents) => {
    console.log(fileContents);
    const endpoints = JSON.parse(fileContents);
    console.log(endpoints);
    return endpoints;
  });
};
