import { opine, serveStatic, json } from "https://deno.land/x/opine/mod.ts";
import { opineCors } from "https://deno.land/x/cors/mod.ts";
import mailer from "./mailer.js";
import createIssue from "./util.js";

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
  try {
    const result = await createIssue(
      email,
      `Name: ${name} \n Message: ${message}`
    );
    if (result) {
      res.json({ email, name, message });
    }
    // res.json({ email, name, message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
