
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'library',
});

app.listen(8080, () => {
    console.log('Connected to Backend!');
  });
  
  app.get('/', (req, res) => {
    res.json('Hello, this is backend');
  });

  app.get('/books', (req, res) => {
    const q = 'SELECT * from librarysearch';
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });

  app.post('/addBook', (req, res) => {
    const { id, book, issuedate } = req.body;
    const q = 'INSERT INTO librarysearch (id, book, issuedate) VALUES (?, ?, ?)';
    db.query(q, [id, book, issuedate], (err, result) => {
      if (err) return res.json(err);
      return res.json({ message: 'Book added successfully!', id: result.insertId });
    });
  });
  

  app.delete('/deleteBook/:id', (req, res) => {
    const bookId = req.params.id;
    const q = 'DELETE FROM librarysearch WHERE id = ?';
    db.query(q, [bookId], (err, result) => {
      if (err) return res.json(err);
      if (result.affectedRows === 0) {
        return res.json({ message: 'Book not found!' });
      } else {
        return res.json({ message: 'Book deleted successfully!' });
      }
    });
  });

    app.put('/updateBook/:id', (req, res) => {
    const bookId = req.params.id;
    const { book, issuedate } = req.body;
    const q = 'UPDATE librarysearch SET book = ?, issuedate = ? WHERE id = ?';
    db.query(q, [book, issuedate, bookId], (err, result) => {
      if (err) return res.json(err);
      if (result.affectedRows === 0) {
        return res.json({ message: 'Book not found!' });
      } else {
        return res.json({ message: 'Book updated successfully!' });
      }
    });
  });
