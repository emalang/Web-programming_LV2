let sviFilmovi = [];

fetch('/movies.csv')
    .then(res => res.text())
    .then(csv => {
        const rezultat = Papa.parse(csv, {
            header: true,
            skipEmptyLines: true
        });

        sviFilmovi = rezultat.data.map(film => ({
            title: film.Naslov,
            year: Number(film.Godina),
            genre: film.Zanr,
            duration: Number(film.Trajanje_min),
            country: film.Zemlja_porijekla,
            avg_vote: Number(film.Ocjena)
        }));

        prikaziPocetneFilmove(sviFilmovi.slice(0, 20));
        prikaziFiltriraneFilmove([]);

        //prikaziTablicu(filmovi.slice(0, 150));
    })
    .catch(err => {
        console.error('Greška pri dohvaćanju CSV-a:', err);
    });

/*function prikaziTablicu(filmovi) {
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
}?*/

function prikaziPocetneFilmove(filmovi) {
    const tbody = document.querySelector('#filmovi-tablica tbody');
    tbody.innerHTML = '';

    for (const film of filmovi) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.year}</td>
            <td>${film.genre}</td>
            <td>${film.duration} min</td>
            <td>${film.country}</td>
            <td>${film.avg_vote}</td>
        `;

        tbody.appendChild(row);
    }
}

const rangeInput = document.getElementById('filter-rating');
const ratingDisplay = document.getElementById('rating-value');

rangeInput.addEventListener('input', () => {
        ratingDisplay.textContent = rangeInput.value;
});

function filtriraj() {
    const zanr = document.getElementById('filter-genre').value.trim().toLowerCase();
    const godinaOd = parseInt(document.getElementById('filter-year-from').value);
    const drzava = document.getElementById('filter-country').value.trim().toLowerCase();
    const ocjena = parseFloat(document.getElementById('filter-rating').value);

    const filtriraniFilmovi = sviFilmovi.filter(film => {
        const zanrMatch = !zanr || film.genre.toLowerCase().includes(zanr);
        const godinaMatch = !godinaOd || film.year >= godinaOd;
        const drzavaMatch = !drzava || film.country.toLowerCase().includes(drzava);
        const ocjenaMatch = film.avg_vote >= ocjena;

        return zanrMatch && godinaMatch && drzavaMatch && ocjenaMatch;
    });

    prikaziFiltriraneFilmove(filtriraniFilmovi);
}

document.getElementById('primijeni-filtere').addEventListener('click', filtriraj);

function prikaziFiltriraneFilmove(filmovi) {
    const tbody = document.querySelector('#filtriranje_tablica tbody');

    tbody.innerHTML = '';

    if (filmovi.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">Nema filmova za odabrane filtre.</td></tr>';
        return;
    }

    for (const film of filmovi) {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.year}</td>
            <td>${film.genre}</td>
            <td>${film.duration} min</td>
            <td>${Array.isArray(film.country) ? film.country.join(', ') : film.country}</td>
            <td>${film.avg_vote}</td>
        `;

        tbody.appendChild(row);
    }
}