//slideshow mainpage
$(document).ready(function () {
  $(".slideshow").slick({
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    fade: true,
    speed: 1000,
  });
});

//logo einfliegen

document.addEventListener("DOMContentLoaded", function() {
  const logoPart1 = document.querySelector(".logo-part1");
  const logoPart2 = document.querySelector(".logo-part2");
  
  if (logoPart1 && logoPart2) {

    window.addEventListener('load', function() {

      logoPart1.style.display = 'block';
      logoPart2.style.display = 'block';
      

      logoPart2.style.opacity = '0';
      

      setTimeout(() => {
        let opacity = 0;
        const intervalId = setInterval(() => {
          opacity += 0.02;
          logoPart2.style.opacity = opacity;
          
          if (opacity >= 1) {
            clearInterval(intervalId);
          }
        }, 40); 
      }, 3000); //zeit bis das logo kommt 3000 = 3 sek
    });
  }
});


const topButton = document.querySelector('a[href="#top"]');
  if (topButton) {
    topButton.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }



document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  if (localStorage.getItem("cookiePreference")) {
    document.querySelector(".cookie-banner").style.display = "none";
  }

  document
    .querySelector(".accept-cookies")
    .addEventListener("click", function () {
      localStorage.setItem("cookiePreference", "accepted");
      document.querySelector(".cookie-banner").style.display = "none";
      console.log("Accept button clicked");
    });

  document
    .querySelector(".cookie-settings")
    .addEventListener("click", function () {
      localStorage.setItem("cookiePreference", "declined");
      document.querySelector(".cookie-banner").style.display = "none";
      console.log("Settings button clicked");
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const messageDiv = document.getElementById('formMessage');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    fetch(form.action, {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(text => {
      try {
        return JSON.parse(text);
      } catch (error) {
        console.error('Failed to parse JSON:', error);
        throw new Error('Invalid JSON response');
      }
    })
    .then(data => {
      messageDiv.style.display = 'block';
      if (data.success) {
        messageDiv.textContent = data.message;
        messageDiv.style.color = 'green';
        form.reset();
      } else {
        messageDiv.textContent = data.message || 'Es gab einen Fehler beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.';
        messageDiv.style.color = 'red';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      messageDiv.style.display = 'block';
      messageDiv.textContent = 'Es gab einen Fehler beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.';
      messageDiv.style.color = 'red';
    });
  });
});