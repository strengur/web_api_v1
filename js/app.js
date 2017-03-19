var spotifyButton = document.getElementById('spotify-button');
var showMoreButton = document.getElementById('show-more-button');
var omdbButton = document.getElementById('omdb-button');

// Spotify Overlay file called
function SpotifyOverlay (items, itemIndexNumber, itemImage, itemName) {
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
        };
        $('#the-image').html(playlistCover);
        $('#preview-txt').html(playlistInfo());
      });

      $('#preview-next').click(function() {
        itemIndexNumber ++;
        if(itemIndexNumber === items.length) {
          itemIndexNumber = 0;
        };
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
xhr.open('GET', 'overlay.html');
xhr.send();
}

// OMDB Overlay file called
function omdbOverlay (items, itemIndexNumber, itemImage, itemName) {
  var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if(xhr.status === 200) {
      // Example 2 for project's hand in notes
      console.log(itemImage.valueOf());
      $('.lightbox').html(xhr.responseText);
      if(itemImage !== "N/A") {
        var moviePoster = '<img src="' + itemImage + '" alt="' + itemName + '">';
      } else {
        var moviePoster= '<img src="assets/images/no-poster.jpg" alt="">';
      }
      function movieInfo() {
        var movieInformation = '<table><tbody>';
        movieInformation += '<tr><td>Movie Name:</td><td>' + items[itemIndexNumber].Title + '</td></tr>';
        movieInformation += '<tr><td>Year:</td><td>' + items[itemIndexNumber].Year + '</td></tr>';
        movieInformation += '<tr><td>Type:</td><td>' + items[itemIndexNumber].Type + '</td></tr>';
        movieInformation += '</tbody></table>';
        return movieInformation;
      }

      $('#the-image').html(moviePoster);
      $('#preview-txt').html(movieInfo());

      $('#preview-prev').click(function() {
        itemIndexNumber --;
        if(itemIndexNumber === -1 ) {
          itemIndexNumber = items.length - 1;
          //moviePoster = '<img src="' + items[itemIndexNumber].Poster + '" alt="' + items[itemIndexNumber].Title + '">';
          if(items[itemIndexNumber].Poster !== "N/A") {
            moviePoster = '<img src="' + items[itemIndexNumber].Poster + '" alt="' + items[itemIndexNumber].Title + '">';
          } else {
            moviePoster = '<img src="assets/images/no-poster.jpg" alt="">';
          }
        } else {
          if(items[itemIndexNumber].Poster !== "N/A") {
            moviePoster = '<img src="' + items[itemIndexNumber].Poster + '" alt="' + items[itemIndexNumber].Title + '">';
          } else {
            moviePoster = '<img src="assets/images/no-poster.jpg" alt="">';
          }
          //moviePoster = '<img src="' + items[itemIndexNumber].Poster + '" alt="' + items[itemIndexNumber].Title + '">';
        };
        $('#the-image').html(moviePoster);
        $('#preview-txt').html(movieInfo());
      });

      $('#preview-next').click(function() {
        itemIndexNumber ++;
        if(itemIndexNumber === items.length) {
          itemIndexNumber = 0;
        };
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
xhr.open('GET', 'overlay.html');
xhr.send();
}

// Spotify feed
function spotify(e) {
  var limit = e;
  var spotifyAPI = "https://api.spotify.com/v1/search?";
  var spotifyOptions =
  {
    type : "playlist",
    q : "focus",
    limit : limit
  };
  function displayPlaylists(data) {
    var playlistHTML = '<ul class="inline-flex-container">';
    console.log(data.playlists.items.length);
    $.each(data.playlists.items, function (i, playlists) {
      playlistHTML += '<li class="inline-flex-item"><p>' + playlists.name + '</p>';
      playlistHTML += '<a href="' + data.playlists.items[i].external_urls.spotify + '">';
      playlistHTML += '<img src="' + data.playlists.items[i].images[0].url + '" alt="' + playlists.name + '">';
      playlistHTML += '</a></li>';
    });
    playlistHTML += '</ul>';
    // playlistHTML += '<div class="show-more">';
    // playlistHTML += '<div id="show-more-button">Show More</div>';
    // playlistHTML += '</div>';
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
      SpotifyOverlay(items, itemIndexNumber, itemImage, itemName);
      console.log('Lengdin: ', data.playlists.items);

    });
  }
  $.getJSON(spotifyAPI, spotifyOptions, displayPlaylists);
}

// OMDB feed
function omdb() {
  var omdbAPI = "http://www.omdbapi.com/?"
  var omdbOptions =
  {
    s : "Police Academy",
    tomatoes : "true"
  }
  function omdbPosters(data) {
    console.log(data);

    var posterHTML = '<ul class="inline-flex-container">';
    console.log(data.Search[0]);
    $.each(data.Search, function (i, movieList) {
      posterHTML += '<li class="inline-flex-item"><p>' + movieList.Title + '</p>';
      //posterHTML += '<img src="' + data.Search[i].Poster + '" alt="' + movieList.Title + '">';
      if(movieList.Poster !== "N/A") {
        posterHTML += '<img src="' + data.Search[i].Poster + '" alt="' + movieList.Title + '">';
      } else {
        posterHTML += '<img src="assets/images/no-poster.jpg" alt="">';
      }
      posterHTML += '</li>';
    });
    posterHTML += '</ul>';
    // playlistHTML += '<div class="show-more">';
    // playlistHTML += '<div id="show-more-button">Show More</div>';
    // playlistHTML += '</div>';
    $('#items-listing').html(posterHTML);
    //$('.show-more').removeClass('hidden');

// Example 1 for project's hand in notes
    $('.inline-flex-item img').click(function(e) {
      var items = data.Search;
      var itemIndexNumber = $(this).index('.inline-flex-item img');
      var item = data.Search[itemIndexNumber];
      var itemImage = item.Poster;
      var itemName = item.Title;
      omdbOverlay(items, itemIndexNumber, itemImage, itemName);
    });

  }
  $.getJSON(omdbAPI, omdbOptions, omdbPosters);
}

spotifyButton.addEventListener('click', function() {
  spotify(6);
  var listingsName = this.innerText;
  $('#listings-name').html(listingsName);
  if(showMoreButton.style.display === "none") {
    showMoreButton.style.display = "inline-block";
  }
});

$('#show-more-button').click(function() {
  spotify(12);
  $(this).fadeOut();
});

omdbButton.addEventListener('click', function() {
  omdb();
  var listingsName = this.innerText;
  $('#listings-name').html(listingsName);
});
