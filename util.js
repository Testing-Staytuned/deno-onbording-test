// require('dotenv').config();
// const tokn = process.env.MY_VARIABLE;
// const tokn = "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";
// console.log(tokn);
export default async function createIssue(title, body) {
  const owner = "Testing-Staytuned";
  const repo = "deno-onbording-test";
  // const title = 'Issue created from Deno';
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      {
        method: "POST",
        headers: {
          // 'Authorization': `token ${tokn}`,
          Authorization: `Bearer ${tokn}`,
          // 'Accept': 'application/vnd.github.v3+json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
        }),
      }
    );

    const data = await response.json();
    console.log("Issue created:", data.html_url);
  } catch (error) {
    console.error("Error creating issue:", error.message);
  }
}
