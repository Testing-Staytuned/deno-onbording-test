import { opine, serveStatic, json } from "https://deno.land/x/opine/mod.ts";
import { opineCors } from "https://deno.land/x/cors/mod.ts";
import mailer from "./mailer.js";
// import mailer_msg from "./mailer.js";
import util from "./util.js";

const {
  createIssue,
  addIssueToProject,
  UpdateIssueEmailField,
  // getAllProject,
  // getAllProjectColumn,
  // getAllProjectColumnValue,
  // returnindexofissue,
  // linkProjectToTeam,
  // addteammember,
  // fetchGitHubUser,
  // searchUsersByEmail,
  appendToIssueDescription,
} = util;

// Create a new Opine application
const app = opine();

// Set up middleware
app.use(serveStatic(Deno.cwd())); // Serve static files
app.use(opineCors()); // Enable CORS
app.use(json());
// app.use(json()); // Enable JSON parsing
app.use(
  opineCors({
    origin: "https://deno-onbording-test.deno.dev", // replace with your allowed origin
  })
);
// Set up routes
app.post("/send-verification", sendVerification);
app.post("/send-email", sendemail);
app.post("/webhook", (req, res) => {
  const payload = req.body; // Access parsed body with req.body
  webhook(payload);
});

// Start the server
app.listen(3001, () =>
  console.log(`Server is running at http://localhost:3001`)
);

// Handler for sending verification
async function sendVerification(req, res) {
  const { email, code } = req.query;
  console.log(email, code);
  try {
    const result = await mailer(email, code);
    res.json({ email, code });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Handler for sending verification
async function sendemail(req, res) {
  const { email, name, message } = req.body;
  console.log(email, name, message);
  try {
    const result = await createIssue(
      name,
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    );
    if (result) {
      const result2 = await addIssueToProject(result);
      // console.log("result:",result);
      if (result2) {
        console.log("result2:",result2);
          UpdateIssueEmailField(result2, email).then(() => {
            console.log("Done!!!!!!!!!!!!");
            res.json({ email, name, message });
          });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function webhook(payload) {
  if (payload.issue.state === "open") {
    // console.log("Received GitHub webhook payload:", payload.comment.body);
    if (payload.comment.body === "send"){
      console.log("Received GitHub webhook payload:", payload.comment.body);
      const id = payload.issue.html_url;
      // console.log("id:", id);
      appendToIssueDescription(id).then(() => {
        console.log("Done!!!!!!!!!!!!");
      });
    }
  }
}
