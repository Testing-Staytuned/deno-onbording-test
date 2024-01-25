import { opine, serveStatic } from "https://deno.land/x/opine/mod.ts";
import { opineCors } from "https://deno.land/x/cors/mod.ts";
import mailer from "./b.js";

const app = opine();
const port = 3000;

// Enable CORS (for handling cross-origin requests)
app.use(opineCors());

// Serve static files (like index.html)
app.use(serveStatic(Deno.cwd()));

// Handle POST requests for sending verification
app.post("/send-verification", async (req, res) => {
  const { email, code } = req.query;
  console.log(email, code);
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
