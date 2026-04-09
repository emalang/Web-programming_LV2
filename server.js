const express = require('express'); // Uvoz Express frameworka
const path = require('path'); // Uvoz modula path za rad s putanjama datoteka

const app = express(); // Inicijalizacija Express aplikacije
const PORT = process.env.PORT || 3000; // Postavljanje porta na kojem će server slušati

// Poslužuje sve statičke datoteke iz mape public
app.use(express.static(path.join(__dirname,  'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server je pokrenut na http://localhost:${PORT}`);
});