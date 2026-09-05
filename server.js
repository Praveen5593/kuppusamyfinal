require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
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
  const { employee_id, name, position, department, location, email, mobile_number } = req.body;
  try {
    await db.query(
      'INSERT INTO users (employee_id, name, position, department, location, email, mobile_number) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [employee_id, name, position, department, location, email, mobile_number]
    );
    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:employee_id', async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE employee_id = ?', [req.params.employee_id]);
    res.json({ message: 'User removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
