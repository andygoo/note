
var S = {};

(function() {

	var tagsrc = (thistag = document.getElementsByTagName('script'))[thistag.length-1].src; 
	var jsfolder = tagsrc.replace(/load.js([?].+)?/, '');

	var dependencies = [
		['jquery-1.4.4.js', function() { return (typeof window['jQuery'] != 'undefined'); }],
		['json2.js', function() { return (typeof window['JSON'] != 'undefined'); }]
	];
	
	var head = document.getElementsByTagName('head')[0];
	
 	(loadDep = function(depPos) {
		if(depPos >= dependencies.length) { init(); return; }
		var dep = dependencies[depPos];
	   
		if(!dep[1]()) {  
			var newdep = document.createElement('script');
			newdep.type = 'text/javascript';
			newdep.src = jsfolder + dep[0];

			if(newdep.readyState){ 
				newdep.onreadystatechange = function(){ 
					if(this.readyState == 'loaded' || this.readyState == 'complete'){ 
						loadDep(depPos + 1);
					} 
				} 
			}else{ 
				newdep.onload = function(){ 
					loadDep(depPos + 1);
				} 
			}
			
			head.appendChild(newdep);
		} else loadDep(depPos + 1);
	})(0); 
	
	var init = function() {
        //if(tagsrc.match(/[?]php$/)) {
			alert(tagsrc.match(/[?](.*)$/));
        //}
	};

})();