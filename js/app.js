var spotifyButton = document.getElementById('spotify-button');
var showMoreButton = document.getElementById('show-more-button');
var omdbButton = document.getElementById('omdb-button');

// usrSelection.selectedOptions[0].value

// Spotify Lightbox file called
function SpotifyLightbox (items, itemIndexNumber, itemImage, itemName) {
  var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if(xhr.status === 200) {
      // Example 2 for project's hand in notes
      $('.lightbox').html(xhr.responseText);
      var playlistCover = '<img src="' + itemImage + '" alt="' + itemName + '">';
      function playlistInfo() {
        var playlistInformation = '<table><tbody>';
        playlistInformation += '<tr><td>Playlist:</td><td>' + items[itemIndexNumber].name + '</td></tr>';
        playlistInformation += '<tr><td>Tracks:</td><td>' + items[itemIndexNumber].tracks.total + '</td></tr>';
        playlistInformation += '<tr><td colspan="2" class="open"><a href="' + items[itemIndexNumber].external_urls.spotify + '">Open in Spotify</a></td></tr>';
        playlistInformation += '</tbody></table>';
        return playlistInformation;
      }

      $('#the-image').html(playlistCover);
      $('#preview-txt').html(playlistInfo());

      $('#preview-prev').click(function() {
        itemIndexNumber --;
        if(itemIndexNumber === -1 ) {
          itemIndexNumber = items.length - 1;
          playlistCover = '<img src="' + items[itemIndexNumber].images[0].url + '" alt="' + items[itemIndexNumber].name + '">';
        } else {
          playlistCover = '<img src="' + items[itemIndexNumber].images[0].url + '" alt="' + items[itemIndexNumber].name + '">';
        }
        $('#the-image').html(playlistCover);
        $('#preview-txt').html(playlistInfo());
      });

      $('#preview-next').click(function() {
        itemIndexNumber ++;
        if(itemIndexNumber === items.length) {
          itemIndexNumber = 0;
        }
        playlistCover = '<img src="' + items[itemIndexNumber].images[0].url + '" alt="' + items[itemIndexNumber].name + '">';
        $('#the-image').html(playlistCover);
        $('#preview-txt').html(playlistInfo());
      });

      $('#close-icon').click(function() {
        $('.overlay').remove();
      });
    }
  }
};
xhr.open('GET', 'lightbox.html');
xhr.send();
}

// OMDB Lightbox file called
function omdbLightbox (items, itemIndexNumber, itemImage, itemName) {
  var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if(xhr.status === 200) {
      // Example 2 for project's hand in notes
      var moviePoster;
      $('.lightbox').html(xhr.responseText);
      if(itemImage !== "N/A" || xhr.status !== 403) {
        moviePoster = '<img src="' + itemImage + '" alt="' + itemName + '">';
      } else {
        moviePoster = '<img src="assets/images/no-poster.jpg" alt="">';
      }
      function movieInfo() {
        var movieInformation = '<table><tbody>';
        movieInformation += '<tr><td>Movie Name:</td><td>' + items[itemIndexNumber].Title + '</td></tr>';
        movieInformation += '<tr><td>Year:</td><td>' + items[itemIndexNumber].Year + '</td></tr>';
        movieInformation += '<tr><td>Type:</td><td>' + items[itemIndexNumber].Type + '</td></tr>';
        movieInformation += '<tr><td>IMDB ID:</td><td>' + items[itemIndexNumber].imdbID + '</td></tr>';
        movieInformation += '</tbody></table>';
        return movieInformation;
      }

      $('#the-image').html(moviePoster);
      $('#preview-txt').html(movieInfo());

      $('#preview-prev').click(function() {
        itemIndexNumber --;
        if(itemIndexNumber === -1 ) {
          itemIndexNumber = items.length - 1;
          if(items[itemIndexNumber].Poster !== "N/A" || xhr.status !== 403 || xhr.status !== 404) {
            moviePoster = '<img src="' + items[itemIndexNumber].Poster + '" alt="' + items[itemIndexNumber].Title + '">';
          } else {
            moviePoster = '<img src="assets/images/no-poster.jpg" alt="">';
          }
        } else {
          if(items[itemIndexNumber].Poster !== "N/A" || xhr.status !== 403 || xhr.status !== 404) {
            moviePoster = '<img src="' + items[itemIndexNumber].Poster + '" alt="' + items[itemIndexNumber].Title + '">';
          } else {
            moviePoster = '<img src="assets/images/no-poster.jpg" alt="">';
          }
        }
        $('#the-image').html(moviePoster);
        $('#preview-txt').html(movieInfo());
      });

      $('#preview-next').click(function() {
        itemIndexNumber ++;
        if(itemIndexNumber === items.length) {
          itemIndexNumber = 0;
        }
        if(items[itemIndexNumber].Poster !== "N/A") {
          moviePoster = '<img src="' + items[itemIndexNumber].Poster + '" alt="' + items[itemIndexNumber].Title + '">';
        } else {
          moviePoster = '<img src="assets/images/no-poster.jpg" alt="">';
        }
        $('#the-image').html(moviePoster);
        $('#preview-txt').html(movieInfo());
      });

      $('#close-icon').click(function() {
        $('.overlay').remove();
      });
    }
  }
};
xhr.open('GET', 'lightbox.html');
xhr.send();
}

// Spotify feed
function spotify(e, f) {
  var limit = e;
  var sortingOrder = f;
  var spotifyAPI = "https://api.spotify.com/v1/search?";
  var spotifyOptions =
  {
    type : "playlist",
    q : "focus",
    limit : limit
  };
  function displayPlaylists(data) {
    var sortingItems = data.playlists.items;
    if(sortingOrder === "asc") {
      var x = 1;
    } else {
      var x = -1;
    }
    sortingItems.sort(function(a, b) {
       var compare1 = a.name.toLowerCase();
       var compare2 = b.name.toLowerCase();
       if (compare1 < compare2) {
         return -1 * x;
       }
       if (compare1 > compare2) {
         return 1 * x;
       }
       return 0;
     });

    var playlistHTML = '<select id="select-sorting">';
    playlistHTML += '<option>- Select Sorting -</option>';
    playlistHTML += '<option value="asc">Ascending</option>';
    playlistHTML += '<option value="desc">Descending</option>';
    playlistHTML += '</select>';

    playlistHTML += '<ul class="inline-flex-container">';
    $.each(data.playlists.items, function (i, playlists) {
      playlistHTML += '<li class="inline-flex-item"><p>' + playlists.name + '</p>';
      playlistHTML += '<a href="' + data.playlists.items[i].external_urls.spotify + '">';
      playlistHTML += '<img src="' + data.playlists.items[i].images[0].url + '" alt="' + playlists.name + '">';
      playlistHTML += '</a></li>';
    });
    playlistHTML += '</ul>';
    $('#items-listing').html(playlistHTML);
    $('.show-more').removeClass('hidden');

// Example 1 for project's hand in notes
    $('.inline-flex-item a').click(function(e) {
      e.preventDefault();
      var items = data.playlists.items;
      var itemIndexNumber = $(this).index('.inline-flex-item a');
      var item = data.playlists.items[itemIndexNumber];
      var itemImage = item.images[0].url;
      var itemName = item.name;
      SpotifyLightbox(items, itemIndexNumber, itemImage, itemName);
    });

    var usrSelection = document.getElementById('select-sorting');
    usrSelection.addEventListener('change', function() {
      var listSorting = usrSelection.selectedOptions[0].value;
      spotify(data.playlists.items.length, listSorting);
      console.log("DDD: ", listSorting);
    });
  }
  $.getJSON(spotifyAPI, spotifyOptions, displayPlaylists);
}

// OMDB feed
function omdb(f) {
  console.log("ssss: ", f);
  var sortingOrder = f;
  var omdbAPI = "http://www.omdbapi.com/?";
  var omdbOptions =
  {
    s : "Police Academy",
    tomatoes : "true",
    type : "movie"
  };

  function omdbPosters(data) {
    var sortingItems = data.Search;
    if(sortingOrder === "asc") {
     var x = 1;
    } else {
      var x = -1;
    }
    sortingItems.sort(function(a, b) {
       var compare1 = a.Year.toLowerCase();
       var compare2 = b.Year.toLowerCase();
       if (compare1 < compare2) {
         return -1 * x;
       }
       if (compare1 > compare2) {
         return 1 * x;
       }
       return 0;
     });

    var posterHTML = '<select id="select-sorting">';
    posterHTML += '<option>- Select Sorting -</option>';
    posterHTML += '<option value="asc">Ascending</option>';
    posterHTML += '<option value="desc">Descending</option>';
    posterHTML += '</select>';

    posterHTML += '<ul class="inline-flex-container">';
    $.each(data.Search, function (i, movieList) {
      posterHTML += '<li class="inline-flex-item"><p>' + movieList.Title + '</p>';
      if(movieList.Poster !== "N/A") {
        posterHTML += '<img src="' + data.Search[i].Poster + '" alt="' + movieList.Title + '">';
      } else {
        posterHTML += '<img src="assets/images/no-poster.jpg" alt="">';
      }
      posterHTML += '</li>';
    });
    posterHTML += '</ul>';
    $('#items-listing').html(posterHTML);

// Example 1 for project's hand in notes
    $('.inline-flex-item img').click(function(e) {
      var items = data.Search;
      var itemIndexNumber = $(this).index('.inline-flex-item img');
      var item = data.Search[itemIndexNumber];
      var itemImage = item.Poster;
      var itemName = item.Title;
      omdbLightbox(items, itemIndexNumber, itemImage, itemName);
    });

    var usrSelection = document.getElementById('select-sorting');
    usrSelection.addEventListener('change', function() {
      var listSorting = usrSelection.selectedOptions[0].value;
      omdb(listSorting);
      console.log("DDD: ", listSorting);
    });
  }
  $.getJSON(omdbAPI, omdbOptions, omdbPosters);
}

function sortingStatus() {
  var listSorting = "asc";
  return listSorting;
}

spotifyButton.addEventListener('click', function() {

  spotify(6, sortingStatus());
  var listingsName = this.innerText;
  $('#listings-name').html(listingsName);
  if(showMoreButton.style.display === "none") {
    showMoreButton.style.display = "inline-block";
  }
});

$('#show-more-button').click(function() {
  spotify(12, sortingStatus());
  $(this).fadeOut();
});

omdbButton.addEventListener('click', function() {
  omdb(sortingStatus());
  var listingsName = this.innerText;
  $('#listings-name').html(listingsName);
});
