#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "node $DIR/AntiDDoS.js &" >> ~/.bashrc
npm install express express-rate-limit fs
node AntiDDoS.js
