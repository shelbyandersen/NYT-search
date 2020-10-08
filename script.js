//Variables
var searchBtn = $("#search");
var clearBtn = $("#clear");
var articleContainer = $("#article-container");

searchBtn.on("click", function (event) {
  event.preventDefault();
  articleContainer.empty();
  console.log("You clicked the button!");
  getArticles();
});

function getArticles() {
  //Jonathan's Code
  var search = $("#user-search").val(); //change this
  var APIKey = "&api-key=mGtu0ontVHTFCGK8aDQ9afPr7mzceoCg"; //change this
  var queryURL =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
    search +
    "&facet_fields=pub_year&facet=true";
  var beginDate = "02/01/2020";
  var endDate = "09/01/2020";
  // var beginArray = beginDate.split("/");
  // beginDate = beginArray[2] + beginArray[0] + beginArray[1];
  // var endArray = endDate.split("/");
  // endDate = endDate[2] + endDate[0] + endDate[1];
  var size = $("#inputGroupSelect02").val(); //change this
  if (beginDate !== "") {
    queryURL = queryURL + "&begin_date=" + beginDate + APIKey;
  } else if (endDate !== "") {
    queryURL = queryURL + "&end_date" + endDate + APIKey;
  } else if (beginDate !== "" && endDate !== "") {
    queryURL =
      queryURL + "&begin_date=" + beginDate + "&end_date=" + endDate + APIKey;
  }
  // console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    for (var i = 0; i < size; i++) {
      console.log(response.response.docs[i].headline.main);

      var newRow = $("<div>").addClass("row");
      var newCol = $("<div>").addClass("col-md-12");
      var newLink = $("<a>")
        .attr("data-item", i)
        .text(response.response.docs[i].headline.main);
      newLink.attr("href", response.response.docs[i].web_url);
      newCol.append(newLink);
      newRow.append(newCol);
      //append new row to results element
      console.log(response.response.docs);
      articleContainer.append(newRow);
    }
  });
}
