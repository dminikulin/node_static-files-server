/* eslint-disable no-shadow */
'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs');

function createServer() {
  /* Write your code here */
  // Return instance of http.Server class
  return http.createServer((req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const normalizedPath = pathname.replace('/file', '') || 'index.html';
    const pathToFile = path.join(__dirname, '..', 'public', normalizedPath);

    res.setHeader('Content-Type', 'text/plain');

    if (!pathname.startsWith('/file')) {
      res.statusCode = 400;
      res.end('Routes not starting with /file/');

      return;
    }

    if (pathname.includes('//')) {
      res.statusCode = 404;
      res.end('Paths having duplicated slashes');

      return;
    }

    fs.readFile(pathToFile, 'utf-8', (err, file) => {
      if (err) {
        res.statusCode = 404;
        res.end('Non-existent files');

        return;
      }
      res.statusCode = 200;
      res.end(file);
    });
  });
}

module.exports = {
  createServer,
};
