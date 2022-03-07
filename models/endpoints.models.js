const { readFile } = require("fs/promises");
const db = require("../db/connection");

exports.selectEndpointsJson = () => {
  return readFile("./endpoints.json", "utf-8").then((fileContents) => {
    const endpoints = JSON.parse(fileContents);
    return endpoints;
  });
};
