// Import the necessary Deno module
import { serve } from 'https://deno.land/std/http/server.ts';

// Create a server on port 3000
const server = serve({ port: 3000 });

console.log('Server is running ');

// Listen for incoming requests
for(const request of server) {
  // Serve the index.html file
  if (request.method === 'GET' && request.url === '/') {
    const html = await Deno.readTextFile('index.html');
    request.respond({ body: html, headers: new Headers({ 'Content-Type': 'text/html' }) });
  }
}
