MONTH_NAMES = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};


$(document).ready(function() {
    var scheduledMonth = getUrlParameter('monthIdx');
    var scheduledDate = getUrlParameter('date');
    var scheduledTime = getUrlParameter('time');
    var scheduledName = getUrlParameter('name');
    var hours24 = scheduledTime % 12;
    var hours = hours24;
    if(hours24 == 0) {
        hours = 12;
    }
    $('#confirmationText').text("We've confirmed " + scheduledName + "'s for " + MONTH_NAMES[scheduledMonth] + ' ' + scheduledDate + ', ' + hours + ':00 ' + (scheduledTime < 12 ? "am" : "pm"));
});