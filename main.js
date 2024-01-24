import { opine, serveStatic } from "https://deno.land/x/opine/mod.ts";
// import { sendFile } from "https://deno.land/x/sendfile/mod.ts";

const app = opine();
const port = 3000;

// Serve static files (like index.html)
app.use(serveStatic(Deno.cwd()));
console.log("hi", Deno.cwd());
// Serve a specific page on a specific URL
// app.use("/Email-verify.html", async (req, res) => {
//   await sendFile(res, `${Deno.cwd()}/Email-verify.html`);
// });
console.log("hello");
app.use(async (req, res, next) => {
  console.log("above try");
  try {
    console.log("inside try");
    const url = new URL(`${req.url}`);
    console.log("url", url);
    const filePath = `${Deno.cwd()}${url.pathname}`;
    console.log("filePath", filePath);
    const fileContent = await Deno.readTextFile(filePath);
    console.log("hi1");
    console.log("fileContent", fileContent, "filePath", filePath, "url", url);
    res.status(200).type("text/html").send(fileContent);
  } catch (error) {
    next(error);
  }
  console.log("below try");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
console.log("bye");