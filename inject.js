setTimeout(function(){
	function format (date) {
	  var dd = date.getDate(),
	      mm = date.getMonth()+1,
	      yyyy = date.getFullYear();
	  return (dd > 9 ? dd : "0"+dd)+"."+mm+"."+yyyy;
	}
	var td = $(".date:contains('"  +  format(new Date())  +  "')");
	td.css('background-color', '#7CFC00');
	td.css('font-weight', 'bold');

	$(".MainTT").css("user-select", "none");
	$(".MainTT").css("cursor", "default");

	var colors = {"#CDCCFF":0, "#DAE9D9":1, "#FEFEEA":2, "#FFFFFF":3},
		highlightedColors = ["#458cca", "#4ba951", "#ff9933", "#9e9a9a"];

	$.each($(".footer [name]"), function(k,v){
		var cells = $("[href=#"+$(v).attr("name")+"]").parent();
		var desc = $(v).parent();
		$(v).replaceWith($(v).text());

		function hoverOn(){
        	desc.css("background-color", "#CCCCCC");
            $.each(cells, function(k,v){
            	var color0 = $(v).attr("bgcolor");
            	$(v).attr("bgcolor0", color0);
            	$(v).attr("bgcolor", highlightedColors[colors[color0]]);
            });
        };
        function hoverOff(){
        	desc.css("background-color", "#FFFFFF");
            $.each(cells, function(k,v){
            	var color0 = $(v).attr("bgcolor0");
            	$(v).attr("bgcolor", color0);
            });
        }

        desc.hover(hoverOn, hoverOff);

    	$.each(cells, function(k,v) {
    		var anchor = $(v).find("a");
    		anchor.replaceWith(anchor.text());
		    $(v).hover(hoverOn, hoverOff);
		});
	});
});