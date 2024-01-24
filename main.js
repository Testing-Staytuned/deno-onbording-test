// import { opine, serveStatic } from "https://deno.land/x/opine/mod.ts";

// const app = opine();
// const port = 3000;

// // Serve static files (like index.html)
// app.use(serveStatic(Deno.cwd()));

// // Serve a specific page on a specific URL
// app.use("/Email-verify.html", async (req, res) => {
//   await sendFile(res, `${Deno.cwd()}/Email-verify.html`);
// });

// app.listen(port, () => {
//   console.log(`Server is running`);
// });



import { serve } from "https://deno.land/std/http/server.ts";
import { readTextFile, readFile } from "https://deno.land/std/fs/mod.ts";

const server = serve({ port: 8000 });

console.log("Server running at http://localhost:8000/");

for await (const req of server) {
  if (req.url === "/") {
    const content = await readTextFile("index.html");
    await req.respond({ body: content, headers: new Headers({ "Content-Type": "text/html" }) });
  } else if (req.url === "/worker.js" || req.url === "/worker-script.js") {
    const content = await readTextFile(req.url.slice(1));
    await req.respond({ body: content, headers: new Headers({ "Content-Type": "application/javascript" }) });
  } else if (req.url === "/hello.wasm") {
    const content = await readFile(req.url.slice(1));
    await req.respond({ body: content, headers: new Headers({ "Content-Type": "application/wasm" }) });
  }
}