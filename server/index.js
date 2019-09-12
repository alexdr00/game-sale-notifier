const express = require('express');
const mysql = require('mysql');
const server = express();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'alex',
  // database: 'gsn_dev'
});

connection.query(`
  CREATE DATABASE newtest;
`, (err, result) => {
  if (err) throw err;
  console.log({result});
});

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('connected');
// });

server.listen(3000, () => {
  console.log('boiler plate server listening');
});
