var GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories';


var RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<h2>' +
    '<a class="js-result-name" href="" target="_blank"></a> by <a class="js-user-name" href="" target="_blank"></a></h2>' +
    '<p>Number of watchers: <span class="js-watchers-count"></span></p>' + 
    '<p>Number of open issues: <span class="js-issues-count"></span></p>' +
  '</div>'
);

function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: GITHUB_SEARCH_URL,
    data: {
      q: searchTerm + " in:name",
      per_page: 5
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}


function renderResult(result) {
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-result-name").text(result.name).attr("href", result.html_url);
  template.find(".js-user-name").text(result.owner.login).attr("href", result.owner.html_url);
  template.find(".js-watchers-count").text(result.watchers_count);
  template.find(".js-issues-count").text(result.open_issues);
  return template;
}

function displayGitHubSearchData(data) {
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
    getDataFromApi(query, displayGitHubSearchData);
  });
}

$(watchSubmit);
