import { opine, serveStatic } from "https://deno.land/x/opine/mod.ts";
// import { sendFile } from "https://deno.land/x/sendfile/mod.ts";

const app = opine();
const port = 3000;

// Serve static files (like index.html)
app.use(serveStatic(Deno.cwd('index.html')));


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
