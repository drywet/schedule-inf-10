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
if ( document.URL.indexOf("P201_GROUP") >= 0 ) {
	$(".MainTT").css("white-space","nowrap");
	$(".week").remove();
}



var colors = {"#CDCCFF":0, "#DAE9D9":1, "#FEFED3":2, "#FFFFFF":3, "#8FD3FC":4},
	highlightedColors = ["#458cca", "#4ba951", "#ff9933", "#9e9a9a", "#ef5856"];

$.each($(".footer [name]"), function(k,v){
	var cells = $("[href=#"+$(v).attr("name")+"]").parent();
	var desc = $(v).parent();
	$(v).replaceWith($(v).text());

	$.each(cells, function(k,v){
		var color = $(v).attr("bgcolor");
		if (color === "#FEFEEA") {
			$(v).attr("bgcolor", "#FEFED3");
		}
	});

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

$("head").append('<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />');

var dialogstr = '<div id="dialog"><span id="vk"></span></div>';
$("body").append($(dialogstr));


var initialized = false;

$.getScript("http://vk.com/js/api/openapi.js?101", function(){
	VK.init({apiId: 3948714, onlyWidgets: true});
	var days = $("td.date:not([colspan])");
	$.each(days, function(k,v){
	    $(v).hover(function(){
	        $(v).css("text-decoration", "underline").css("cursor","hand");
	    }, function(){
	        $(v).css("text-decoration", "none").css("cursor","default");
	    });
	    $(v).click(function(){
	    	$("#comments").remove();
	    	$("#vk").append($("<span id='comments' style='float:right'></span>"));
	    	VK.Widgets.Comments("comments", {limit: 10, width:"500px", attach: "*"}, $(v).text());
	    	$("#dialog").dialog({
	    		title: $(v).text(),
	    		resizable: false,
	    		width: 502,
	    		minWidth: 502,
	    		maxWidth: 502,
	    		height:"auto",
	    		minHeight: 100
	    	});
	    	if (!initialized) {
	    		$("#dialog").dialog( "option", "position", ["right", "top"]);
	    	}
	    	initialized = true;
	    	$(".ui-dialog-content").css("padding", "1px");
	    	$(".ui-dialog-content").css("overflow", "hidden");
	    });
	})
});


var scrollBarWidth = getScrollBarWidth();
function getScrollBarWidth () {
  var inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild (inner);

  document.body.appendChild (outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild (outer);

  return (w1 - w2);
};