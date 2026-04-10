const express = require('express'); // Uvoz Express frameworka
const path = require('path'); // Uvoz modula path za rad s putanjama datoteka
const fs=require('fs'); // Uvoz modula fs za rad s datotekama

const app = express(); // Inicijalizacija Express aplikacije
const PORT = process.env.PORT || 3000; // Postavljanje porta na kojem će server slušati

// Poslužuje sve statičke datoteke iz mape public
app.use(express.static(path.join(__dirname,  'public')));
app.set('view engine', 'ejs'); // Postavljanje EJS kao templating enginea
app.set('views', path.join(__dirname, 'views')); // Postavljanje direktorija za EJS predloške

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/slike', (req, res) => {
  const folderPath = path.join(__dirname, 'public', 'images');
  const files=fs.readdirSync(folderPath); // Čitanje svih datoteka u mapi images

  const images = files
    /*.filter(file =>
      file.endsWith('.jpg') ||
      file.endsWith('.jpeg') ||
      file.endsWith('.png') ||
      file.endsWith('.svg') ||
      file.endsWith('.webp')
    )*/
    .map((file, index) => ({
      url: `/images/${file}`,
      id: `slika${index + 1}`,
      title: `Slika ${index + 1}`
    }));

  res.render('slike', { images }); // Renderiranje EJS predloška 'slike' i prosljeđivanje niza slika
});

app.get('/grafikon', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'grafikon.html'));
});

app.listen(PORT, () => {
  console.log(`Server je pokrenut na http://localhost:${PORT}`);
});