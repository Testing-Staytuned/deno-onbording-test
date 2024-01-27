// require('dotenv').config();
import { config } from "https://deno.land/x/dotenv/mod.ts";
const env = config();
// const tokn = env.GITHUB_TOKEN;


// console.log(tokn);
async function createIssue(title, body) {
  const owner = "Testing-Staytuned";
  const repo = "onbording_member";
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
    console.log("Issue created:", data.node_id);
    return data.node_id;
  } catch (error) {
    console.error("Error creating issue:", error.message);
  }
}

async function addIssueToProject(IssueId) {
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

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: query }),
  });

  const data = await response.json();
  if (data.errors) {
    console.error(data.errors);
    throw new Error("Failed to add issue to project");
  }
  // get the response
  // console.log(data.data.node.items.nodes);
  return data.data.addProjectV2ItemById.item.id;
  // console.log("Issue added successfully:");
}

// addIssueToProject('I_kwDOLIkKI859RQip');

async function UpdateIssueEmailField(itemid, email) {
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

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: query }),
  });

  const data = await response.json();
  if (data.errors) {
    console.error(data.errors);
    throw new Error("Failed to add issue to project");
  }
  // get the response
  // console.log(data.data);
  console.log("Issue updated successfully:");
  return data.data;
}

// UpdateIssueEmailField(itemid);

async function getAllProject(org) {
  const token = tokn;
  const query = `
  query{
    organization(login: "${org}") {
      projectsV2(first: 20) {
        nodes {
          id
          title
        }
      }
    }
  }
  `;
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: query }),
  });

  const data = await response.json();
  if (data.errors) {
    console.error(data.errors);
    throw new Error("Failed to add issue to project");
  }
  // get the response
  console.log(data.data);
}

// getAllProject('Testing-Staytuned');

async function getAllProjectColumn(projectId) {
  const token = tokn;
  const query = `
  query{
    node(id: "${projectId}") {
      ... on ProjectV2 {
        fields(first: 20) {
          nodes {
            ... on ProjectV2FieldCommon {
              id
              name
            }
          }
        }
      }
    }
  }
  `;
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: query }),
  });

  const data = await response.json();
  if (data.errors) {
    console.error(data.errors);
    throw new Error("Failed to add issue to project");
  }
  // get the response
  console.log(data.data);
}

// getAllProjectColumn('PVT_kwDOCWJ_tM4Abm8s');

async function getAllProjectColumnValue(projectId) {
  const token = tokn;
  const query = `
  query{
    node(id: "${projectId}") {
      ... on ProjectV2 {
        items(last: 20) {
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
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: query }),
  });

  const data = await response.json();
  if (data.errors) {
    console.error(data.errors);
    throw new Error("Failed to add issue to project");
  }
  // get the response
  console.log(data.data);
  // console.log(data.data.node.items.nodes.length);
  for (let i = 0; i < data.data.node.items.nodes.length; i++) {
    console.log("--------------------");
    console.log("Item " + i);
    console.log("--------------------");
    console.log(data.data.node.items.nodes[i].id);
    console.log(data.data.node.items.nodes[i].content.id);
    console.log(data.data.node.items.nodes[i].content.title);
    console.log(data.data.node.items.nodes[i].content.body);
    console.log("--------------------");
  }
}

// getAllProjectColumnValue('PVT_kwDOCWJ_tM4Abm8s');
async function getOneProjectColumnValue(projectId, fieldId) {
  const token = tokn;
  const query = `
  query{
    node(id: "${projectId}") {
      ... on ProjectV2 {
        fields(first: 20) {
          nodes {
            ...on ProjectV2Field {
              id
              name
            }
          }
        }
      }
    }
  }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: query }),
  });

  const data = await response.json();
  if (data.errors) {
    console.error(data.errors);
    throw new Error("Failed to add issue to project");
  }
  // get the response
  console.log(data.data);
  // console.log(data.data.node.items.nodes.length);
  // for (let i = 0; i < data.data.node.items.nodes.length; i++) {
  //   if (data.data.node.items.nodes[i].content.id == issueid) {
      // console.log(data.data.node.items.nodes[i].email);
      // return i;
    // }
  // }
}

// getOneProjectColumnValue('PVT_kwDOCWJ_tM4Abm8s','PVTF_lADOCWJ_tM4Abm8szgRyoBg');


async function returnindexofissue(projectId, issueid) {
  const token = tokn;
  const query = `
  query{
    node(id: "${projectId}") {
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

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: query }),
  });

  const data = await response.json();
  if (data.errors) {
    console.error(data.errors);
    throw new Error("Failed to add issue to project");
  }
  // get the response
  console.log(data.data.node.items.nodes);
  // console.log(data.data.node.items.nodes.length);
  for (let i = 0; i < data.data.node.items.nodes.length; i++) {
    if (data.data.node.items.nodes[i].content.id == issueid) {
      // console.log(data.data.node.items.nodes[i].email);
      return i;
    }
  }
}

// returnindexofissue('PVT_kwDOCWJ_tM4Abm8s','I_kwDOLJ6B0s59YB7Y')
// .then(a => console.log(a));


async function linkProjectToTeam(projectId, teamId) {
  const token = tokn;
  const query = `
  mutation {
    addProjectV2Team(input: {projectId: "${projectId}", teamId: "${teamId}"}) {
      projectV2Team {
        id
      }
    }
  }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: query }),
  });

  const data = await response.json();
  if (data.errors) {
    console.error(data.errors);
    throw new Error("Failed to add issue to project");
  }
  // get the response
  console.log(data.data);
  // console.log(data.data.node.items.nodes.length);
  // for (let i = 0; i < data.data.node.items.nodes.length; i++) {
  //   if (data.data.node.items.nodes[i].content.id == issueid) {
  //     // console.log(i);
  //     return i;
  //   }
  // }
}

// linkProjectToTeam('PVT_kwDOCWJ_tM4Abm8s','T_kwDOCWJ_tM4AjwOG');

async function addteammember(org, team_slug, username){
  const token = tokn;
  const url = `https://api.github.com/orgs/${org}/teams/${team_slug}/memberships/${username}`;

  fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));
}

// addteammember('Testing-Staytuned','Engineering','abhiparate');
async function fetchGitHubUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

// fetchGitHubUser('username')
//   .then(userData => {
//     if (userData) {
//       console.log('User data:', userData);
//       console.log('Username:', userData.login);
//     } else {
//       console.log('User data not available.');
//     }
//   });

async function searchUsersByEmail(email) {
  const token = tokn;
  const apiUrl = `https://api.github.com/search/users?q=${email}+in:email`;

  const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
      }
  });

  if (!response.ok) {
      throw new Error(`Failed to search users: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data);
  return data.items; // Returns an array of user objects matching the email query
}

// searchUsersByEmail('nirnay01')
async function appendToIssueDescription( additionalContent) {
  const owner = "Testing-Staytuned";
  const repo = "onbording_member";
  const issueNumber = "45";
  const token = tokn;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;

  const existingDescription = await fetchCurrentDescription(owner, repo, issueNumber, token); // Fetch existing description

  const payload = {
    body: existingDescription + additionalContent // Append to existing content
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Failed to append content to issue description: ${response.statusText}`);
    }

    const responseData = await response.json();
    // console.log('Issue description updated successfully:', responseData); // Log success for clarity
    console.log('Issue description updated successfully');
    return responseData;
  } catch (error) {
    console.error('Error updating issue description:', error);
    throw error;
  }
}

async function fetchCurrentDescription(owner, repo, issueNumber, token) {
  
  const descriptionUrl = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;
  try {
    const descriptionResponse = await fetch(descriptionUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!descriptionResponse.ok) {
      throw new Error(`Failed to fetch issue description: ${descriptionResponse.statusText}`);
    }

    const issueData = await descriptionResponse.json();
    return issueData.body;
  } catch (error) {
    throw new Error(`Failed to fetch issue description: ${error.message}`);
  }
}

// appendToIssueDescription('- [ ] Added a new task\n');





export default {
  createIssue,
  addIssueToProject,
  UpdateIssueEmailField,
  getAllProject,
  getAllProjectColumn,
  getAllProjectColumnValue,
  returnindexofissue,
  linkProjectToTeam,
  addteammember,
  fetchGitHubUser,
  searchUsersByEmail,
  appendToIssueDescription,
};
