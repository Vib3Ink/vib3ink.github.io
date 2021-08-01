MONTH_NAMES = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

REGEX_1_TO_31 = "\\b([1-9]|[12][0-9]|3[01])\\b";
REGEX_1_TO_30 = "\\b([1-9]|[12][0-9]|30)\\b";
REGEX_1_TO_28 = "\\b([1-9]|1[0-9]|2[0-8])\\b";
MONTH_DATE_RANGE_REGEX = [REGEX_1_TO_31, REGEX_1_TO_28, REGEX_1_TO_31, REGEX_1_TO_30, REGEX_1_TO_31, REGEX_1_TO_30, REGEX_1_TO_31, REGEX_1_TO_31, REGEX_1_TO_30, REGEX_1_TO_31, REGEX_1_TO_30, REGEX_1_TO_31];


function CreateMonthPickerOption(monthIdx) {
    monthOptionHtml = '<li class="mdl-list__item"> \
        <span class="mdl-list__item-primary-content"> \
        ' + MONTH_NAMES[monthIdx] + ' \
        </span> \
        <span class="mdl-list__item-secondary-action"> \
        <label class="demo-list-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" for="monthOption' + monthIdx + '"> \
            <input type="radio" id="monthOption' + monthIdx + '" class="mdl-radio__button" name="monthOption" value="' + monthIdx + '" onchange="onMonthClick(this.value)"/> \
        </label> \
        </span> \
    </li>'
    return $(monthOptionHtml);
}

function PopulateMonthPicker() {
    var NUM_MONTHS_BOOKABLE = 3;
    var thisMonthIdx = new Date().getMonth();
    for(var i = 0; i < NUM_MONTHS_BOOKABLE; ++i) {
        var newMonthOption = CreateMonthPickerOption(thisMonthIdx + i);
        $("#monthMenu").append(newMonthOption);
    }
}

function DisplayDateInputForMonth(monthIdx) {
    $('#dateCard').css({"display": "block"});
    $('#dateInput').attr("pattern", MONTH_DATE_RANGE_REGEX[monthIdx]);
    $('#dateInputLabel').text('Date of ' + MONTH_NAMES[monthIdx] + '...');
}

function onMonthClick(data) {
    DisplayDateInputForMonth(data);
}

function onDateValueChanged(data) {
    
}


$(document).ready(function() {
    PopulateMonthPicker();
});