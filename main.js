import { opine, serveStatic ,json} from "https://deno.land/x/opine/mod.ts";
import { opineCors } from "https://deno.land/x/cors/mod.ts";
import mailer from "./mailer.js";

// Create a new Opine application
const app = opine();

// Set up middleware
app.use(serveStatic(Deno.cwd())); // Serve static files
// app.use(opineCors()); // Enable CORS
// app.use(json()); // Enable JSON parsing
app.use(opineCors({
  origin: 'https://deno-onbording-test.deno.dev'
}));
// Set up routes
app.post("/send-verification", sendVerification);

// Start the server
app.listen(3001, () => console.log(`Server is running at http://localhost:3001`));

// Handler for sending verification
async function sendVerification(req, res) {
  const { email, code } = req.query;
  try {
    const result = await mailer(email, code);
    res.json({ email, code });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}