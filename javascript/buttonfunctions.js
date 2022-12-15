let date = new Date();
let month = parseInt(date.getMonth())+1;
let dateStr = date.getDate() + '.' + month + '.' + date.getFullYear();
let switchTime = roundToMinute(date);
let isEnd = false;

function setupTimeButtons() {

    $('#previous_time_button').click(function(event) {
        event.preventDefault();
        showPreviousDate($('#range_selection').val());
    });

    $('#next_time_button').click(function(event) {
        event.preventDefault();
        showNextDate($('#range_selection').val());
    });

    $('#submit_date_selection').click(function(event) {
        event.preventDefault();
        dateSelectionSetup();
    });

}

function dateSelectionSetup() {
    let yearStr = $('#year_selector').val();
    let monthStr = $('#month_selector').val();
    let dayStr = $('#day_selector').val();
    let displayStr = $('#range_selection').val();

    switch(displayStr) {

        case displayOptions[0]: 
            currentMonth = monthStr + "." + yearStr;
            break;
        case displayOptions[1]:  
            currentWeek = getWeekNumber([dayStr, monthStr, yearStr]) + "." + yearStr;
            break;
        case displayOptions[2]: 
            currentDay = dayStr + "." + monthStr + "." + yearStr;
            break;
        default: return;
    }

    displaySwap(displayStr);
}

function showEditButtons() {

    let buttonContainer =   "<button type='button' class='edit_table_button' id='start_day_button'>Tag Beginnen</button>\n" +
                            "<button type='button' class='edit_table_button' id='switch_button'>Project Wechseln</button>\n" +
                            "<button type='button' class='edit_table_button' id='end_day_button'>Tag Beenden</button>\n" +
                            "<button type='button' class='edit_table_button' id='save_changes_button'>Änderungen Speichern</button>\n" +
                            "<button type='button' class='edit_table_button' id='delete_row_button'>Zeile Löschen</button>\n";
    $('#table_editing').html(buttonContainer);

    let closeButton = "<button type='button' id='close_selection_button'>Bearbeitung beenden</button>\n";
    $('#close_switch_container').html(closeButton);

    setupEdits();
}

function setupEdits() {

    $('#switch_button').click(function (event) {
        listenerStandard(event, "Projekt Wechseln");
        switchSubmit();
    });
    
    $('#start_day_button').click(function(event) {
        listenerStandard(event, "Tag Beginnen");
        startSubmit();
    });

    $('#end_day_button').click(function(event) {
        isEnd = true;
        listenerStandard(event, "Tag Beenden");
        endSubmit();
    });

    $('#save_changes_button').click(function(event) {
        event.preventDefault();
        sendTable();
    });

    $('#delete_row_button').click(function(event) {
        event.preventDefault();
        rowDeletion();
    });

    $('#close_selection_button').click(function(event) {
        event.preventDefault();
        setupSelectionContainer();
    });

    setUpCloseButton();
}

function setUpCloseButton() {

    $('#close_selection_button').click(function(event) {
        event.preventDefault();
        setupSelectionContainer();
    });
}

function listenerStandard(event, title) {

    event.preventDefault();

    let selectionContent = "";

    selectionContent += "<h3>" + title + "</h3>\n" +
                        "<input type='text' name='entry_Text' id='entry_Text'>\n" +
                        "<div class='table_entry_content'>\n";

    switch (title) { 
        case "Tag Beginnen":
            selectionContent += includeProjectSelection();
            selectionContent += includeStartTime();
            break;
        case "Projekt Wechseln":
            selectionContent += includeProjectSelection();
            selectionContent += includeStopTime();
            selectionContent += includeStartTime();
            break;
        case "Tag Beenden":
            selectionContent += includeStopTime();
            break;
        default: selectionContent += "";
    }

    selectionContent += "<div>\n" +
                        "   <label for save_confirmation id='save_edit_label'>Speichern:</label>\n" +
                        "   <input type='checkbox' id='save_confirmation' unchecked>\n" +
                        "</div>\n" +
                        "   <button type='button' class='input_button' id='confirm_switch'>Tabelle aktualisieren</button>\n" +
                        "</div>";
    $('#selection_container').html(selectionContent);

}

function switchSubmit() {

    $('#confirm_switch').click(function (event) {
        event.preventDefault();
 
        let userName = $('#target_user').val();
 
        let calcTime = $('#target_start').val();
        let array = calcTime.split(":");
        let calcMinutes = (parseFloat(array[0])*60)+(parseFloat(array[1]));
 
        let endTime = $('#edit_time_end').val();
        array = endTime.split(":");
        let endMinutes = (parseFloat(array[0])*60)+(parseFloat(array[1]));
        $('#target_end').attr('value',endTime);
 
        let hours = parseFloat((endMinutes-calcMinutes)/60).toFixed(2);
        $('#target_hours').attr('value',hours);

        let startTime = $('#edit_time_start').val();

        removeIds();
       
        let row = "<tr>";
        let tdEntries = ["", userName, $('#entry_Text').val(), dateStr, startTime, "", $('#project_selection').val(), ""];
        for(let i=0; i< columnNames.length; i++) {
            row += htmlSetup(columnNames[i]) + tdEntries[i] + "'></td>\n";
        }
        row += "</tr>"

        $('#work_body').append(row);
        openSaveFunction();
    });   
} 

function startSubmit() {

    $('#confirm_switch').click(function (event) {

        event.preventDefault();
 
        let userName = $('#target_user').val();
        let startTime = $('#edit_time_start').val();
        let check = parseInt($('#target_date').val());
 
        if(check == 0) {
         $('#setup_row').remove();
        }
        
        else {
            removeIds();
        }

        let row = "<tr>";
        let tdEntries = ["", userName, $('#entry_Text').val(), dateStr, startTime, "", $('#project_selection').val(), ""];
        for(let i=0; i< columnNames.length; i++) {
            row += htmlSetup(columnNames[i]) + tdEntries[i] + "'></td>\n";
        }
        row += "</tr>"

        $('#work_body').append(row);
        openSaveFunction();
    });   
}

function endSubmit() {

    $('#confirm_switch').click(function (event) {
       event.preventDefault();

       let calcTime = $('#target_start').val();
       let array = calcTime.split(":");
       let calcMinutes = (parseFloat(array[0])*60)+(parseFloat(array[1]));

       let switchTime = $('#edit_time_end').val();
       array = switchTime.split(":");
       let switchMinutes = (parseFloat(array[0])*60)+(parseFloat(array[1]));
       $('#target_end').attr('value',switchTime);

       let hours = parseFloat((switchMinutes-calcMinutes)/60).toFixed(2);
       $('#target_hours').attr('value',hours);

       $('#target_entry').attr($('value','#entry_Text').val());
       openSaveFunction();
    });   
}

function showInsertButtons() {

    let buttonContainer =   "<button type='button' class='edit_table_button' id='time_button'>Anfangs- und Endzeit eingeben</button>\n";
    $('#table_editing').html(buttonContainer);

    let closeButton = "<button type='button' id='close_selection_button'>Bearbeitung beenden</button>\n";
    $('#close_switch_container').html(closeButton);

    setupInsert();
}

function setupInsert() {

    $('#start_end_time_button').click(function (event) {
        insertStandardEvent(event, "Anfangs- und Endzeit eingeben");
        startEndSubmit();
    });
    
    setUpCloseButton();

}

function insertStandardEvent(event, title) {

    event.preventDefault();

    let selectionContent = "";

    selectionContent += "<h3>" + title + "</h3>\n" +
                        "<input type='text' name='entry_Text' id='entry_Text'>\n" +
                        "<div class='table_entry_content'>\n";

    switch (title) { 
        case "Anfangs- und Endzeit eingeben":
            selectionContent += includeTimeEntry();
            selectionContent += includeProjectSelection();
            break;
        default: selectionContent += "";
    }

    selectionContent += "<div>\n" +
                        "   <label for save_confirmation id='save_edit_label'>Speichern:</label>\n" +
                        "   <input type='checkbox' id='save_confirmation' unchecked>\n" +
                        "</div>\n" +
                        "   <button type='button' class='input_button' id='confirm_switch'>Tabelle aktualisieren</button>\n" +
                        "</div>";
    $('#selection_container').html(selectionContent);

}

function includeProjectSelection() {
    let string= "<div>\n" +
                "   <label for project_selection><b>Projekt:</b></label>\n" + 
                "   <select id='project_selection'>\n" +
                "       <option>Projekt1</option>\n" +
                "       <option>Projekt2</option>\n" +
                "       <option>Projekt3</option>\n" +
                "       <option>Projekt4</option>\n" +
                "       <option>Pause</option>\n" +
                "   </select>\n" +
                "</div>\n";
    return string;
}

function includeStopTime() {
    let string= "<div>\n" +
                "   <label for edit_time_end><b>Endzeit letztes Projekt:</b></label>\n" +
                "   <input type='time' name='Time_offset' value=" + switchTime + " id='edit_time_end'>\n" +
                "</div>\n";
    return string;
}

function includeStartTime() {
    let string= "<div>\n" +
                "   <label for edit_time_start><b>Anfangszeit nächstes Projekt:</b></label>\n" +
                "   <input type='time' name='Time_offset' value=" + switchTime + " id='edit_time_start'>\n" +
                "</div>\n";
    return string;
}

function includeTimeEntry() {
    let string= "<div>\n" +
                "   <label for edit_time_start><b>Zeitangabe:</b></label>\n" +
                "   <input type='text' name='Time_offset' value=" + switchTime + " id='edit_time_start'>\n" +
                "</div>\n";
    return string;
}

function openSaveFunction() {

    let box = document.getElementById('save_confirmation');
    
    if(box.checked) sendTable(); 
    
    $('#selection_container').empty();
}

function sendTable(){

    let saveForm =  "<form method='post' name= 'save_form' action='save.php' id='table_form'>\n";
    $('#main_content').find('td').each(function(){
        saveForm += $(this).html();
    });
    saveForm +="</form>";
    $('#save_form').html(saveForm);

    let data = new FormData(document.getElementById('table_form'));

    let request = new XMLHttpRequest();
    request.addEventListener('load', function(event) {
        if (request.status >= 200 && request.status < 300) {
            console.log(request.responseText);
        } 
        else console.log(request.responseText);
    });
    request.open("POST","../php/save.php");
    request.send(data);
    $('#save_form').empty();
    init();
}  

function htmlSetup(caseStr) {
    let idxClass = "";
    let elementClass = "";
    let size = "size='11'"
    if(caseStr === 'index' || caseStr === 'entry') {
        idxClass = "class='" + caseStr + "_class' ";
        size = "size='20'"
    }
    if(caseStr === 'index' || caseStr === 'user') elementClass = "class='hidden_column' ";
    let returnStr = "     <td headers='" + caseStr + "'" + elementClass + "><input type='text'" + size + idxClass + " onchange='valueEqualize(this)' id='target_" + caseStr + "' name='" + caseStr + "[]' value='"
    return returnStr;
}

function valueEqualize(element) {
    element.setAttribute('value',element.value);
}

function removeIds() {
    let removeList = ['target_index', 'target_user', 'target_entry', 'target_date', 'target_start', 'target_end', 'target_project', 'target_hours'];
    for(let i=0; i<removeList.length; i++) {
        $('#' + removeList[i]).removeAttr('id');
    }
}

function roundToMinute(date) {
    p = 5 * 60 * 1000; // milliseconds in a quarterhour
    let quarter = new Date(Math.round(date.getTime() / p ) * p);
    return quarter.toLocaleTimeString();
}

function rowDeletion() {
    
    $('#main_head').find('tr').append( "<th id='delete_head' name='delete'>Löschen</th>");
    
    let rowsToRemove = [];
    let rows = document.getElementById('work_body').getElementsByTagName('tr');
    for (let i=0; i<rows.length; i++) {
        rows[i].innerHTML += "<td><input type='checkbox' class='delete_input' id='delete_check" + i + "' unchecked></td>";
    }

    $('#table_editing').append("<button type='button' id='delete_confirm_button'>Ausgewählte Zeilen Löschen</button>");

    $('#delete_confirm_button').click(function (event) {
       event.preventDefault();

       $('.delete_input').filter(function(){
        let r = $(this).siblings('.index_class').val();
        rowsToRemove.push(r);
        return $(this).prop('checked');
       }).parentsUntil('tbody').remove();

       $('.delete_input').parent().remove();
       $('#delete_head').remove();
       $('#delete_confirm_button').remove();
    }); 
}

function showPreviousDate(displayString) {

    if(displayString == displayOptions[0]) {
        let monthHelp = currentMonth.split(".");

        if(monthHelp[0]<11){
            if(monthHelp[0]<2){
                monthHelp[1]--;
                monthHelp[0] = 12;
            }
            else monthHelp[0] = "0" + (parseInt(monthHelp[0])-1);
        }
        else {
            monthHelp[0]--;
        }
        setMonthDisplay(monthHelp);
    }

    else if(displayString == displayOptions[1]) {
        let weekHelp = currentWeek.split(".");
    
        if(weekHelp[0]<11){
            if(weekHelp[0]<2){
                weekHelp[1]--;
                weekHelp[0] = getWeekNumber([31, 12, weekHelp[1]]);
            }
            else weekHelp[0] = "0" + (parseInt(weekHelp[0])-1);
        }
        else {
            weekHelp[0]--;
        }
        setWeekDisplay(weekHelp);
    }

    else {
        let dayHelp = currentDay.split(".");
        let dateHelp = new Date(dayHelp[2], dayHelp[1]-1, dayHelp[0]);
        
        if((dateHelp.getUTCDay()) == 0) { // check for Mondays
            dayHelp[0] = parseInt(dayHelp[0]) - 2;
        }
        dayHelp[0]--;
        
        if(dayHelp[0]<10){
            if(dayHelp[0]<1){ // check for beginning of month
                dateHelp = new Date(dayHelp[2], dayHelp[1]-1, 0); // create new Date to get the number of days of the previous month 
                dayHelp[2] = dateHelp.getFullYear();
                dayHelp[1] = dateHelp.getMonth()+1;
                dayHelp[0] = dateHelp.getDate() + dayHelp[0];
            }
            else dayHelp[0] = "0" + (parseInt(dayHelp[0]));
        }

        setDayDisplay(dayHelp);
    }
}

function showNextDate(displayString) {

    if(displayString == displayOptions[0]) {

        let monthHelp = currentMonth.split(".");
    
        if(monthHelp[0]<9){
            monthHelp[0] = "0" + (parseInt(monthHelp[0])+1);
        }
        else {
            if(monthHelp[0]>11) {
                monthHelp[1]++;
                monthHelp[0] = "01";
            }
            else monthHelp[0]++;
        }
        setMonthDisplay(monthHelp);
    }

    else if(displayString == displayOptions[1]) {
        
        let weekHelp = currentWeek.split(".");
    
        if(weekHelp[0]<9){
            weekHelp[0] = "0" + (parseInt(weekHelp[0])+1);
        }
        else {
            let maxWeek = getWeekNumber([31, 12, weekHelp[1]])
            if(weekHelp[0]>(maxWeek-1)) {
                weekHelp[1]++;
                weekHelp[0] = "01";
            }
            else weekHelp[0]++;
        }
        setWeekDisplay(weekHelp);
    }

    else {

        let dayHelp = currentDay.split(".");
        let dateHelp = new Date(dayHelp[2], dayHelp[1]-1, dayHelp[0]);
        
        if((dateHelp.getUTCDay()) == 4) { // check for Fridays
            dayHelp[0] = parseInt(dayHelp[0]) + 2;
        }
        dayHelp[0]++;

        dateHelp = new Date(dayHelp[2], dayHelp[1], 0); // create new Date to get the number of days of the current month 
        let endCheck = dateHelp.getDate() - parseInt(dayHelp[0]);
        
        if(endCheck<0){ // checking for end of Month
            if(dayHelp[1] == 12) { // checking for end of year
                dayHelp[2] = parseInt(dayHelp[2])+1;
                dayHelp[1] = "01";
            }
            else  {
                dayHelp[1]++;
            }
            dayHelp[0] = 1 - endCheck;
        }

        if(dayHelp[1] < 9) dayHelp[1] = "0" + (parseInt(dayHelp[1]));
        if(dayHelp[0] < 9) dayHelp[0] = "0" + (parseInt(dayHelp[0]));

        setDayDisplay(dayHelp);   
    }
}

function timeSubmit() {
    
    $('#confirm_switch').click(function (event) {
        event.preventDefault();
 
        let userName = $('#target_user').val();
 
        let timeString = $('#time_input').val();
        let timeArray = timeString.split(" ");
        let startTime = switchTime;
        let endTime = switchTime;
        let timeHelp = [];
        let duration = 0;
        
        if(timeArray.includes(":")) {
            timeHelp = timeArray.filter((a) => a.includes(":"));
            if(timeHelp.length > 1) {
                endTime = timeHelp[1];
            }
            startTime = timeHelp[0];
        }

        if(timeHelp.length < 2) {

            duration = timeParser(timeArray);

            if(timeArray.includes("-")) {
                
                endTime = startTime;
                let array = endTime.split(":");
                let startHelp = [parseInt(array[0]), (parseInt(array[1]) - parseInt(duration))];
                while(startHelp[1]<0) {
                    startHelp[0] = parseInt(startHelp[0]) - 1;
                    startHelp[1] = parseInt(startHelp[1]) + 60;
                }
                startTime = startHelp[0] + ":" + startHelp[1];
            }
            
            else {
                let array = startTime.split(":");
                let endHelp = [parseInt(array[0]), (parseInt(array[1]) + parseInt(duration))];
                while(endHelp[1]<0) {
                    endHelp[0] = parseInt(endHelp[0]) - 1;
                    endHelp[1] = parseInt(endHelp[1]) + 60;
                }
                endTime = endHelp[0] + ":" + endHelp[1];
            }
        }

        else {

            let array = startTime.split(":");
            let startMinutes = (parseFloat(array[0])*60)+(parseFloat(array[1]));
     
            array = endTime.split(":");
            let endMinutes = (parseFloat(array[0])*60)+(parseFloat(array[1]));
     
            duration = parseInt(endMinutes-startMinutes);
        }

        let hours = parseFloat(duration/60).toFixed(2);
       
        let row = "<tr>";
        let tdEntries = ["", userName, $('#entry_Text').val(), dateStr, startTime, endTime, $('#project_selection').val(), hours];
        for(let i=0; i< columnNames.length; i++) {
            row += htmlSetup(columnNames[i]) + tdEntries[i] + "'></td>\n";
        }
        row += "</tr>"

        $('#work_body').append(row);
        openSaveFunction();
    });   
}

function timeParser(timeArray) {

    let hours = 0;
    let minutes = 0;

    if(timeArray.includes("h")) {

        let index = 0;
        index = (timeArray.findIndex(function(item){
            return item.indexOf("h") !== -1;
        }));
        hours = timeArray[index];

        if(timeArray.includes("m")) {

            index = (timeArray.findIndex(function(item){
                return item.indexOf("m") !== -1;
            }));
            minutes = timeArray[index];
        }
    }
    return (parseInt(hours)*60) + parseInt(minutes);
}