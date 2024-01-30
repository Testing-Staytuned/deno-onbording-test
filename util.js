
const tokn = Deno.env.get("GITHUB_TOKEN");
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
          'Authorization': `Bearer ${tokn}`,
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
        // Authorization: `token ${tokn}`,
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


async function getTaskListFromIssue(owner, repo, issueNumber, token) {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;

  try {
      const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`Failed to fetch issue details: ${response.statusText}`);
      }

      const responseData = await response.json();
      const issueBody = responseData.body;
      // console.log('Issue details:', responseData);

      // Parse the issue body to extract the task list items
      const taskListItems = parseTaskListFromIssueBody(issueBody);

      return taskListItems;
  } catch (error) {
      console.error('Error fetching issue details:', error);
      throw error;
  }
}

function parseTaskListFromIssueBody(issueBody) {
  // Regular expression to match task list items
  // const taskRegex = /\s*\*\s*\[([ xX])\]\s*(.*)/g;
  const taskRegex = /-\s*\[([ xX])\]\s*(.*)/g;
  const taskListItems = [];

  let match;
  while ((match = taskRegex.exec(issueBody)) !== null) {
      const isChecked = match[1] !== ' ';
      const taskDescription = match[2].trim();
      taskListItems.push({ isChecked, description: taskDescription });
  }

  return taskListItems;
}

// Example usage:
const owner = 'Testing-Staytuned';
const repo = 'onbording_member';
const issueNumber = '45';

// getTaskListFromIssue(owner, repo, issueNumber, tokn)
//   .then(taskList => {
//       console.log('Task List Items:', taskList);
//   })
//   .catch(error => {
//       console.error('Error getting task list from issue:', error);
//   });


  import { config } from "https://deno.land/x/dotenv/mod.ts";

  // Load environment variables
  config({ export: true });
  
  // const GITHUB_API_TOKEN = Deno.env.get("GITHUB_API_TOKEN");
  const GITHUB_API_TOKEN = tokn;
  // const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
  // const EMAIL_FROM = "your@email.com";
  
  // Function to fetch issue comments
  async function fetchIssueComments(owner, repo, issueNumber) {
      // Make API call to fetch comments
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments`, {
          headers: {
              Authorization: `Bearer ${GITHUB_API_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
          },
      });
  
      if (!response.ok) {
          throw new Error(`Failed to fetch issue comments: ${response.statusText}`);
      }
  
      const comments = await response.json();
      console.log("Issue comments:", comments);
      return comments;
  }
  
  // Function to parse comments and identify selected users
  function parseComments(comments) {
      // Parse comments to identify selected and non-selected users
      const selectedUsers = [];
      const nonSelectedUsers = [];
  
      for (const comment of comments) {
          const userEmail = comment.user.email; // Replace with the correct field name based on GitHub API response
          const isUserSelected = comment.body.toLowerCase().includes("selected");
  
          if (isUserSelected) {
              selectedUsers.push({ email: userEmail });
          } else {
              nonSelectedUsers.push({ email: userEmail });
          }
      }
  
      return { selectedUsers, nonSelectedUsers };
  }
  
  // Function to send email notifications
  async function sendEmailNotification(msg) {
      // Send email using SendGrid or SMTP
      // Implement the email sending logic based on your preferred service
      // console.log(`Sending email to ${email}: ${subject}\n${body}`);
      console.log(`Sending email to ${msg}`);
  }
  
  // Main function to monitor comments and send notifications
  async function monitorIssueComments() {
      const owner = "Testing-Staytuned";
      const repo = "onbording_member";
      const issueNumber = 28;
  
      try {
          const comments = await fetchIssueComments(owner, repo, issueNumber);
          const { selectedUsers, nonSelectedUsers } = parseComments(comments);
  
          // Send email notifications to selected users
          for (const user of selectedUsers) {
              // await sendEmailNotification(user.email, "You are selected", "Congratulations! You have been selected.");
              await sendEmailNotification("You are selected");
          }
  
          // Send email notifications to non-selected users
          for (const user of nonSelectedUsers) {
              // await sendEmailNotification(user.email, "Not selected", "Thank you for your application.");
              await sendEmailNotification("Not selected");
          }
      } catch (error) {
          console.error("Error monitoring issue comments:", error);
      }
  }
  
  // Run the main function
  // monitorIssueComments();

async function getIssueComments(issueNumber) {
  const owner = "Testing-Staytuned";
  const repo = "onbording_member";
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`, {
    headers: {
      Authorization: `Bearer ${tokn}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch issue comments: ${response.statusText}`);
  }

  const comments = await response.json();
  // console.log("Issue comments:", comments);
  return comments;
}

async function getOneProjectColumnValue1(projectId,itemId) {
  const token = tokn;
  const query = `
  query{
    node(id: "${projectId}") {
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
    project: node(id: "${projectId}") {
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
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: query1 }),
  });

  const data = await response.json();
  if (data.errors) {
    console.error(data.errors);
    throw new Error("Failed to add issue to project");
  }
  // get the response
  console.log(data.data.item.fieldValueByName.text);
  return data.data.item.fieldValueByName.text;
}

// getOneProjectColumnValue1('PVT_kwDOCWJ_tM4Abm8s');

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
  getIssueComments,
  getOneProjectColumnValue1,
};
