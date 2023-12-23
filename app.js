
const express = require('express');
const pdf = require('html-pdf');
const fs = require('fs');
const app = express();
const port = 5500;


const users = [
  { id: 1, name: 'Ayan Pathan' },
  { id: 2, name: 'Ayan Khan' },
  { id: 3, name: 'Mohammad AyanKhan Pathan' }
];


app.get('/api/users', (req, res) => {
  res.json(users);
});


app.get('/api/users/pdf', (req, res) => {
  // Convert user data to HTML
  const html = `<ul>${users.map(user => `<li>${user.name}</li>`).join('')}</ul>`;

 
  const options = { format: 'Letter' };

  pdf.create(html, options).toStream((err, stream) => {
    if (err) return res.status(500).send('Error generating PDF');

  
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=users.pdf');

  
    stream.pipe(res);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
