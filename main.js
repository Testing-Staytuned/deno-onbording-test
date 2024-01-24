import { opine, serveStatic } from "https://deno.land/x/opine/mod.ts";
// import { sendFile } from "https://deno.land/x/sendfile/mod.ts";

const app = opine();
const port = 3000;

// Serve static files (like index.html)
app.use(serveStatic(Deno.cwd()));

// Serve a specific page on a specific URL
// app.use("/Email-verify.html", async (req, res) => {
//   await sendFile(res, `${Deno.cwd()}/Email-verify.html`);
// });
app.use(async (req, res, next) => {
  try {
    const url = new URL(`${req.url}`);
    const filePath = `${Deno.cwd()}${url.pathname}`;
    const fileContent = await Deno.readTextFile(filePath);

    res.status(200).type("text/html").send(fileContent);
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
