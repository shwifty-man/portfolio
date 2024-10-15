function openNewPage() {
  window.location.href = 'newPage.html';
}

function openTab() {
  var tabContent = document.getElementById("tabContent");
  if (tabContent.style.display === "block") {
    tabContent.style.display = "none"; // Hide if it's already open
  } else {
    tabContent.style.display = "block"; // Show if it's hidden
  }
}
