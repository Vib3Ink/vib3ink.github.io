MONTH_NAMES = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

REGEX_1_TO_31 = "\\b([1-9]|[12][0-9]|3[01])\\b";
REGEX_1_TO_30 = "\\b([1-9]|[12][0-9]|30)\\b";
REGEX_1_TO_28 = "\\b([1-9]|1[0-9]|2[0-8])\\b";
MONTH_DATE_RANGE_REGEX = [REGEX_1_TO_31, REGEX_1_TO_28, REGEX_1_TO_31, REGEX_1_TO_30, REGEX_1_TO_31, REGEX_1_TO_30, REGEX_1_TO_31, REGEX_1_TO_31, REGEX_1_TO_30, REGEX_1_TO_31, REGEX_1_TO_30, REGEX_1_TO_31];

var selectedMonthIndex = '0';
var scheduledDate = 0;
var selectedHours24 = 0;
var personalInfoName = "";
var personalInfoPhoneNumber = "";

function CreateMonthPickerOption(monthIdx) {
    monthOptionHtml = '<li class="mdl-list__item"> \
        <span class="mdl-list__item-primary-content"> \
        ' + MONTH_NAMES[monthIdx] + ' \
        </span> \
        <span class="mdl-list__item-secondary-action"> \
        <label class="" for="monthOption' + monthIdx + '"> \
            <input type="radio" id="monthOption' + monthIdx + '" name="monthOption" value="' + monthIdx + '" onchange="onMonthClick(this.value)"/> \
        </label> \
        </span> \
    </li>'
    return $(monthOptionHtml);
}

function PopulateMonthPicker() {
    var NUM_MONTHS_BOOKABLE = 6;
    var thisMonthIdx = new Date().getMonth();
    for(var i = 0; i < NUM_MONTHS_BOOKABLE; ++i) {
        var newMonthOption = CreateMonthPickerOption((thisMonthIdx + i) % 12);
        $("#monthMenu").append(newMonthOption);
    }
}

function DisplayDateInputForMonth(monthIdx) {
    $('#dateCard').css({"display": "block"});
    $('#dateInput').attr("pattern", MONTH_DATE_RANGE_REGEX[monthIdx]);
    $('#dateInputLabel').text('Date of ' + MONTH_NAMES[monthIdx] + '...');
}

function onMonthClick(data) {
    selectedMonthIndex = data;
    DisplayDateInputForMonth(data);
    $('#dateInput').val("");$('#dateInputLabel').text('Date of ' + MONTH_NAMES[data] + '...');
    $('#availableTimesCell').css({"display": "none"});
    $('#submitCell').css({'display' : 'none'});
    $('#personalInfoCell').css({'display' : 'none'});
}

$('#dateInput').keyup(function() {
    var curDateInput = $('#dateInput').val();
    var curMonthDateRange = new RegExp(MONTH_DATE_RANGE_REGEX[selectedMonthIndex]);
    if(curMonthDateRange.test(curDateInput)) {
        $('#availableTimesCell').css({"display": "block"});
        displayAvailableTimes(selectedMonthIndex, curDateInput);
    } else {
        $('#availableTimesCell').css({"display": "none"});
    }
});

function createAvailableTimeOption(scheduledDate) {
    console.log(scheduledDate);
    var result = [];
    var d = scheduledDate;
    for(var i = 8; i < 18; i++) {
        d.setHours(i);
        var hours24 = d.getHours() % 12;
        var hours = hours24;
        if(hours24 == 0) {
            hours = 12;
        }



        var availableTimesHtml = '<li class="mdl-list__item"> \
        <span class="mdl-list__item-primary-content"> \
          ' + MONTH_NAMES[d.getMonth()]+  ' ' + d.getDate() + ', ' + (hours) + ':00\
          ' + (d.getHours() < 12 ? 'am' : 'pm') +' \
        </span> \
        <span class="mdl-list__item-secondary-action"> \
        <label for="availableTimeOption' + i + '"> \
            <input type="radio" id="availableTimeOption' + i + '" class="mdl-radio__button" name="availableTimeOption" value="' + i + '" onchange="onAvailableTimeClick(this.value)"/> \
        </label> \
        </span> \</li>'
        result.push($(availableTimesHtml));
    }
    return result;
}

function displayAvailableTimes(monthIdx, date) {
    $('#availableTimesMenu').empty();
    scheduledDate = new Date();
    if(selectedMonthIndex < scheduledDate.getMonth()) {
        scheduledDate.setFullYear(scheduledDate.getFullYear() + 1);
    }
    scheduledDate.setMonth(monthIdx);
    scheduledDate.setDate(date);

    var availableTimes = createAvailableTimeOption(scheduledDate);
    console.log(availableTimes);
    availableTimes.forEach(function(element) {
        $('#availableTimesMenu').append(element);
    })
}

function onAvailableTimeClick(data) {
    selectedHours24 = data;
    $('#personalInfoCell').css({'display' : 'block'});
    UpdateSubmitText();
    CheckPersonalInfo();
}

function UpdateSubmitText() {
    var hours24 = selectedHours24 % 12;
    var hours = hours24;
    if(hours24 == 0) {
        hours = 12;
    }
    $('#submitText').text("Confirm consultation appointment for " + personalInfoName + ' on ' + MONTH_NAMES[selectedMonthIndex] + ' ' + scheduledDate.getDate() + ', at ' + hours + ':00 ' + (selectedHours24 < 12 ? 'am' : 'pm'));
}

function CheckPersonalInfo() {
    var nameText = personalInfoName;
    var phoneNumberText = personalInfoPhoneNumber;
    if(nameText && phoneNumberText) {
        $('#submitCell').css({'display' : 'block'});
        UpdateSubmitText();
    } else {
        $('#submitCell').css({'display' : 'none'});
    }
}

$('#personalInfoName').keyup(function() {
    personalInfoName = $('#personalInfoName').val();
    CheckPersonalInfo();
});

$('#personalInfoPhoneNumber').keyup(function() {
    personalInfoPhoneNumber = $('#personalInfoPhoneNumber').val();
    CheckPersonalInfo();
});


$('#dateInput').keyup(function() {
    var curDateInput = $('#dateInput').val();
    var curMonthDateRange = new RegExp(MONTH_DATE_RANGE_REGEX[selectedMonthIndex]);
    if(curMonthDateRange.test(curDateInput)) {
        $('#availableTimesCell').css({"display": "block"});
        displayAvailableTimes(selectedMonthIndex, curDateInput);
    } else {
        $('#availableTimesCell').css({"display": "none"});
    }
});

function onSubmitClicked(data) {
    window.location.href="/confirmation/index.html?monthIdx=" + selectedMonthIndex + '&date=' + scheduledDate.getDate() + '&time=' + selectedHours24 + '&name=' + personalInfoName;
}

$(document).ready(function() {
    PopulateMonthPicker();
});