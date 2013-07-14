var SearchRequest = function () {
    this.searchText;
    var url = 'http://search.twitter.com/search.json';
    var params;
    var nextSearch;
    var requester;
    var requesting = false;
    var _beforeSend = function (e) {

    }

    var _notify = function (params) {
        if (requester != null) {
            requester.trigger('requestUpdate', params);
        }
    }

    var _error = function (xhr, options, error) {
        _notify({
                event: 'error',
                data: error
            });
		requesting = false;
    }

    var _success = function (data) {
        nextSearch = data.next_page;
        console.log('nextSearch:'+nextSearch)
		console.log(data);
        _notify({
                event: 'success',
                data: data
            });
		requesting = false;
    }

    var _request = function () {
        console.log('url:'+url)
        if (!requesting) {
            requesting = true;
            $.ajax({
                    url: url + params,
                    type: 'GET',
                    dataType: 'jsonp',
                    beforeSend: _beforeSend,
                    error: _error,
                    success: _success
                });
        }
    }

    this.get = function (searchText, requesterP) {
        this.searchText = searchText;
        params = '?q=' + searchText;
        requester = requesterP;
        //console.log('get ');
        _request();
    }

    this.paginate = function () {
        params = nextSearch;
        _request();
        //'http://search.twitter.com/search.json'+params+'&callback='
    }
}