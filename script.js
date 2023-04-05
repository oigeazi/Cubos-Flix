const movies = document.querySelector('.movies');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let pages = [];
let page = 0
async function loadCarousel(page) {
    movies.innerHTML = '';
    try {
        const response = await api.get(`/discover/movie?language=pt-BR&include_adult=false`, {});

        loadPoster(page, response);
        openModal();
    } catch (error) {

    };
};
loadCarousel(page);

function loadPoster(page, response) {
    const result = response.data.results.map(posterMovie => {
        const movie = document.createElement('div');
        movie.classList.add('movie');
        movie.id = posterMovie.id;
        movie.style.backgroundImage = `url(${posterMovie.poster_path})`;

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie__info');
        movie.appendChild(movieInfo);

        const movieTitle = document.createElement('span');
        movieTitle.classList.add('movie__title');
        movieTitle.textContent = posterMovie.title;
        movieInfo.appendChild(movieTitle);

        const movieRating = document.createElement('span');
        movieRating.classList.add('movie__rating');
        movieRating.textContent = parseFloat(posterMovie.vote_average).toFixed(1);
        movieInfo.appendChild(movieRating);

        const star = document.createElement('img');
        star.src = './assets/estrela.svg';
        star.alt = 'Estrela';
        movieRating.appendChild(star);

        return movie;
    });

    for (let i = 0; i < result.length; i += 6) {
        pages.push(result.slice(i, i + 6));
    };

    pages[page].forEach(posterMovie => {
        movies.appendChild(posterMovie);
    });
};

btnNext.addEventListener('click', (event) => {
    event.preventDefault();
    if (page === 2) {
        page = 0;
    } else {
        page++;
    };
    loadCarousel(page);
});

btnPrev.addEventListener('click', (event) => {
    event.preventDefault();
    if (page === 0) {
        page = 2;
    } else {
        page--;
    };
    loadCarousel(page);
});

const input = document.querySelector('.input');

async function searchMovie(value) {
    try {
        const response = await api.get(`/search/movie?language=pt-BR&include_adult=false&query=${value}`, {});
        pages = []
        loadPoster(page, response);
        openModal();
    } catch (error) {

    };
};

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && input.value) {
        movies.innerHTML = '';
        page = 0;
        searchMovie(input.value);
        input.value = '';
    } else if (event.key === 'Enter' && !input.value) {
        page = 0;
        pages = [];
        loadCarousel(page);
    };
});

async function loadHighlight() {
    try {
        const response = await api.get(`/movie/436969?language=pt-BR`, {});
        const responseVideo = await api.get(`/movie/436969/videos?language=pt-BR`, {});

        const highlightVideo = document.querySelector('.highlight__video');
        highlightVideo.style.backgroundImage = `url(${response.data.backdrop_path})`;

        const highlightTitle = document.querySelector('.highlight__title');
        highlightTitle.textContent = response.data.title;

        const highlightRating = document.querySelector('.highlight__rating');
        highlightRating.textContent = parseInt(response.data.vote_average).toFixed(1);

        const highlightGenres = document.querySelector('.highlight__genres');
        const genres = response.data.genres.map(genre => genre.name);
        highlightGenres.textContent = genres.join(', ');

        const highlightLaunch = document.querySelector('.highlight__launch');
        highlightLaunch.textContent = new Date(response.data.release_date).toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
        });

        const highlightDescription = document.querySelector('.highlight__description');
        highlightDescription.textContent = response.data.overview;

        const highlightVideoLink = document.querySelector('.highlight__video-link');
        highlightVideoLink.href = `https://www.youtube.com/watch?v=${responseVideo.data.results[0].key}`
    } catch (error) {

    }
};
loadHighlight();

const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('.modal__title');
const modalImg = document.querySelector('.modal__img');
const modalDescription = document.querySelector('.modal__description');
const modalGenres = document.querySelector('.modal__genres');
const modalAverag = document.querySelector('.modal__average');

function openModal() {
    const allmovies = document.querySelectorAll('.movie');

    for (let movie of allmovies) {
        movie.addEventListener('click', (event) => {
            modal.classList.remove('hidden');
            loadModal(movie);
        });
    };

    modal.addEventListener('click', (event) => {
        modal.classList.add('hidden');
        modalGenres.innerHTML = '';
    });
};

async function loadModal(movie) {
    try {
        const response = await api.get(`movie/${movie.id}?language=pt-BR`, {});

        modalTitle.textContent = response.data.title;
        modalImg.src = `${response.data.backdrop_path}`;
        modalDescription.textContent = response.data.overview;
        modalAverag.textContent = parseFloat(response.data.vote_average).toFixed(1);

        for (let i = 0; i < response.data.genres.length && i <= 4; i++) {
            const spanGenre = document.createElement('span');
            spanGenre.classList.add('modal__genre');
            spanGenre.textContent = response.data.genres[i].name;
            modalGenres.appendChild(spanGenre);
        };
    } catch (error) {

    };
};