var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


var RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<h2>' +
    // '<a class="js-video-name" href="" target="_blank"></a></h2>' +
    '<a class="js-video-thumbnail" href="" target="blank"><img class="contain" id="imgDisp" src="" /></a>' + 
  '</div>'
);

function getDataFromApi(searchTerm, callback) {
    var params = {
      url: YOUTUBE_SEARCH_URL,
      data :{
        part: 'snippet',
        key: 'AIzaSyDt72bD7KAavoflkuTJMvzma_qSOuk6qIA',
        q: searchTerm,
        maxResults: '5'
      },

      dataType: 'json',
      type: 'GET',
      success: callback
    };
  
    $.ajax(params);
}


function renderResult(result) {
  var template = $(RESULT_HTML_TEMPLATE);
  var imageURL = result.snippet.thumbnails.high.url;
  var youTubeURL = "https://youtube.com/watch?v=" + result.id.videoId;
  // template.find(".js-video-name").text(result.snippet.title).attr("href", youTubeURL);
  template.find(".js-video-thumbnail").attr("href", youTubeURL);
  template.find("#imgDisp").attr("src", imageURL);

  return template;
}

function displayYouTubeSearchData(data) {
  var results = data.items.map(function(item, index) {
    return renderResult(item);

  });
  $(".js-search-results").hide().fadeIn(2000);
  // $('.js-search-results').animate({'marginTop':'+=-200px','opacity':'1'},1500);
  $('.js-search-results').html(results);

}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);

  });
}

$(watchSubmit);
