let filmovi = [];

fetch('/movies.csv')
    .then(res => res.text())
    .then(csv => {
        const rezultat = Papa.parse(csv, {
            header: true,
            skipEmptyLines: true
        });

        filmovi = rezultat.data.map(film => ({
            title: film.Naslov,
            genre: film.Zanr,
            year: Number(film.Godina),
            duration: Number(film.Trajanje_min),
            rating: Number(film.Ocjena),
            director: film.Rezisery,
            country: film.Zemlja_porijekla
        }));

        prikaziTablicu(filmovi.slice(0, 150));
    })
    .catch(err => {
        console.error('Greška pri dohvaćanju CSV-a:', err);
    });

function prikaziTablicu(filmovi) {
    const tbody = document.querySelector('#filmovi-tablica tbody');
    tbody.innerHTML = '';

    for (const film of filmovi) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.year}</td>
            <td>${film.genre}</td>
            <td>${film.duration}</td>
            <td>${film.country}</td>
            <td>${film.rating}</td>
        `;

        tbody.appendChild(row);
    }
}