const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');




const app = express();
const port = 5000;


app.use(bodyParser.json());
app.use(cors());


const connection = mysql.createConnection({
  
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'anshum1234',
    database: 'homework',
    port: 3306

});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});


const createTableQuery = `
  CREATE TABLE IF NOT EXISTS entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL
  )
`;
connection.query(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating table:', err);
  }
});


app.post('/api/submit', (req, res) => {
  const { name, age } = req.body;
  console.log(req.body);

  if (!name || !age) {
    return res.status(400).json({ message: 'Name and age are required.' });
  }

  const insertQuery = 'INSERT INTO entries (name, age) VALUES (?, ?)';
  connection.query(insertQuery, [name, age], (err) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Error saving data.' });
    }
    res.status(200).json({ message: 'Data saved successfully.' });
  });
});

// 
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
