import { opine, serveStatic } from "https://deno.land/x/opine/mod.ts";
import { opineCors } from "https://deno.land/x/cors/mod.ts";
import mailer from "./mailer.js";

const app = opine();
const port = 3001;

// Enable CORS (for handling cross-origin requests)
app.use(opineCors({
  origin: "*", // Change this to your frontend origin in production
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
}));

app.options("/send-verification", (req, res) => {
  res.status(204).end();
});

// Serve static files (like index.html)
app.use(serveStatic(Deno.cwd()));

// Handle POST requests for sending verification
app.post("/send-verification", async (req, res) => {
  const { email, code } = req.query;
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
