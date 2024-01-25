import { opine, serveStatic, applyMiddleware } from "https://deno.land/x/opine/mod.ts";
import { CorsMiddleware } from "https://deno.land/x/oak_cors/mod.ts"; // Use CorsMiddleware from oak_cors

import mailer from "./mailer.js";

const app = opine();
const port = 3001;

// Enable CORS for all origins (adjust for production)
app.use(applyMiddleware(CorsMiddleware()));

// Parse request body
app.use(opine.bodyParser.json());

// Serve static files (like index.html)
app.use(serveStatic(Deno.cwd()));

// Handle POST requests for sending verification (with authentication)
app.post("/send-verification", async (req, res) => {
  try {
    // Check for authentication (replace with your logic)
    if (!isValidAuthentication(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { email, code } = req.body; // Access data from parsed request body

    const result = await mailer(email, code);
    res.json({ email, code });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
