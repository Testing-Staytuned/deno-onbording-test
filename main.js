import { opine, serveStatic } from "https://deno.land/x/opine/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts"; // Use oakCors for compatibility
import mailer from "./mailer.js";

const app = opine();
const port = 3001;

// Enable CORS for all origins (for development, adjust for production)
app.use(oakCors());

// Serve static files (like index.html)
app.use(serveStatic(Deno.cwd()));

// Handle POST requests for sending verification (with authentication)
app.post("/send-verification", async (req, res) => {
  // Check for authentication (replace with your logic)
  if (!isValidAuthentication(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { email, code } = req.body; // Get data from request body

  try {
    const result = await mailer(email, code);
    res.json({ email, code });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
