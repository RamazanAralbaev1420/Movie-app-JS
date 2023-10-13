

const API_KEY = "23b82765-8b80-45f7-93fe-07e2a584f68a";
const API_URL_POPULAR =
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
    "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";


getMovies(API_URL_POPULAR)
async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMovies(respData)
    generateRating(respData)
    console.log(respData)
}

function showMovies(data) {
    const moviesEl = document.querySelector('.movies');

    document.querySelector('.movies').innerHTML = ''

    data.films.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="movie__cover-inner">
                <img 
                    src=${movie.posterUrlPreview}
                    class="movie__cover"
                    alt="" 
                />      
                <div class="movie__inner--darkened">
                </div>
            </div>
            <div class="movie__info">
                <div class="movie__title">${movie.nameRu}</div>
                <div class="movie__category">${movie.genres.map((genre) => ` ${genre.genre}` )}</div>
                <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating.slice(0,1)}</div>
            </div>
        `
        moviesEl.append(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 7) {
        return 'green'
    } else if(vote > 5){
        return 'orange'
    } else {
        return 'red'
    }
}

const form = document.querySelector('form')
const search = document.querySelector('.header__search')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`

    if(search.value) {
        getMovies(apiSearchUrl)
        search.value = ''
    }




})
