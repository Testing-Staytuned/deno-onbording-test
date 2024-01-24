import { opine, serveStatic } from "https://deno.land/x/opine/mod.ts";

const app = opine();
const port = 3000;

// Serve static files (like index.html)
app.use(serveStatic(Deno.cwd()));

app.listen(port, () => {
  console.log(`Server is running`);
});
