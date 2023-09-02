// Group-2
// Aarsh Parimal Patel - 200520260
// Daxil Ashishkumar Patel - 200520270
// Kunjesh Kantilal Ramani - 200515106
// Assignment - 4

// API key and base URLs
const apiKey = "af10ea7acbced6427e3ce5df54186ef8";
const apiBaseURL = "http://api.themoviedb.org/3/";
const imageBaseUrl = "https://image.tmdb.org/t/p/";
const nowPlayingURL = apiBaseURL + "movie/now_playing?api_key=" + apiKey;

$(document).ready(function () {
    // Function to render movies on the webpage
    function renderMovies(data) {
        const movieGrid = $("#movie-grid");
        movieGrid.empty(); // Clear the movie grid

        // Loop through each movie in the data and create HTML for it
        data.results.forEach(function (movie, i) {
            const poster = imageBaseUrl + "w300" + movie.poster_path;
            const html = `
                <div class="col-sm-3 eachMovie">
                    <button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal${i}" data-whatever="@${i}">
                        <img src="${poster}">
                    </button>
                </div>`;
            movieGrid.append(html); // Add the HTML to the movie grid
        });
    }

    // Function to fetch movies from a given URL and call the renderMovies function with the fetched data
    function fetchMovies(url, callback) {
        $.getJSON(url, function (data) {
            callback(data);
        });
    }

    // Fetch and render currently playing movies on page load
    fetchMovies(nowPlayingURL, renderMovies);

    // Handle the search form submission
    $(".searchForm").submit(function (event) {
        const searchTerm = $(".form-control").val();
        const searchMovieURL =
            apiBaseURL +
            "search/movie?api_key=" +
            apiKey +
            "&language=en-US&page=1&include_adult=false&query=" +
            searchTerm;

        // Fetch and render movies based on the search term
        fetchMovies(searchMovieURL, renderMovies);
        event.preventDefault(); // Prevent the default form submission behavior
    });
});
