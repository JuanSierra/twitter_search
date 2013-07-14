var CardViewer = function (content) {
    var search = new SearchRequest();
    var tweets = [];
    var rows = [];
    var content = content;
    var drawing = false;
    var rowsToCheck = {};
    var emptyRows = 0;
    var rowCount = 0;
    var SUCCESS = 'success';
    var alert;
    
    function parseResults(data) {
	if(data.results.length>0){
	    $.each(data.results, function (index, item) {
		    tweets.push(new Tweet(
			    item.profile_image_url,
			    item.from_user,
			    item.from_user_name,
			    item.text,
			    item.created_at));
		});
	    drawCards();
	}else{
	    alert.show('No se encontraron resultados');
	}
    }

    var requestUpdate = function (e, params) {
        if (params.event == SUCCESS) {
            parseResults(params.data);
        }else{
	    if(alert){
		alert.show(params);
	    }
	}
    }

    $(this).on('requestUpdate', requestUpdate);

    this.addTweets = function () {
        if (tweets.length < 4) {
            search.paginate();
        } else {
            if (!drawing) {
                drawCards();
            }
        }
    }

    this.searchTweets = function (searchText) {
	if(searchText.indexOf('@')!=-1 || searchText.indexOf('#')!=-1)
	{
	    this.alert.show('No use # o @ en la busqueda');
	}else{
	    var tweets = [];
	    content.children('.row').remove();
	    search.get(searchText, $(this));
	}
    }
    
    this.setAlert = function(alertControl){
	alert = alertControl;
    }
    
    var getLastRow = function () {
        return content.children('.row:last-child');
    }

    var tryAddRow = function () {
        if (content.children('.row').length == 0 || getLastRow().children().length == 3) {
            content.append($("<div />", {
                        class: 'row',
                        id: 'row_' + (rowCount++).toString()
                    }));
            emptyRows++;
        }
    }

	function tweetImageLoaded(e, params) {
		var row = $(e.currentTarget);
		var id = row.attr('id');

		if(rowsToCheck[id] === undefined){
			rowsToCheck[id] = 0;
		}
		rowsToCheck[id]++;
		
		if(rowsToCheck[id] == 3){
			row.fadeIn();
			emptyRows--;
		}
		
		if(emptyRows==0){
			drawing = false;
		}
	}

	function drawCards() {
		var nextTweets = (tweets.length > 9) ? 9 : tweets.length;
		var next = null;
		var currentRow = null;
		drawing = true;

		for (var i = 0; i < nextTweets; i++) {
			tryAddRow();
			currentRow = getLastRow();

			next = tweets.shift();
			next.draw(currentRow);
			currentRow.on('tweetImageLoaded', tweetImageLoaded);
		}
	}
}