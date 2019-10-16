//const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const color = require("./generateHTML")

inquirer
  .prompt({
    message: "Enter your GitHub username",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    axios.get(queryUrl).then(response => {
      const repositoryNames = response.data.map(({name}) => name);
      const nameStr = repositoryNames.join("\n");
      console.log(nameStr);
    })
  });
