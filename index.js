var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


var RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<h2>' +
    '<a class="js-video-name" href="" target="_blank"></a></h2>' +
    // '<a class="js-video-thumbnail" src="" id="imageID">' +
    '<img id="imgDisp" src="" />' + 
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



// function renderResult(result) {
//   var template = $(RESULT_HTML_TEMPLATE);
//   var title = value.snippet.title;
//   var thumbnail = value.snippet.thumbnails.default.url;
//   console.log(title);
//   template.find(".js-video-name").text(title).attr("href", result.html_url);
//   template.find(".js-video-thumbnail").thumbnail.attr("href", result.owner.html_url);
//   // template.find(".js-issues-count").text(result.open_issues);
//   return template;
// }

function renderResult(result) {
  console.log(result);
  var template = $(RESULT_HTML_TEMPLATE);
  var imageURL = result.snippet.thumbnails.medium.url;
  console.log(imageURL);
  template.find(".js-video-name").text(result.snippet.title).attr("href", result.etag);
  // template.find(".js-video-thumbnail").text(result.snippet.thumbnails.medium.url);
  template.find("#imgDisp").attr("src", imageURL);

  return template;
}

function displayYouTubeSearchData(data) {
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
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
