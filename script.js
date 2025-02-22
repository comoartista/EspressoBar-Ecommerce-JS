const global = {
    currentPage: window.location.pathname,
    search: {
      term: "",
      type: "",
      page: 1,
      totalPage: 1,
    },
    api: {
      apiKey: "49698193689778cb4a7c64f03cd0019c",
      apiUrl: "https://api.themoviedb.org/3/",
    },
  };
  
  //Display 20 most popular movies
  async function displayPopularMovies() {
    const { results } = await fetchAPIData("movie/popular");
    results.forEach((movie) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
           <div class="card">
           <a href="movie-details.html?id=${movie.id}">
           ${
             movie.poster_path
               ? `<img
                      src="http://image.tmdb.org/t/p/w500${movie.poster_path}"
                          class="card-img-top"
                          alt="${movie.title}"
                       />`
               : `<img
                       src="../images/no-images.jpg"
                           class="card-img-top"
                           alt="${movie.title}"
                        />`
           }
           </a>
           <div class="card-body">
             <h5 class="card-title">${movie.title}</h5>
             <p class="card-text">
               <small class="text-muted">Release: ${movie.release_date}</small>
             </p>
           </div>
         </div>
           `;
  
      document.getElementById("popular-movies").append(div);
    });
  }
  
  //Display 20 most popular TVShows
  async function displayPopularTVShows() {
    const { results } = await fetchAPIData("tv/popular");
    results.forEach((show) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
             <div class="card">
             <a href="tv-details.html?id=${show.id}">
             ${
               show.poster_path
                 ? `<img
                        src="http://image.tmdb.org/t/p/w500${show.poster_path}"
                            class="card-img-top"
                            alt="${show.name}"
                         />`
                 : `<img
                         src="../images/no-images.jpg"
                             class="card-img-top"
                             alt="${show.title}"
                          />`
             }
             </a>
             <div class="card-body">
               <h5 class="card-title">${show.name}</h5>
               <p class="card-text">
                 <small class="text-muted">Air Date: ${
                   show.first_air_date
                 }</small>
               </p>
             </div>
           </div>
             `;
  
      document.getElementById("popular-shows").append(div);
    });
  }
  
  //Display Movie Details
  async function displayMovieDetails() {
    const movieId = window.location.search.split("=")[1];
    const movie = await fetchAPIData(`movie/${movieId}`);
  
    //Overlay for bg image
    displayBackgroundImage("movie", movie.backdrop_path);
  
    const div = document.createElement("div");
  
    div.innerHTML = `
    <div class="details-top">
    <div>
      ${
        movie.poster_path
          ? `<img
                        src="http://image.tmdb.org/t/p/w500${movie.poster_path}"
                            class="card-img-top"
                            alt="${movie.title}"
                         />`
          : `<img
                         src="../images/no-images.jpg"
                             class="card-img-top"
                             alt="${movie.title}"
                          />`
      }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)}
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genre</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
      </ul>
      <a href="${
        movie.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
        movie.budget
      )}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
        movie.revenue
      )}</li>
      <li><span class="text-secondary">Runtime:</span> ${
        movie.runtime
      } minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join(", ")}</div>
  </div>
    `;
    document.getElementById("movie-details").appendChild(div);
  }
  
  //Display Show Details
  async function displayShowDetails() {
    const showId = window.location.search.split("=")[1];
    const show = await fetchAPIData(`tv/${showId}`);
  
    //Overlay for bg image
    displayBackgroundImage("tv", show.backdrop_path);
  
    const div = document.createElement("div");
  
    div.innerHTML = `
      <div class="details-top">
      <div>
        ${
          show.poster_path
            ? `<img
                          src="http://image.tmdb.org/t/p/w500${show.poster_path}"
                              class="card-img-top"
                              alt="${show.name}"
                           />`
            : `<img
                           src="../images/no-images.jpg"
                               class="card-img-top"
                               alt="${show.name}"
                            />`
        }
      </div>
      <div>
        <h2>${show.name}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${show.vote_average.toFixed(1)}
        </p>
        <p class="text-muted">Release Date: ${show.last_air_date}</p>
        <p>
          ${show.overview}
        </p>
        <h5>Genre</h5>
        <ul class="list-group">
          ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
        </ul>
        <a href="${
          show.homepage
        }" target="_blank" class="btn">Visit Movie Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>Show Info</h2>
      <ul>
        <li><span class="text-secondary">Number of Episodes:</span> ${
          show.number_of_episodes
        }</li>
        <li><span class="text-secondary">Last Episode To Air:</span> ${
          show.last_episode_to_air.name
        }</li>
        <li><span class="text-secondary">Status:</span> ${show.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">${show.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(", ")}</div>
    </div>
      `;
    document.getElementById("show-details").appendChild(div);
  }
  
  //Display Backdrop on Details Page
  function displayBackgroundImage(type, bgPath) {
    const overlayDiv = document.createElement("div");
    overlayDiv.style.backgroundImage = `url(http://image.tmdb.org/t/p/original/${bgPath})`;
    overlayDiv.style.backgroundSize = "cover";
    overlayDiv.style.backgroundPosition = "center";
    overlayDiv.style.backgroundRepeat = "no-repeat";
    overlayDiv.style.height = "100vh";
    overlayDiv.style.width = "100vw";
    overlayDiv.style.position = "absolute";
    overlayDiv.style.top = "0";
    overlayDiv.style.left = "0";
    overlayDiv.style.zIndex = "-1";
    overlayDiv.style.opacity = "0.1";
  
    if (type === "movie") {
      document.querySelector("#movie-details").appendChild(overlayDiv);
    } else {
      document.querySelector("#show-details").appendChild(overlayDiv);
    }
  }
  
  //Search Movie/Show
  async function search() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    global.search.type = urlParams.get("type");
    global.search.term = urlParams.get("search-term");
  
    if (global.search.term !== "" && global.search.term !== null) {
      const {results, total_pages, page} = await searchAPIData();
  
      if(results.length === 0) {
          showAlert();
      }
      console.log(results);
    } else {
      showAlert("Please enter a search term");
    }
  }
  
  //Display Slider Movies
  async function displaySlider() {
    const { results } = await fetchAPIData("movie/now_playing");
    results.forEach((movie) => {
      const div = document.createElement("div");
      div.classList.add("swiper-slide");
      div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
        movie.title
      }" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
          1
        )}/ 10
      </h4>
   `;
  
      document.querySelector(".swiper-wrapper").appendChild(div);
  
      initSwiper();
    });
  }
  
  function initSwiper() {
    const swiper = new Swiper(".swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        500: {
          slidesPerView: 2,
        },
        700: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
  }
  //Fetch data from TMDB API
  async function fetchAPIData(endpoint) {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;
  
    showSpinner();
    const res = await fetch(
      `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );
  
    const data = await res.json();
    hideSpinner();
    return data;
  }
  
  //Make Request to a Search
  async function searchAPIData() {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;
  
    showSpinner();
    const res = await fetch(
      `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.team}`
    );
  
    const data = await res.json();
    hideSpinner();
    return data;
  }
  
  function showSpinner() {
    document.querySelector(".spinner").classList.add("show");
  }
  
  function hideSpinner() {
    document.querySelector(".spinner").classList.remove("show");
  }
  //Highlight active link
  function highlightActiveLink() {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      if (link.getAttribute("href") === global.currentPage) {
        link.classList.add("active");
      }
    });
  }
  
  //Show Alert
  function showAlert(message, className) {
    const alertEl = document.createElement("div");
    alertEl.classList.add("alert", className);
    alertEl.appendChild(document.createTextNode(message));
    document.querySelector("#alert").appendChild(alertEl);
  
    setTimeout(() => alertEl.remove(), 3000);
  }
  
  function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  //Init App
  function init() {
    switch (global.currentPage) {
      case "/":
      case "/index.html":
        displaySlider();
        displayPopularMovies();
  
        break;
      case "/shows.html":
        displayPopularTVShows();
        break;
      case "/movie-details.html":
        displayMovieDetails();
        break;
      case "/tv-details.html":
        displayShowDetails();
        break;
      case "/search.html":
        search();
        break;
    }
    highlightActiveLink();
  }
  
  document.addEventListener("DOMContentLoaded", init);