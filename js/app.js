// Points for API's selections navigation
  // Add selected class to selected API


// Spotify feed
  var spotifyAPI = "https://api.spotify.com/v1/search?type=playlist&q=focus&limit=6";
  var spotifyPlaylist;
  function displayPlaylists(data) {
    var playlistHTML = '<ul class="inline-flex-container">';
    console.log(data.playlists.items[0].external_urls.spotify);
    $.each(data.playlists.items, function (i, playlists) {

      playlistHTML += '<li class="inline-flex-item">' + playlists.name;
      playlistHTML += '<a href="' + data.playlists.items[i].external_urls.spotify + '">';
      playlistHTML += '<img src="' + data.playlists.items[i].images[0].url + '" alt="' + playlists.name + '">';
      playlistHTML += '</a></li>';
    }), 5000;
    playlistHTML += '</ul>';
    $('#items-listing').html(playlistHTML);
  }

  $.getJSON(spotifyAPI, displayPlaylists);

// Flickr feed
