$("body").delegate("#menu-btn", "click", function() {
    var menu_btn = document.querySelector("#menu-btn");
    var sidebar = document.querySelector("#sidebar");
    var container = document.querySelector(".my-container");
    sidebar.classList.toggle("active-nav");
      container.classList.toggle("active-cont");
});