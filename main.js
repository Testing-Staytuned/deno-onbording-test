import { opine, serveStatic } from "https://deno.land/x/opine/mod.ts";

const app = opine();
const port = 3000;

// Serve static files (like index.html)
app.use(serveStatic(Deno.cwd()));

// Serve a specific page on a specific URL
app.use("/Email-verify.html", async (req, res) => {
  await sendFile(res, `${Deno.cwd()}/Email-verify.html`);
});

app.listen(port, () => {
  console.log(`Server is running`);
});
