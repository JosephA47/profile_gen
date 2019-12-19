const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const HTML = require("./generateHTML")

inquirer
  .prompt([{
    message: "Enter your GitHub username",
    name: "username"
  },
  {
    message: "What is your favorite color",
    name: "color"
  }])
  .then(function({ username, color }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    const queryUrl2 =  `https://api.github.com/users/${username}/followers`;

    axios.get(queryUrl2).then(response => {
      const followers = response.data.map(({number}) => number)

      console.log(followers)
    }),

    axios.get(queryUrl).then(response => {
      const repositoryNames = response.data.map(({name}) => name);
      const nameStr = repositoryNames.join("\n");

      console.log("Your favorite color is " + color);
      console.log(nameStr);
    })
  })