function init (i) {
    
    load();
}

function load() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        structureSite(this.responseText);
    }
    xhttp.open("GET", "../php/tracker.php?action=load" + 
        "&name=" + document.getElementById('employee').value);
    xhttp.send();
}

function structureSite(data){
    let rows = JSON.parse(data);
    const xhttp = new XMLHttpRequest();
    for (let r=0; r<=rows.length; r++){
        if(r==0){
            xhttp.onload = function() {
                createOverviewTable(this.responseText);
            }
        }
        if(r>0 && r<rows.length){
            xhttp.onload = function() {
                createProjectTable(this.responseText, r);
            }
        }
        xhttp.open("GET", rows[r]);
        xhttp.send();
    }
}

function createOverviewTable(data) {
    let rows = JSON.parse(data);
    let table = "" +
        "  <table id=\"workhours\">\n" +
        "   <caption>Arbeitsstunden</caption>\n" +
        "   <thead>\n" +
        "    <tr>\n" +
        "     <th id='position'>Eintrag</th>\n" +
        "     <th id='date'>Datum</th>\n" +
        "     <th id='start'>Beginn</th>\n" +
        "     <th id='end'>Ende</th>\n" +
        "     <th id='project'>Projekt</th>\n" +
        "     <th id='hours'>Stunden</th>\n" +
        "    </tr>\n" +
        "   </thead>\n" +
        "   <tbody>\n";
    
    pos = 1;
    for (let r=0; r<=rows.length; r++){
        let row = rows[r];
        if (r < rows.length ){
            table += "" +
                "    <tr>\n" +
                "     <td>" + pos + "</td>\n" +
                "     <td>" + row['date'] + "</td>\n" +
                "     <td>" + row['start'] + "</td>\n" +
                "     <td>" + row['end'] + "</td>\n" +
                "     <td>" + row['project'] + "</td>\n" +
                "     <td>" + row['hours'] + "</td>\n" +
                "    </tr>\n";                
        }
        pos++;
    }
    table += "" +
        "   </tbody>\n" +
        "  </table>";
    document.getElementById("workhours").innerHTML = table;
}

function createProjectTable(data, i) {
    let rows = JSON.parse(data);
    let table = "" +
        "  <table id=\"project " + i.toString() +"\">\n" +
        "   <caption>Projekt: "+ rows[0] + "</caption>\n" +
        "   <thead>\n" +
        "    <tr>\n" +
        "     <th id='position'>Eintrag</th>\n" +
        "     <th id='date'>Eintrag</th>\n" +
        "     <th id='start'>Beginn</th>\n" +
        "     <th id='end'>Ende</th>\n" +
        "     <th id='project'>Stunden</th>\n" +
        "     <th id='hours'>Gesamt</th>\n" +
        "    </tr>\n" +
        "   </thead>\n" +
        "   <tbody>\n";
    
    pos = 1;
    for (let r=1; r<=rows.length; r++){
        let row = rows[r];
        if (r < rows.length ){
            table += "" +
                "    <tr>\n" +
                "     <td>" + pos + "</td>\n" +
                "     <td>" + row['date'] + "</td>\n" +
                "     <td>" + row['start'] + "</td>\n" +
                "     <td>" + row['end'] + "</td>\n" +
                "     <td>" + row['hours'] + "</td>\n" +
                "     <td>" + row['total'] + "</td>\n" +
                "    </tr>\n";                
        }
        pos++;
    }
    table += "" +
        "   </tbody>\n" +
        "  </table>";
    document.getElementById("workhours").innerHTML = table;

}

function save() {
    
    let phpLinks;

    let tables = document.getElementsByTagName("table");
    let mainTable = tables.getElementById("workhours");
    let xhttp = new XMLHttpRequest();
    let saveLink = document.getElementById('employeeName') + " workhours tracker.php"
    xhttp.open("POST", saveLink, true);
    xhttp.send(mainTable);

    phpLinks = "" + saveLink + "\n";

    for(let i=1; i<tables.length; i++) {
        let projectTable = tables[i];
        xhttp = new XMLHttpRequest();
        saveLink = tables.getElementById('project ' + i.toString()) + "total tracker.php";
        xhttp.open("POST", saveLink, true);
        xhttp.send(projectTable);
    
        phpLinks = "" + saveLink + "\n";
    }

    xhttp = new XMLHttpRequest();
    saveLink = tracker.php;
    xhttp.open("POST", saveLink, true);
    xhttp.send(phpLinks);

    phpLinks = "" + saveLink + "\n";
}