const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'myuser',
  password: 'mypassword123',
  database: 'fullstack_db'
}).promise();

app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  const { name, email, department } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO users (name, email, department) VALUES (?, ?, ?)',
      [name, email, department]
    );
    res.status(201).json({ message: 'User added successfully', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
