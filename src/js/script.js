$(document).ready(function () {
  $("a")
    .not(".lightbox-link")
    .on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log($(this));
    });

  $(".card[role='button']").on("click", function (e) {
    var link = $(this).find("a").attr("href");
    console.log("link", link);
    if (link) {
      window.location = link;
    }
    return false;
  });
});
