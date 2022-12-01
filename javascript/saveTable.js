function sendTable() {
   var form = document.querySelector('form');
   form.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = new FormData(form);
      console.log("Save attempted");
      send(data);
   });
   
   
   
   function send(data){
      var request = new XMLHttpRequest();
      request.addEventListener('load', function(event) {
         if (request.status >= 200 && request.status < 300) {
            console.log(request.responseText);
            //window.location.href = "http://localhost/trackertest/main/main.html";
         } else {
            console.warn(request.statusText, request.responseText);
         }
      });
      request.open("POST","../php/save.php");
      request.send(data);
   }   
}
