setTimeout(function(){
	function format (date) {
	  var dd = date.getDate(),
	      mm = date.getMonth()+1,
	      yyyy = date.getFullYear();
	  return (dd > 9 ? dd : "0"+dd)+"."+mm+"."+yyyy;
	}
	var td = $("td:contains('"  +  format(new Date())  +  "')");
	td.css('background-color', '#7CFC00');
	td.css('font-weight', 'bold');
});