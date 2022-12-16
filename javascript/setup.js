let username ="Benutzer";
let columnNames = ["index", "user", "entry", "date", "start", "end", "project", "hours"];
let months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
let displayOptions = ["Monatsübersicht","Wochenübersicht","Tagesübersicht"];
let currentMonth = "";
let currentWeek = "";
let currentDay = "";
let currentDisplay = "";
let userData;

function init() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200){
        username = (this.responseText);
        fillSite(username);
        load();
        }
    }
    xhttp.open("GET","../php/fetch.php?action=fetch_username", true);
    xhttp.send();
}

function load() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            transformData(this.responseText);
        }
    }
    xhttp.open("GET","../php/fetch.php?action=fetch_data", true);
    xhttp.send();
}

function transformData(data) {
    try {
        userData = JSON.parse(data);
    }
    catch(e) {
        userData = "";
    }
    dateSetup();
    fillSideBar();
}

function structureSite(displayString) {

    let workhoursTable = "";

    let thEntries = ["Index", "User" ,"Eintrag", "Datum", "Beginn", "Ende", "Projekt", "Stunden"];
    workhoursTable +=   "<table id='main_table' class='main_table' name='main_table'>\n" +
                        "   <thead id='main_head'>\n" +
                        "       <tr>\n"; 
                        for(let i=0; i<columnNames.length; i++) {
                            let elementClass = "";
                            if (i==0 || i ==1) elementClass = "class='hidden_column'";
                            workhoursTable +="     <th id='" + columnNames[i] + "'" + elementClass + " name='" + columnNames[i] + "[]'>" + thEntries[i] + "</th>\n"
                        }
    workhoursTable +=   "       </tr>\n" +
                        "   </thead>\n" +
                        "   <tbody id='work_body'>\n";

    let insert = [];
    switch(displayString) {
        case "month": 
            insert = monthData(currentDisplay.split("."));
            break;
        case "week": 
            insert = weekData(weekReverse(currentDisplay.split(".")));
            break;
        case "day": 
            insert = dayData((currentDay).split("."));
            break;
        default: dateCheck = monthData.split(".");
    }

    let r=0;
    if(Array.isArray(insert)){
        for(r=0;r<insert.length; r++) {

            let row = insert[r];
            let dateHelp = (row['task_date']).split("-");
            let dateValue = dateHelp[2] + "." + dateHelp[1] + "." + dateHelp[0];
            let tdEntries = [row['task_index'], row['task_user'], row['task_entry'], dateValue, row['task_start'], row['task_end'], row['task_project'], row['task_hours']];
            
            workhoursTable +=   "    <tr>\n";
            if(r == insert.length-1){
                for(let i =0; i<columnNames.length; i++) {
                    workhoursTable += htmlSetup(columnNames[i]) + tdEntries[i] + "'></td>\n";
                }   
            }
            else {
                for(let i =0; i<columnNames.length; i++) {
                    workhoursTable += tableSetup(columnNames[i]) + tdEntries[i] + "'></td>\n";
                }
            } 
            workhoursTable +=   "    </tr>\n";
        }
    }
    else firstRow(insert); 

    workhoursTable +=   "</tbody>" +
                        "</table>";

    $('#main_content').html(workhoursTable);

    function firstRow(entry) {
        let help = entry;
        workhoursTable +=   "    <tr id='setup_row'>\n";
        for(let i =0; i<columnNames.length; i++) {
            if (i==1) entry = username;
            else entry = help;
            workhoursTable += htmlSetup(columnNames[i]) + entry + "'></td>\n";
        }   
        workhoursTable +=   "    </tr>\n";
    }
}

function monthData(dateCheck) {
    let insert = [];
    for(let i of userData){
        if((i['task_date']).includes(dateCheck[1] + "-" + dateCheck[0])) {
            insert.push(i);
        }
    }
    return insert;
}

function weekData(dateCheck) {
    let insert = [];
    let dateHelp = "";
    let endCheck;

    for(let i=0; i<7; i++) {

        if(i == 0) { // include previous Friday

            if(dateCheck[0] <4){ // checking for beginning of Month
                dateHelp = new Date(dateCheck[2], dateCheck[1]-1, 0); // create new Date to get the number of days of the previous month 
                for(let u of userData){ // go through the data from the server
                    if((u['task_date']).includes((dateHelp.getFullYear()) + "-" + (dateHelp.getMonth()+1) + "-" + (dateHelp.getDate() + (dateCheck[0]-3)))) {
                        insert.push(u); // store Data in array, if the Dates match
                    }
                }
            }
            else {
                let friday = parseInt(dateCheck[0])-3;
                if(friday < 10) friday = "0" + parseInt(friday);

                for(let u of userData){ // go through the data from the server
                    if((u['task_date']).includes(dateCheck[2] + "-" + dateCheck[1] + "-" + friday)) {
                        insert.push(u); // store Data in array, if the Dates match
                    }
                }                
            }
            dateHelp = new Date(dateCheck[2], dateCheck[1], 0); // create new Date to get the number of days of the current month
        }

        else if(i == 6) { // include next Monday

            endCheck = dateHelp.getDate() - dateCheck[0];
            if(endCheck <3) { // checking for end of Month
                dateHelp = new Date(dateCheck[2], dateCheck[1], 1); // create new Date for the next month
                for(let u of userData){ // go through the data from the server
                    if((u['task_date']).includes((dateHelp.getFullYear()) + "-" + (dateHelp.getMonth()+1) + "-" + (dateHelp.getDate() + (3-endCheck)))) {
                        insert.push(u); // store Data in array, if the Dates match
                    }
                }
            }
            else {
                let monday = parseInt(dateCheck[0])+2;
                if(monday < 10) monday = "0" + parseInt(monday);
                for(let u of userData){ // go through the data from the server
                    if((u['task_date']).includes(dateCheck[2] + "-" + dateCheck[1] + "-" + monday)) {
                        insert.push(u); // store Data in array, if the Dates match
                    }
                } 
            }
        }

        else {
            for(let u of userData){ // go through the data from the server
                if((u['task_date']).includes(dateCheck[2] + "-" + dateCheck[1] + "-" + (dateCheck[0]))) {
                    insert.push(u); // store Data in array, if the Dates match
                }
            } 

            endCheck = dateHelp.getDate() - dateCheck[0];
            if(endCheck < 1) { // checking for end of Month
                if(dateCheck[1] == 12) { // checking for end of year
                    dateCheck[2] = parseInt(dateCheck[2])+1;
                    dateCheck[1] = "01";
                    dateCheck[0] = "01";
                }
                else {
                    dateCheck[1] = parseInt(dateCheck[1]) + 1;
                    dateCheck[0] = "01";
                }
            }
            else dateCheck[0] = parseInt(dateCheck[0]) + 1;
            
        }

        if(dateCheck[0] < 10) dateCheck[0] = "0" + parseInt(dateCheck[0]);
        if(dateCheck[1] < 10) dateCheck[1] = "0" + parseInt(dateCheck[1]);
    }

    return insert;
}

function dayData(dateCheck) {
    let insert = [];
    let curentDate = new Date(dateCheck[2], dateCheck[1]-1, dateCheck[0]);
    let dateHelp = "";

    let daySetter = 0;
    let monthSetter = 0;
    let yearSetter = 0;

    let test = curentDate.getUTCDay();

    for(let i=0; i<3; i++) {

        if(i==0) {

            if((curentDate.getUTCDay()) == 0) { // check for Mondays
                daySetter = (parseInt(dateCheck[0])-3);
            }
            else daySetter = (parseInt(dateCheck[0])-1);

            if(daySetter < 1){ // checking for beginning of Month
                dateHelp = new Date(dateCheck[2], dateCheck[1]-1, 0); // create new Date to get the number of days of the previous month 
                daySetter = dateHelp.getDate() + daySetter;
                monthSetter = dateHelp.getMonth();
                yearSetter = dateHelp.getFullYear();
            }
            else {
                monthSetter = dateCheck[1];
                yearSetter = dateCheck[2];
            }
        }

        else if(i==1) {
            daySetter = dateCheck[0];
            monthSetter = dateCheck[1];
            yearSetter = dateCheck[2];
        }

        else {

            if((curentDate.getUTCDay()) == 4) { // check for Fridays
                daySetter = (parseInt(dateCheck[0])+3);
            }
            else daySetter = (parseInt(dateCheck[0])+1);

            dateHelp = new Date(dateCheck[2], dateCheck[1], 0); // create new Date to get the number of days of the current month
            let endCheck = dateHelp.getDate() - daySetter;

            if(endCheck < 0) { // checking for end of Month
                dateHelp = new Date(dateCheck[2], dateCheck[1], 1); // create new Date for the next month
                daySetter = dateHelp.getDate() - endCheck;
                monthSetter = dateHelp.getMonth() + 1;
                yearSetter = dateHelp.getFullYear();
            }

            else {
                monthSetter = dateCheck[1];
                yearSetter = dateCheck[2];
            }
        }

        if(daySetter < 10) daySetter = "0" + parseInt(daySetter);
        if(monthSetter < 10) monthSetter = "0" + parseInt(monthSetter);

        for(let u of userData){ // go through the data from the server
            if((u['task_date']).includes(yearSetter + "-" + monthSetter + "-" + daySetter)) {
                insert.push(u); // store Data in array, if the Dates match
            }
        } 
    }

    return insert;

}

function fillSite(username) {
    fillHead();
    fillBody(username);
    fillFoot();    
}

function fillHead(){
    let headPanel = "";
    let image = "../imageFiles/cropped-orcas-logo-orange.png";
    headPanel += "<figure>\n <img src='" + image + "' alt='Orcas Logo' class='header_symbol'>\n </figure>\n";
    headPanel += "<h1 class='header_text'>Orcas Arbeitszeit-Dokumentation</h1>";

    $('#head_content').html(headPanel);
}

function fillBody(username) {

    let userData =  "<label for 'username'><b>Mitarbeiter:</b></label>\n" +
                    "<label id='username'><b>" + username + "</b></label>\n" + 
                    "<label for 'clock'><b>Uhrzeit:</b></label>\n" + 
                    "<label id='clock'><b></b></label>\n";
    $('#user_data').html(userData);
    refreshTime();

    let dateData =  "<label for day_selector><b>Datumauswahl</b><label>\n"+
                    "<select id='day_selector'>\n" +
                    "</select>\n" +
                    "<select id='month_selector' onchange='daySelectorUpdate(this.value)'>\n";

    for(let i=1; i<13; i++) {
        dateData += "   <option>" + i + "</option>\n";
    }
    
    dateData +=     "</select>\n" +
                    "<select id='year_selector'>\n" +
                    "</select>\n" +
                    "<button type='button' id='submit_date_selection'>Anzeigen</button>\n";

    $('#date_selection').html(dateData);

    daySelectorUpdate(date.getMonth()+1);
    yearSelectorUpdate(date.getFullYear());
    $('#day_selector').val(date.getDate());
    $('#month_selector').val(date.getMonth()+1);
    $('#year_selector').val(date.getFullYear());

    let displaySelector =   "   <label for display_selection><b>Anzeige:</b><label>\n" + 
                            "   <select id='range_selection' onchange='displaySwap(this.value)'>\n";
    for(let x of displayOptions) {
        displaySelector +=  "       <option>" + x + "</option>\n";
    }
    displaySelector +=      "   </select>\n";
    $('#display_selector').html(displaySelector);

    let swapper =   "<button type='button' id='previous_time_button' class='swap_month_button'>&#8592</button>\n" +
                    "<span><strong id='table_caption'></strong></span>\n" +
                    "<button type='button' id='next_time_button'>&#8594</button>\n";
    $('#month_swapper').html(swapper);

    setupTimeButtons();

    setupSelectionContainer();
}

function daySelectorUpdate(monthStr){
    let entries = "";
    let dateHelp = new Date(date.getFullYear(), monthStr, 0);
    for(let i=1; i<=dateHelp.getDate();i++) {
        entries +=  "<option>" + i + "</option>\n";
    }
    $('#day_selector').html(entries);
    $('#day_selector').val("1");
}

function yearSelectorUpdate(yearStr){
    let entries;
    for(let i=2010; i< 2030; i++) {
        entries +=  "<option>" + i + "</option>\n";
    }
    $('#year_selector').html(entries);
    $('#day_selector').val(yearStr);
}

function setupSelectionContainer() {

    $('#close_switch_container').html("");
    $('#selection_header').html("");
    $('#selection_container').html("");

    setupEditButton();
    setupInsertButton();

}

function setupEditButton() {

    let tableEditing =   "<button type='button' id='edits_button'>Tabelle bearbeiten</button>\n";
    $('#table_editing').html(tableEditing);

    $('#edits_button').click(function(event) {
        event.preventDefault();
        showEditButtons();
    });
}

function fillFoot() {
    let linkData;
    linkData = "<a href=http://localhost/trackertest/index.html>Login</a>"

    $('#link_space').html(linkData);
}

function fillSideBar() {
    
    let projectAmount = 1;
    let check = [];

    try {
        let fs = 0;
        while(userData[fs]['task_project'] === "Pause") {
            fs++;
        }
        check[0] = userData[fs]['task_project'];
        
        for(let i of userData) {
            if(!(i['task_project'] === "Pause")) {

                if(!(check.indexOf(i['task_project'])>-1)) {
                    check.push(i['task_project']);
                    projectAmount++;
                }
            }
        }

        fillSideBarTables(projectAmount,check,userData);
    }

    catch(e) {
        fillSideBarTables(0,check,userData);
    }
}

function fillSideBarTables(amount, check, data) {

    if(amount>0) {
        let projectColumns = ["entry", "date", "start", "hours"];
        let thEntries = ["Eintrag", "Datum", "Beginn", "Stunden"];
        let bottomDisplay = "";
        check.sort();
        for(let i=0;i<amount;i++){

            bottomDisplay += "<div class='bottom_element'>";
            let sideTable = "";
            sideTable +=    "<table id='" + check[i] + "_table' class='project_table'>\n" +
                            "   <caption><strong>" + check[i] + "</strong></caption>\n" +
                            "   <thead class='project_head'>\n" +
                            "       <tr>\n"; 
            for(let j=0; j<thEntries.length; j++) {
                sideTable +="           <th id='" + projectColumns[j] + "'>" + thEntries[j] + "</th>\n"
            }
            sideTable +=    "       </tr>\n" +
                            "   </thead>\n" +
                            "   <tbody id='work_body'>\n";

            for(let d of data){
                if(check[i] == d['task_project']) {
                    let row = d;
                    let dateHelp = (row['task_date']).split("-");
                    let dateValue = dateHelp[2] + "." + dateHelp[1] + "." + dateHelp[0];
                    sideTable +="       <tr>\n";
                    let tdEntries = [row['task_entry'], dateValue, row['task_start'], row['task_hours']];
                    for(let k =0; k<projectColumns.length; k++) {
                        sideTable += tableSetup(projectColumns[k]) + tdEntries[k] + "'></td>\n";
                    }
                }
            }

            sideTable +=    "</tbody>" +
                            "</table>";
            bottomDisplay += sideTable;
            bottomDisplay += "</div>";
        }
        $('#bottom_display').html(bottomDisplay);
    }
    else $('#bottom_display').html("No Project Data.");
}

function refreshTime() {
    let displayedTime = document.getElementById('clock');
    let currentTime = new Date().toLocaleTimeString();
    let formattedTime = currentTime.replace(",","-");
    displayedTime.textContent = formattedTime;
}setInterval(refreshTime,1000);

function tableSetup(caseStr) {
    let posClass = "";
    let elementClass = "";
    let size = "size='11'";
    if(caseStr === 'entry') {
        posClass = "class='entry_class' ";
        size = "size='20'";
    }
    if(caseStr === 'index' || caseStr === 'user') elementClass = "class='hidden_column' ";
    let returnStr = "     <td headers='" + caseStr + "'" + elementClass + "><input type='text' " + size + posClass + "onchange='valueEqualize(this)' name='" + caseStr + "[]' value='"
    return returnStr;
}

function dateSetup() {

    currentDay = dateStr;
    let dateHelp = dateStr.split(".");
    currentWeek = getWeekNumber(dateHelp) + "." + dateHelp[2];
    dateHelp.shift();
    setMonthDisplay(dateHelp);

}

function displaySwap(displayString) {
    switch (displayString) {
        case displayOptions[0]: setMonthDisplay(currentMonth.split(".")); break;
        case displayOptions[1]: setWeekDisplay(currentWeek.split(".")); break;
        case displayOptions[2]: setDayDisplay(currentDay.split(".")); break;
        default: setMonthDisplay(currentMonth.split("."));
    }
}

function setMonthDisplay(dateArray) {

    if(dateArray[0] < 10) dateArray[0] = "0" + (parseInt(dateArray[0]));

    currentMonth = dateArray[0] + "." + dateArray[1];
    let displayMonth = "Arbeitszeiten " + months[parseInt(dateArray[0])-1] + " " + dateArray[1];
    $('#table_caption').html(displayMonth);
    currentDisplay = currentMonth;
    structureSite("month");
}

function setWeekDisplay(dateArray) {
    currentWeek = dateArray[0] + "." + dateArray[1];
    let displayWeek = "Arbeitszeiten Woche" + dateArray[0] + " " + dateArray[1];
    $('#table_caption').html(displayWeek);
    currentDisplay = currentWeek;
    structureSite("week");
}

function setDayDisplay(dateArray) {

    let dayHelp = parseInt(dateArray[0]);
    let monthHelp = parseInt(dateArray[1]);
    
    if(dayHelp<10) dateArray[0] = "0" + dayHelp;
    if(monthHelp<10) dateArray[1] = "0" + monthHelp;
    
    currentDay = dateArray[0] + "." + dateArray[1] + "." + dateArray[2];
    let displayDay = "Arbeitszeiten " + dateArray[0] + " " + dateArray[1] + " " + dateArray[2];
    $('#table_caption').html(displayDay);
    currentDisplay = currentDay;
    structureSite("day");
}

function getWeekNumber (dateArray) {
     let dateHelp = new Date(Date.UTC(dateArray[2], dateArray[1]-1, dateArray[0])); // create UTC date
     dateHelp.setUTCDate(dateHelp.getUTCDate() + 4 - (dateHelp.getUTCDay()||7)); // set to nearest thursday
     let yearStart = new Date(Date.UTC(dateArray[2],0,1)); // first day of the year
     let week = Math.ceil(( ( (dateHelp - yearStart) / 86400000) + 1) / 7);
     return (week);
}

function weekReverse(weekString) {
    
    let dayCount = weekString[0]*7; // total days for all weeks
    let monthInc = 1; // January is 1st month
    let daysInMonth = 31; // setting January Days
    let febDays = ((weekString[1]%4) === 0) ? 29 : 28; // checking for leap year

    while(dayCount>daysInMonth) { // check if month needs to be advanced
        dayCount -= daysInMonth; // reduce the restamount of days by the days in the relevent month
        switch(monthInc) {
            case 1: 
                daysInMonth = febDays; monthInc++; break; // January is extra Because Febuary has reduced amount of days
            case 2: case 4: case 6: case 7: case 9: case 11: // followed by longer Month
                daysInMonth = 31; monthInc++; break;
            case 3: case 5: case 8: case 10: // followed by shorter Month
                daysInMonth = 30; monthInc++; break;
            case 12: // End of the Year, Weeks should not go beyond this
                weekString[1] = parseInt(weekString[1]) + 1; // advance year
                dayCount = 1;
                monthInc = 1;
                break;
            default: monthInc++;
        }
    }

    let dateHelp = new Date(Date.UTC(weekString[1], monthInc-1, dayCount)); // create UTC date for the current week
    dateHelp.setUTCDate(dateHelp.getUTCDate() + 1 - (dateHelp.getUTCDay()||7)); // set to nearest monday
    return [dateHelp.getDate(), dateHelp.getMonth() + 1, dateHelp.getFullYear()];
}