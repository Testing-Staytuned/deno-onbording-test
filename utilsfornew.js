import { Octokit } from "https://esm.sh/@octokit/core@5.0.0";


const octokit = new Octokit({ auth: tokn });

async function getIssueidFromIssueNumber(octokit, owner, repo, issueNumber) {
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
      owner: owner,
      repo: repo,
      issue_number: issueNumber
    });

    if (!response || !response.data) {
      throw new Error('No response from server');
    }
    console.log(response.data.node_id);
    return response.data.node_id;
  } catch (error) {
    throw new Error(`Failed to fetch issue comments: ${error.message}`);
  }
}


  async function returnItemidofGivenIssue(octokit, issueid) {
    const token = tokn;
    const query = `
    query{
      node(id: "PVT_kwDOCWJ_tM4Abm8s") {
        ... on ProjectV2 {
          items(first: 20) {
            nodes {
              ... on ProjectV2Item {
                id
                content {
                  ... on Issue {
                    id
                    title
                    body
                  }
                }
              }
            }
          }
        }
      }
    }
    `;
  
      // const octokit = new Octokit({ auth: token });
      const response = await octokit.request("POST /graphql", {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        query: query,
      });
  
      const data = response.data;
      if (data.errors) {
        console.error(data.errors);
        throw new Error("Failed to add issue to project");
      }
      // console.log(data.data.node.items.nodes);
      // console.log(data.data.node.items.nodes.length);
      for (let i = 0; i < data.data.node.items.nodes.length; i++) {
        if (data.data.node.items.nodes[i].content.id == issueid) {
          console.log(data.data.node.items.nodes[i]);
          return data.data.node.items.nodes[i].id;
        }
    }
  }


  async function getOneProjectColumnValue1(octokit,itemId) {
    const token = tokn;
    const query = `
    query{
      node(id: "PVT_kwDOCWJ_tM4Abm8s") {
        ... on ProjectV2 {
          items(last: 20) {
            nodes {
              ... on ProjectV2Item {
                id,
                fieldValueByName(name:"email") {
                  __typename
                  ... on ProjectV2ItemFieldTextValue {
                    id
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
    `;
    const query1 = `
    query {
      project: node(id: "PVT_kwDOCWJ_tM4Abm8s") {
        ... on ProjectV2 {
          id
          items(last: 20) {
            nodes {
              ... on ProjectV2Item {
                id
              }
            }
          }
        }
      }
      item: node(id: "${itemId}") {
        ... on ProjectV2Item {
          id
          fieldValueByName(name:"email") {
            __typename
            ... on ProjectV2ItemFieldTextValue {
              id
              text
            }
          }
        }
      }
    }
    `;
  
    const response = await octokit.request("POST /graphql", {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      query: query1,
    });
  
    const data = response.data;
    if (data.errors) {
      console.error(data.errors);
      throw new Error("Failed to add issue to project");
    }
    // get the response
    console.log(data.data.item.fieldValueByName.text);
    return data.data.item.fieldValueByName.text;
  }


  async function appendToIssueDescription(octokit, additionalContent) {
    const owner = "Testing-Staytuned";
    const repo = "onbording_member";
    const issueNumber = "45";
    const token = tokn;
    // const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;
  
    const existingDescription = await fetchCurrentDescription(octokit, owner, repo, issueNumber) || ''; // Use empty string if null
    const payload = {body:existingDescription + additionalContent};

  
    try {
      const data = await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
        owner: owner,
        repo: repo,
        issue_number: issueNumber,
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: payload.body // Change this line
      });
      // console.log(data);
      console.log('Issue description updated successfully');
      // return data;
    } catch (error) {
      console.error('Error updating issue description:', error);
      throw error;
    }
    async function fetchCurrentDescription(octokit, owner, repo, issueNumber) {
      try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
          owner: owner,
          repo: repo,
          issue_number: issueNumber
        });
        
        return response.data.body; // Change this line
      } catch (error) {
        throw new Error(`Failed to fetch issue description: ${error.message}`);
      }
    }
  }


  async function UpdateIssueEmailField(octokit,itemid, email) {
    const token = tokn;
    const query = `
    mutation {
      updateProjectV2ItemFieldValue(
        input: {
          projectId: "PVT_kwDOCWJ_tM4Abm8s",
          itemId: "${itemid}",
          fieldId: "PVTF_lADOCWJ_tM4Abm8szgRyoBg",
          value: {
            text: "${email}"
          }
        }
        ) {
          projectV2Item {
            id
          }
        }
      }
      `;
  
    const response = await octokit.request("POST /graphql", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      query: query,
    });
  
    const data = response.data;
    if (data.errors) {
      console.error(data.errors);
      throw new Error("Failed to add issue to project");
    }
    // get the response
    // console.log(data.data);
    console.log("Issue updated successfully:");
    return data.data;
  }


  async function addIssueToProject(octokit,IssueId) {
    const token = tokn;
    const query = `
    mutation {
      addProjectV2ItemById(input: {projectId: "PVT_kwDOCWJ_tM4Abm8s" contentId: "${IssueId}"}) {
        item {
          id
        }
      }
    }
    `;
  
    const response = await octokit.request("POST /graphql", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      query: query,
    });
  
    const data = response.data;
    if (data.errors) {
      console.error(data.errors);
      throw new Error("Failed to add issue to project");
    }
    // get the response
    console.log(data.data);
    return data.data.addProjectV2ItemById.item.id;
    // console.log("Issue added successfully:");
  }


  async function createIssue(octokit,title, body) {
    const owner = "Testing-Staytuned";
    const repo = "onbording_member";
    // const title = 'Issue created from Deno';
    try {
      const response = await octokit.request(
        `POST /repos/${owner}/${repo}/issues`,
        {
          headers: {
            Authorization: `Bearer ${tokn}`,
            "Content-Type": "application/json",
          },
          title,
          body,
        }
      );
  
      const data = response.data;
      console.log("Issue created:", data.html_url);
      console.log("Issue created:", data.node_id);
      return data.node_id;
    } catch (error) {
      console.error("Error creating issue:", error.message);
    }
  }

  // const itemid="PVTI_lADOCWJ_tM4Abm8szgMa930"
  // const iid="I_kwDOLJ6B0s5-DMp_";
// const iid=createIssue(octokit,"Issue created from Deno using octokit","This is the body of the issue created from Deno using octokit");
// appendToIssueDescription(octokit,"- [ ] Added a new task\n");
// fetchCurrentDescription(octokit,"Testing-Staytuned","onbording_member",45);
// getIssueidFromIssueNumber(octokit,"Testing-Staytuned","onbording_member",45);
// addIssueToProject(octokit,'I_kwDOLJ6B0s5-DMp_');
// UpdateIssueEmailField(octokit,itemid," This is the updated email");
// returnItemidofGivenIssue(octokit,'I_kwDOLJ6B0s5-DMp_');
// getOneProjectColumnValue1(octokit,itemid);
//test this tommorow
