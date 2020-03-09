
var xhttp = new XMLHttpRequest(); // create new XMLHttpRequest object

xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) { // readyState 4 = Done (data transfer either successful or failed), 
        //status is the http status code of the response
        console.log(this.responseText);
    }
}

var button = document.getElementById("addButton"); // 
button.addEventListener("click", sendRequest);

function sendRequest(){
   var url = document.getElementById("url").value; 
   var title = document.getElementById("title").value;
   var notes = document.getElementById("notes").value; 
   var tags = document.getElementById("tags").value;  

   xhttp.open("POST", 'http://localhost:8000/auth.json', true);
   // location replace acts as a redirect as this must be done on client side when using ajax
   xhttp.onload = window.location.replace('http://localhost:8000/'); 
   xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
   xhttp.send(JSON.stringify({"url": url, "title": title, "notes": notes, "tags": tags}));
   
}

//xhttp.onload = window.location.replace('http://localhost:8000/');






