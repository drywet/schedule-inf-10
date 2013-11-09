function injectJS(file, callback) {	
	var s = document.createElement('script');
	s.src = chrome.extension.getURL(file);
	s.onload = function() {
	    this.parentNode.removeChild(this);
	    if (callback) callback();
	};
	(document.head||document.documentElement).appendChild(s);
}

injectJS("jquery.js", function(){
	injectJS("jquery-ui.js", function(){
		injectJS("injected.js", function(){
			//
		});
	});
});