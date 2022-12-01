var form = document.querySelector('form');
form.addEventListener('submit', function (event) {
   event.preventDefault();
   var data = new FormData(form);
   check(data);
});

function check (data){
   var name = document.getElementById('username').value;
   var request = new XMLHttpRequest();
   request.addEventListener('load', function(event) {
      if (request.status >= 200 && request.status < 300) {
         success();
      } else {
         console.warn(request.statusText, request.responseText);
         failure(request.responseText);
      }
   });
   request.open("POST","../php/userlogin.php");
   request.send(data);

   function success() {
      window.location.href = "http://localhost/trackertest/main/main.html";
   }
  
  function failure(msg) {
      document.getElementById('fail').innerHTML = msg;
  }
}