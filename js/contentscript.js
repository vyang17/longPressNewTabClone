var host = location.protocol+"//"+location.hostname+location.pathname;
var delem = null;
var cancelflg = false;
var addeventflag = false;
var eventtimerid = null;
var canselclickflag = false;
var mouseupflag = true;
var X,Y;
var optobj = {};
var downpos = {};
downpos.x = 0;
downpos.y = 0;

window.addEventListener("dragstart",onDrag,true);
window.addEventListener('drop', checkPostion,true);
document.addEventListener("visibilitychange", function(e){
	canselclickflag = false;
	mouseupflag = true;
	clearTimeout(eventtimerid);
}, false);
window.addEventListener("contextmenu",function(e){
	if(canselclickflag){
		e.preventDefault();
		e.stopPropagation();
	}
	canselclickflag = false;
},true);

function addTag(){
	if(!addeventflag){
		addeventflag = true;
		window.addEventListener("mousedown",function(e){
			clearTimeout(eventtimerid);
			canselclickflag = false;
			mouseupflag = false;
			cancelflg = false;
			delem = null;
			if(e.button === 0){
				X = e.screenX;
				Y = e.screenY;
			}else{
				X = 0;
				Y = 0;
			}
			checkA(e.target,e.button,e)
			if(e.target&&e.target.tagName === "IMG"){
				delem = null;
			}			
		},true);
		window.addEventListener("mouseup",function(e){
			clearTimeout(eventtimerid);
			mouseupflag = true;
		},true);
	}
}
function onDrag(e){
	mouseupflag = true;
	clearTimeout(eventtimerid);
}
function getSelectedNode(){
    if (document.selection)
    	return document.selection.createRange().parentElement();
    else{
    	var selection = window.getSelection();
    	if (selection.rangeCount > 0)return selection.getRangeAt(0).startContainer.parentNode;
    }
    return;
}
function checkA(elem,button,e,mode){
	if(elem.tagName&&elem.tagName === "A"){
		elem.removeEventListener("mousemove",mouseMoveLink,true);
		elem.addEventListener("mousemove",mouseMoveLink,true);
		elem.removeEventListener("click",clickLink,true);
		elem.addEventListener("click",clickLink,true);
		chrome.runtime.sendMessage({stat:"init",url:host},function(resp){
			if(!resp.opt || !resp.opt.l)return;
			optobj = resp.opt;
			if(button === 0 && optobj.l !== "none"){
				press(e,elem,button);
			}else if(button === 1 && optobj.m !== "none"){
				press(e,elem,button);
			}else if(button === 2 && optobj.r !== "none"){
				press(e,elem,button);
			}
			function press(e,elem,button){
				if(!mouseupflag){
					downpos.x = e.x;
					downpos.y = e.y;
					clearTimeout(eventtimerid);
					eventtimerid = setTimeout(function(){
						clickEmulate(elem,button);
						canselclickflag = true;
					},optobj.waittime);	
				}
			}
		});
		if(getSelectedNode() == elem){
			delem = null;
		}else{
			delem = elem;
		}
	}else if(elem.tagName&&elem.tagName === "BODY"){
		delem = null;
	}else if(elem.parentNode){
		checkA(elem.parentNode,button,e,mode);
	}else{
		delem = null;
	}
}
function checkPostion(e){
	var flg = null;
	if(delem&&!cancelflg&&X&&Y){
		cancelflg = true;
		if(optobj&&optobj.mdrag){
			e.preventDefault();
			e.stopPropagation();
			var x = e.screenX;
			var y = e.screenY;
			optobj.dxval = optobj.dxval -0;
			if(y >= (Y+optobj.dxval)){
				flg = "down";
			}else if(y <= (Y-optobj.dxval)){
				flg = "up";
			}else if(x >= (X+optobj.dxval)){
				flg = "right";
			}else if(x <= (X-optobj.dxval)){
				flg = "left";
			}
			if(flg){
				var elemType = window.document.activeElement.type;
				if((elemType != "text") && (elemType != "textarea")){
					if(flg === "up"){
						clickEmulate(delem,optobj.du,optobj.duurl);
					}else if(flg === "down"){
						clickEmulate(delem,optobj.dd,optobj.ddurl);
					}else if(flg === "right"){
						clickEmulate(delem,optobj.dr,optobj.drurl);
					}else if(flg === "left"){
						clickEmulate(delem,optobj.dl,optobj.dlurl);
					}
				}
				delem = null;
			}else{
				delem = null;
			}
		}else{
			delem = null;
		}
	}
}
function clickLink(e){
	clearTimeout(eventtimerid);
	if(canselclickflag){
		e.preventDefault();
		e.stopPropagation();
	}
	canselclickflag = false;
}
function mouseMoveLink(e){
	if(!mouseupflag){
		if(Math.abs(downpos.x - e.x) > 6){
			clearTimeout(eventtimerid);
			canselclickflag = false;
		}
		if(Math.abs(downpos.y - e.y) > 6){
			clearTimeout(eventtimerid);
			canselclickflag = false;
		}
	}
}
function clickEmulate(elem,button,wurl){
	if(button === 0){
		clcik(elem,optobj.l,optobj.lurl);
	}else if(button === 1){
		clcik(elem,optobj.m,optobj.murl);
	}else if(button === 2){
		clcik(elem,optobj.r,optobj.rurl);	
	}else if(button === "bg"){
		chrome.runtime.sendMessage({tab: "newbg",url:elem.href});
	}else if(button === "new"){
		chrome.runtime.sendMessage({tab: "new",url:elem.href});
	}else if(button === "crnt"){
		chrome.runtime.sendMessage({tab:"url",url:elem.href});
	}else if(button === "copy"){
		chrome.runtime.sendMessage({tab: "copy",url:elem.href});
	}else if(button === "save"){
		chrome.runtime.sendMessage({tab: "save",url:elem.href});
	}else if(button === "web"){
		flg = false;
		chrome.runtime.sendMessage({tab:"new",url:wurl+elem.href});
	}else if(button === "webbg"){
		flg = false;
		chrome.runtime.sendMessage({tab:"newbg",url:wurl+elem.href});
	}
	function clcik(elem,no,wurl){
		var ctrl = false,alt = false,shift = false;
		var flg = true;
		if(no === "bg"){
			flg = false;
			chrome.runtime.sendMessage({tab:"newbg",url:elem.href});
		}else if(no === "wnd"){
			shift = true;					
		}else if(no === "new"){
			flg = false;
			chrome.runtime.sendMessage({tab:"new",url:elem.href});
		}else if(no === "crnt"){
			flg = false;
			chrome.runtime.sendMessage({tab:"url",url:elem.href});
		}else if(no === "copy"){
			chrome.runtime.sendMessage({tab:"copy",url:elem.href});
			flg = false;
		}else if(no === "save"){
			flg = false;
			chrome.runtime.sendMessage({tab:"save",url:elem.href});
		}else if(no === "web"){
			flg = false;
			chrome.runtime.sendMessage({tab:"new",url:wurl+elem.href});
		}else if(no === "webbg"){
			flg = false;
			chrome.runtime.sendMessage({tab:"newbg",url:wurl+elem.href});
		}else{
			flg = false;
		}
		if(flg){
			var types = ['click'];
			for ( var i = 0, l = types.length; i < l; i++){
				var clicker = new MouseEvent(types[i], {
				  'bubbles': true,
				  'cancelable': true,
				  'view': window,
				  'detail': 0,
				  'screenX': 0,
				  'screenY': 0,
				  'clientX': 0,
				  'clientY': 0,
				  'ctrlKey': false,
				  'altKey': false,
				  'shiftKey': false,
				  'metaKey': false,
				  'button': 0,
				  'relatedTarget': null
				});
				elem.dispatchEvent(clicker);
			}
		}			
	}
}
addTag()
