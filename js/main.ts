var topNewsUrl = "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=&";
var searchUrl = "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=";
var categoryUrl = "https://api.cognitive.microsoft.com/bing/v5.0/news?category=";
var trendingUrl = "https://api.cognitive.microsoft.com/bing/v5.0/news/trendingtopics?"; // may add at a later date

var params: { [str: string]: string; } = { };
params['count'] = '100';
params['offset'] = '70';
params['mkt'] = 'en-us';
params['safeSearch'] = 'Moderate';

function start() : void {
    sendApiRequest(searchUrl+"new+zealand&"); //topnewsUrl ------------------------ REPLACE TO THIS

    $('#searchTextField').keyup(function(e){
        if(e.keyCode==13){
            $('.pin').remove();
            processRequest(this.value, searchUrl);
        }
    });

    $('.dropdown-menu li').on('click',function(){
        $('.pin').remove();
        processRequest($(this).text(), categoryUrl);
    });
}

function processRequest(value ,url) : void {
    var str: string = value.replace(/ /g, "+");
    sendApiRequest(url+str+"&");
}

function display(data) : void{
    var article: string = "";
    var slide: string = "";
    var count: number = 0;

    for(var jsonArticle of data.value){
        if(jsonArticle.hasOwnProperty('image')){
            article =   "<div class=\"pin\">"+
                            "<a href=\""+jsonArticle.url+"\">"+
                                    "<img src=\""+jsonArticle.image.thumbnail.contentUrl+"\" class=\"img-rounded\">"+
                                        "<h3 class=\"name\">"+jsonArticle.name+"</h3>"+
                                        "<p class=\"datePublished\">"+jsonArticle.datePublished+"</p>"+
                            "</a>"+
                        "</div>"
            $('#columns').append(article);
        }
    }
}

function sendApiRequest(url) : void {
    $.ajax({
        url: url+$.param(params),
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
            console.log("-- API request fail --\n"+error.getAllResponseHeaders());
        });
}