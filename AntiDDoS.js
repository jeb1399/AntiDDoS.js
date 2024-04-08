const { spawn } = require('child_process');
const express = require('express');
const rateLimit = require('express-rate-limit');
const fs = require('fs');

console.log("This is a very SIMPLE DDoS protection node and will not protect against ALL DDoS attacts");

const startCrashHandler = () => {
  const crashHandler = spawn('node', ['AntiDDoSCrashHandler.js']);

  crashHandler.stdout.on('data', (data) => {
    console.log(`Crash handler output: ${data}`);
  });

  crashHandler.stderr.on('data', (data) => {
    console.error(`Crash handler error: ${data}`);
  });

  crashHandler.on('close', (code) => {
    console.log(`Crash handler exited with code ${code}`);
  });
};

startCrashHandler();

const app = express();

const limiter = rateLimit({
  windowMs: 5 * 1000,
  max: 20,
  message: 'Too many requests from this IP, please try again later.',
  onLimitReached: (req, res, options) => {
    const blockedIP = req.ip;
    const currentTime = new Date().getTime();
    const blockTime = currentTime + 5 * 60 * 1000;
    const data = `${blockedIP},${blockTime}\n`;
    fs.appendFile('blocked-ips.txt', data, (err) => {
      if (err) console.error('Error saving blocked IP:', err);
    });
  }
});

app.use(limiter);

app.get('/', (req, res) => {
  res.send('This node is protected! [Node.js AntiDDoS]');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
