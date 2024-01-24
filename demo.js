import { Gmail } from '@google-cloud/gmail';

const gmail = new Gmail({
  projectId: 'send-gmail-412206',
  keyFilename: 'API key 1',
});

const message = {
  from: 'nirnayraval20@gnu.ac.in',
  to: 'ravalnirnay@gmail.com',
  subject: 'Hello from Gmail API!',
  text: 'Hi! This is a test message from Gmail API!',
};

await gmail.users.messages.send({
  userId: 'nirnayraval20@gnu.ac.in',
  resource: message,
});
console.log('Message sent!');