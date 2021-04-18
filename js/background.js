var optobj = {};
function checkExceptList(url,list){
	if(list){
		var len = list.length;
	    for(var i = 0; i < len; i++){
	    	var lurl = list[i].url;
	        var regex = new RegExp(lurl);
	        if (url.search(regex) != -1) {
	            return list[i];
	        }
		    if(lurl.match(/^(http|https):\/\/.+$/)){
		    	var idx = url.indexOf(lurl);
				if(idx == 0){
					return list[i];
				}
		    }else{
		    	var urlary = url.split("/");
		    	if(urlary[2]){
			    	var domain = urlary[2];
			    	var idx = domain.indexOf(lurl);
					if(idx == 0){
						return list[i];
					}
			        var regex = new RegExp(lurl);
			        if (domain.search(regex) != -1) {
			            return list[i];
			        }
		    	}
		    }
	    }
	}
    return null;
}
function setOption(opt){optobj = opt}
function loadOption(){
	var lclobj = localStorage.getItem("opt_obj");
	if(lclobj){
		optobj = JSON.parse(lclobj);
	}else{
		optobj.excpetoptionarray = [];
		optobj.l = "bg";
		optobj.m = "none";
		optobj.r = "none";
		optobj.waittime = 350;
		optobj.mdrag = false;
		optobj.dl = "none";
		optobj.dr = "none";
		optobj.du = "none";
		optobj.dd = "none";
		optobj.dxval = 100;
        optobj.lurl = "";
        optobj.murl = "";
        optobj.rurl = "";
        optobj.dlurl = "";
        optobj.drurl = "";
        optobj.duurl = "";
        optobj.ddurl = "";
	}
}
function downloadItems(url){
    var opt = {saveAs:true,url:url};
    chrome.downloads.download(opt,function(dlid){
    });
}
function copyStrings(str){
    var inpt = document.createElement("input");
    document.body.appendChild(inpt);
    inpt.setAttribute("type","text");
    inpt.value = str;
    inpt.focus();
    inpt.select();
    document.execCommand("copy");
    setTimeout(function(){
        document.body.removeChild(inpt);
    },1000);
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.stat == "init"){
		loadOption();
		var url = request.url;
		if(!checkExceptList(url,optobj.excpetoptionarray)){
	        sendResponse({request: "stat",opt:optobj});
		}else{
	        sendResponse({});
		}
    }else if(request.tab == "url"){
		var url = request.url;
		var tabid = sender.tab.id;
		if(url){
    		chrome.tabs.update(tabid,{url:url});
		}
        sendResponse({});
    }else if(request.tab == "new"){
		var url = request.url;
		chrome.tabs.create({url:url,active:true});
        sendResponse({});
    }else if(request.tab == "newbg"){
		var url = request.url;
		chrome.tabs.create({url:url,active:false});
        sendResponse({});
    }else if(request.tab == "save"){
		var url = request.url;
    	downloadItems(url);
        sendResponse({});
    }else if(request.tab == "copy"){
		var url = request.url;
		copyStrings(url);        
    }
});
