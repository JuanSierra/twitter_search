$(function(){
    var viewer = new CardViewer($('#content'));
    var Alert = {
	show: function(msg){
	    $('#alert').fadeIn('slow').html(msg);
	}
    }
    viewer.setAlert(Alert);
    
    $(window).scroll(function(){
		var wintop = $(window).scrollTop();
		var docheight = $(document).height();
		var winheight = $(window).height();
		var scrolltrigger = 0.95;
		
		if  ((wintop/(docheight-winheight)) > scrolltrigger) {
			viewer.addTweets();
		}
    });

    $(document).keypress(function(e){
		if(e.which == 13){
			viewer.searchTweets( $('#searchText').val() );
			$('#alert').hide();
		}
    });
	
    $('#searchText').val('Search');
    $('#searchText').click(function(){$(this).val('')})
    $('#alert').hide();
});