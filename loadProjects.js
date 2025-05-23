import fs from "fs/promises";
import { Octokit } from "octokit";
import model from "./genAI.js";
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const githubToken = process.env.GITHUB_ACCESS_TOKEN;
const geminiApiKey = process.env.GEMINI_API_KEY;
const output_path = "src/data/project.json";
const myModel = new model();
const octokit = new Octokit({
  auth: githubToken,
});
const headers = {
  owner: "Suuraw",
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
};
const response = await octokit.request("GET /users/Suuraw/repos", headers);
let projects_details = [];
const repo_data = response.data;
let count = 1;
for (const obj of repo_data) {
  const { name, html_url, languages_url } = obj;
  const languages = await octokit.request(`GET ${languages_url}`, headers);
  const prompt = `Generate a concise one-para description for a Github repository
  name of the repo:${name} , repo_link:${html_url} , languages_used:${Object.keys(
    languages.data
  )}
  `;
  const projectDescrption = await myModel.generateContent(prompt, geminiApiKey);
  await delay(5000);
  const project = {
    repo_name: name,
    description: projectDescrption,
    languages: Object.keys(languages.data),
  };
  console.log(`Project ${count} :`, project);
  projects_details.push(project);
  await fs.writeFile(output_path, JSON.stringify(projects_details, null, 2));
  count++;
}
// console.log("name: ",name);
// console.log("repo link: ",html_url);
// console.log("languages used :",Object.keys(languages.data));
// console.log("\n");
