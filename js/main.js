function ResizeElements() {
    $('.main-page-card-image').each(function(){
        var cw = $(this).width();
        $(this).css({
            'height': cw + 'px'
        });
    });
};

function CreateMainPagePosts() {
    $.getJSON("/mainPagePosts/posts.json", function(data){
        data.forEach(function(element) {
            var newCard = CreateCard(element);
            $("#main-page-tattoo-grid").append(newCard);
        });
    }).fail(function() {
        console.log("Failed to read main page posts.");
    }).done(function(){
        ResizeElements();
    });
}

function CreateImageCard(postData) {
    var cardText = $('<div class="mdl-card__supporting-text"></div>').text(postData.text);
    var cardTitle = $('<div class="mdl-card__title main-page-card-image"></div>');
    cardTitle.css({'background-image': 'url(' + postData.image + ')', 'background-size': 'cover', 'background-repeat': 'no-repeat', 'background-position': '50% 50%'});
    var card = $('<div class="demo-card-wide mdl-card mdl-shadow--2dp"></div>');
    card.append(cardTitle);
    card.append(cardText);

    var mdlCell = $('<div class="mdl-cell mdl-cell--4-col"></div>');
    mdlCell.append(card);
    mdlCell.css({'display': 'flex', 'justify-content': 'center', 'padding': '10px'});

    return mdlCell;
}

function CreateTextCard(postData) {
    var cardText = $('<div class="mdl-card__supporting-text"></div>').text(postData.text);
    var cardTitle = $('<div class="mdl-card__title main-page-card-text-title"></div>');
    cardTitle.append($('<h1>' + postData.title + '</h1>'));
    var card = $('<div class="demo-card-wide mdl-card mdl-shadow--2dp"></div>');
    card.append(cardTitle);
    card.append(cardText);
    card.css({'width': '100%'});

    var mdlCell;
    if(postData.size == 'large') {
        mdlCell = $('<div class="mdl-cell mdl-cell--12-col"></div>');
    } else {
        mdlCell = $('<div class="mdl-cell mdl-cell--4-col"></div>');
    }

    mdlCell.append(card);
    mdlCell.css({'display': 'flex', 'justify-content': 'center', 'padding': '10px'});

    return mdlCell;
}

function CreateCard(postData) {
    if(postData.type == "image") {
        return CreateImageCard(postData);
    } else if(postData.type == "text") {
        return CreateTextCard(postData);
    }
}

$(document).ready(function() {
    CreateMainPagePosts();
    ResizeElements();
});

$(window).resize(ResizeElements);