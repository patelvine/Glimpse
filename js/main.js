var topNewsUrl = "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=&";
var searchUrl = "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=";
var categoryUrl = "https://api.cognitive.microsoft.com/bing/v5.0/news?category=";
var trendingUrl = "https://api.cognitive.microsoft.com/bing/v5.0/news/trendingtopics?"; // may add at a later date
var params = {};
params['count'] = '100';
params['offset'] = '70';
params['mkt'] = 'en-us';
params['safeSearch'] = 'Moderate';
function start() {
    sendApiRequest(searchUrl + "new+zealand&"); //topnewsUrl ------------------------ REPLACE TO THIS
    $('#searchTextField').keyup(function (e) {
        if (e.keyCode == 13) {
            $('.pin').remove();
            processRequest(this.value, searchUrl);
        }
    });
    $('.dropdown-menu li').on('click', function () {
        $('.pin').remove();
        processRequest($(this).text(), categoryUrl);
    });
}
function processRequest(value, url) {
    var str = value.replace(/ /g, "+");
    sendApiRequest(url + str + "&");
}
function display(data) {
    var article = "";
    var slide = "";
    var count = 0;
    for (var _i = 0, _a = data.value; _i < _a.length; _i++) {
        var jsonArticle = _a[_i];
        if (jsonArticle.hasOwnProperty('image')) {
            article = "<div class=\"pin\">" +
                "<a href=\"" + jsonArticle.url + "\">" +
                "<img src=\"" + jsonArticle.image.thumbnail.contentUrl + "\" class=\"img-rounded\">" +
                "<h3 class=\"name\">" + jsonArticle.name + "</h3>" +
                "<p class=\"datePublished\">" + jsonArticle.datePublished + "</p>" +
                "</a>" +
                "</div>";
            $('#columns').append(article);
        }
    }
}
function sendApiRequest(url) {
    $.ajax({
        url: url + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "ded97a6fe81f45c39c0e06730e9bc493");
        },
        type: "GET",
    })
        .done(function (data) {
        display(data);
    })
        .fail(function (error) {
        console.log("API request fail");
        console.log("-- API request fail --\n" + error.getAllResponseHeaders());
    });
}
