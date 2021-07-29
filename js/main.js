function CreateCard() {
    var cardText = $('<div class="mdl-card__supporting-text"></div>').text("Dynamic Caption");
    var cardTitle = $('<div class="mdl-card__title main-page-card-image"></div>');
    var cardTitleWidth = cardTitle.width();
    cardTitle.css({'background-image': 'url(/img/buttXO.jpg)', 'background-size': 'cover', 'height': cardTitleWidth + 'px'});
    var card = $('<div class="demo-card-wide mdl-card mdl-shadow--2dp"></div>');
    card.append(cardTitle);
    card.append(cardText);

    var mdlCell = $('<div class="mdl-cell mdl-cell--4-col"></div>');
    mdlCell.append(card);
    mdlCell.css({'display': 'flex', 'justify-content': 'center', 'padding': '10px'});

    return mdlCell;
}

function ResizeElements() {
    $('.main-page-card-image').each(function(){
        var cw = $(this).width();
        $(this).css({
            'height': cw + 'px'
        });
    });

};

$(document).ready(function() {
    for(var i = 0; i < 10; ++i) {
        var newCard = CreateCard();
        $("#main-page-tattoo-grid").append(newCard);
    }
    ResizeElements();
});

$(window).resize(ResizeElements);