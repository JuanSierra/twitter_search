var Tweet = function (image, user, userName, text, date) {
    this.userImage = image;
    this.user = '@' + user;
    this.userName = userName;
    this.summary = (text.length>40)?text.substr(0, 40) + ' ...':text;
    this.text = text;
    var d = new Date((date || "").replace(/-/g,"/").replace(/[TZ]/g," "));
    this.date = $.format.date(d, 'h:MM a - dd MMM yyyy')
    var rowElement;

    this.draw = function (rowElement) {
        rowElement = rowElement;
        var article = $('<article />', {
                class: 'card'
            })
            .append(
            $('<header />')
            .append(
                $('<img />', {
                        load: function () {
                            rowElement.trigger('tweetImageLoaded', $(this))
                        },
                        src: this.userImage,
                        alt: this.userName,
                        title: this.userName
                    }))
            .append(
                $('<div />')
                .append($('<p />', {
                            html: (userName.length>13)?userName.substr(0, 13):userName
                        }))
                .append($('<p />', {
                            html: this.user
                        })))
            )
            .append(
                $('<hr />'))
            .append(
                $('<p />', {
                        html: this.summary
                    }))
            .append(
                $('<hr />'))
            .append(
                $('<ul />')
                .append(
                    $('<div />')
                    .append($('<img />',{
                            src:'https://si0.twimg.com/images/dev/cms/intents/icons/reply.png'
                        }) 
                    )
                )
                .append(
                    $('<div />')
                    .append($('<img />',{
                            src:'https://si0.twimg.com/images/dev/cms/intents/icons/retweet.png'
                        }) 
                    )
                )
                .append(
                    $('<div />')
                    .append($('<img />',{
                            src:'https://si0.twimg.com/images/dev/cms/intents/icons/favorite.png'
                        }) 
                    )
                )
            )
            .append(
            $('<div />', {
                    class: 'semicircle'
                }))
            .append(
            $('<div />', {
                    class: 'deep_card',
                    click: function () {
                        $(this).animate({
                                height: 220,
                                easing: "easein"
                            }, 1000)
                        $(this).children('.text2').fadeIn();
                    }
                })
            .append(
                $('<hr class="text2" />').css('display','none'))
            .append(
                $('<p />', {
                        html: this.date,
                        class:'text2'
                        }).css('display','none')
                )
            .append(
                $('<hr class="text2" />').css('display','none'))
            .append(
                $('<p />', {
                        html: this.text,
                        class:'text2'
                    }).css('display','none'))
            .append(
                $('<div />', {
                        html: '<span>... m&aacute;s</span>'
                    })))
            .appendTo(rowElement);
    };
}