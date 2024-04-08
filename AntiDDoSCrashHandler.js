const { exec } = require('child_process');

const startOriginalServer = () => {
  exec('node AntiDDoS.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting original server: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error starting original server: ${stderr}`);
      return;
    }
    console.log(`Original server started successfully: ${stdout}`);
  });
};

const checkOriginalServer = () => {
  exec('ps aux | grep AntiDDoS.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error checking original server: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error checking original server: ${stderr}`);
      return;
    }
    if (!stdout.includes('AntiDDoS.js')) {
      console.log('Original server is not running. Starting it now...');
      startOriginalServer();
    }
  });
};

setInterval(checkOriginalServer, 5000);

console.log('Anti DDoS Crash Handler is running...');
