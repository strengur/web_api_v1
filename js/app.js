// Points for API's selections navigation
  // Add selected class to selected API
var spotifyButton = document.getElementById('spotify-button');
var showMoreButton = document.getElementById('show-more-button');
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
      playlistHTML += '<li class="inline-flex-item">' + playlists.name;
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
  }
  $.getJSON(spotifyAPI, spotifyOptions, displayPlaylists);
}

spotifyButton.addEventListener('click', function() {
  spotify(6);
  var listingsName = this.innerText;
  $('#listings-name').html(listingsName);
});

$('#show-more-button').click(function() {
  spotify(12);
  $(this).fadeOut();
});

// OMDB feed
  var omdbAPI = "http://www.omdbapi.com/?"
  var omdbOptions =
  [
    {
      t : "shooter",
      tomatoes: "true"
    },
    {
      t : "Bad Boys"
    }
  ]
  function omdbPosters(data) {
    console.log(data);

  }
  $.getJSON(omdbAPI, omdbOptions[1], omdbPosters);
