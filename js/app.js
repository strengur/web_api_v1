var spotifyButton = document.getElementById('spotify-button');
var showMoreButton = document.getElementById('show-more-button');

// Overlay file called
function overlay (items, itemIndexNumber, itemImage, itemName) {
  var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if(xhr.status === 200) {
      // Example 2 for project's hand in notes
      $('.lightbox').html(xhr.responseText);
      var playlistCover = '<img src="' + itemImage + '" alt="' + itemName + '">';
      $('#the-image').html(playlistCover);

      $('#preview-prev').click(function() {
        itemIndexNumber --;
        if(itemIndexNumber = 0) {
          itemIndexNumber = items.length;
        };
        console.log('Fjöldi: ' + items.length + ' og: ' + itemIndexNumber);

        playlistCover = '<img src="' + items[itemIndexNumber].images[0].url + '" alt="' + items[itemIndexNumber].name + '">';
        $('#the-image').html(playlistCover);
        console.log(items[itemIndexNumber]);
      });

      $('#preview-next').click(function() {
        itemIndexNumber ++;
        if(itemIndexNumber === items.length) {
          itemIndexNumber = 0;
        };
        playlistCover = '<img src="' + items[itemIndexNumber].images[0].url + '" alt="' + items[itemIndexNumber].name + '">';
        $('#the-image').html(playlistCover);
        console.log(itemIndexNumber);
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

// Example 1 for project's hand in notes
    $('.inline-flex-item a').click(function(e) {
      e.preventDefault();
      var items = data.playlists.items;
      var itemIndexNumber = $(this).index('.inline-flex-item a');
      var item = data.playlists.items[itemIndexNumber];
      var itemImage = item.images[0].url;
      var itemName = item.name;
      overlay(items, itemIndexNumber, itemImage, itemName);
      console.log('Lengdin: ', data.playlists.items);

    });
  }
  $.getJSON(spotifyAPI, spotifyOptions, displayPlaylists);
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



// OMDB feed
  var omdbAPI = "http://www.omdbapi.com/?"
  var omdbOptions =
  [
    {
      t : "shooter",
      tomatoes : "true"
    },
    {
      t : "Bad Boys",
      tomatoes : "true"
    },
    {
      t : "the bourne identity",
      tomatoes: "true"
    },
    {
      t : "date night",
      tomatoes: "true"
    },
    {
      t : "grumpy old men",
      tomatoes: "true"
    },
    {
      t : "there's something about mary",
      tomatoes: "true"
    },
  ]
  function omdbPosters(data) {
    console.log(data);

  }
  $.getJSON(omdbAPI, omdbOptions[5], omdbPosters);
