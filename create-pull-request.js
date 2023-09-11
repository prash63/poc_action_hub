const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const owner = process.env.GITHUB_REPOSITORY.split("/")[0];
const repo = process.env.GITHUB_REPOSITORY.split("/")[1];
const base = process.env.RELEASE_BRANCH;
const head = process.env.FEATURE_BRANCH;
const title = process.env.PR_TITLE;

octokit.pulls
  .create({
    owner,
    repo,
    title,
    head,
    base,
  })
  .then((response) => {
    const prUrl = response.data.html_url;
    console.log(`Pull request created: ${prUrl}`);
  })
  .catch((error) => {
    console.error(`Error creating pull request: ${error.message}`);
    process.exit(1);
  });
