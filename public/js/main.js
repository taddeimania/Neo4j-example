;(function() {
  console.log("Hello World");

  let searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("geez rick~");
  });

  let pillBoxes = document.querySelectorAll(".pill").forEach(function(box) {
    box.addEventListener("click", function(e) {
      let searchBox = document.getElementById("domainSearch");
      searchBox.value = e.target.textContent;
    });
  });
})();
