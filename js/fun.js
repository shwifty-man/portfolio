function openNewPage() {
  window.location.href = 'newPage.html';
}


window.onload = function() {
  setTimeout(function() {
      const welcomeScreen = document.getElementById('welcome-screen');
      welcomeScreen.style.transition = 'opacity 1s';
      welcomeScreen.style.opacity = '0';

    
      setTimeout(function() {
          welcomeScreen.style.display = 'none';
          document.getElementById('main-content').style.display = 'block';
      }, 1000);
  }, 5000);
};