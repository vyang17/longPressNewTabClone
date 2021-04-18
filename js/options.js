var excptidex = -1;
var excpetoptionarray = [];
var optobj = {};
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

document.addEventListener("DOMContentLoaded",function(e){
	var opt = 	localStorage.getItem("opt_obj");
	if(opt)optobj = JSON.parse(opt);
	var eurlary = optobj.excpetoptionarray;
	if(eurlary.length > 0){
		for(var i = 0; i < eurlary.length; i++){
			excpetoptionarray.push(eurlary[i]);
			createExceptItem(eurlary[i].url);
		}
	}else{
		optobj.excpetoptionarray = [];
	}
	document.getElementById("detectval").value = optobj.waittime;
	document.getElementById("detectvallbl").textContent = optobj.waittime;
	document.getElementById("dragactionleft").value = optobj.l;
	if(optobj.m)document.getElementById("dragactionmiddle").value = optobj.m;
	document.getElementById("dragactionright").value = optobj.r;
	document.getElementById("detectval").addEventListener("change",changeDetectVal,false);
	document.getElementById("addbutton2").addEventListener("click",clickAddButton2,false);
	changeLongPressAction(document.getElementById("dragactionleft"),"l","web_service_lurl_container",true)
	changeLongPressAction(document.getElementById("dragactionmiddle"),"m","web_service_murl_container",true)
	changeLongPressAction(document.getElementById("dragactionright"),"r","web_service_rurl_container",true)
	document.getElementById("web_service_lurl_input").value = optobj.lurl;
	document.getElementById("web_service_murl_input").value = optobj.murl;
	document.getElementById("web_service_rurl_input").value = optobj.rurl;
	document.getElementById("dragactionleft").addEventListener("change",function(e){
		changeLongPressAction(e.currentTarget,"l","web_service_lurl_container");
	},false);
	document.getElementById("dragactionmiddle").addEventListener("change",function(e){
		changeLongPressAction(e.currentTarget,"m","web_service_murl_container");
	},false);
	document.getElementById("dragactionright").addEventListener("change",function(e){
		changeLongPressAction(e.currentTarget,"r","web_service_rurl_container");
	},false);
	document.getElementById("web_service_lurl_input").addEventListener("change",function(e){
		changeWebServiceURL(this,"lurl")
	},false);
	document.getElementById("web_service_murl_input").addEventListener("change",function(e){
		changeWebServiceURL(this,"murl")
	},false);
	document.getElementById("web_service_rurl_input").addEventListener("change",function(e){
		changeWebServiceURL(this,"rurl")
	},false);



	document.getElementById("ddragactionup").value = optobj.du;
	document.getElementById("ddragactiondown").value = optobj.dd;
	document.getElementById("ddragactionleft").value = optobj.dl;
	document.getElementById("ddragactionright").value = optobj.dr;
	document.getElementById("web_service_duurl_input").value = optobj.duurl;
	document.getElementById("web_service_ddurl_input").value = optobj.ddurl;
	document.getElementById("web_service_drurl_input").value = optobj.drurl;
	document.getElementById("web_service_dlurl_input").value = optobj.dlurl;

	changeLongPressAction(document.getElementById("ddragactionup"),"du","web_service_duurl_container",true)
	changeLongPressAction(document.getElementById("ddragactiondown"),"dd","web_service_ddurl_container",true)
	changeLongPressAction(document.getElementById("ddragactionleft"),"dl","web_service_dlurl_container",true)
	changeLongPressAction(document.getElementById("ddragactionright"),"dr","web_service_drurl_container",true)

	document.getElementById("ddragactionup").addEventListener("change",dchangeActionUp,false);
	document.getElementById("ddragactiondown").addEventListener("change",dchangeActionDown,false);
	document.getElementById("ddragactionleft").addEventListener("change",dchangeActionLeft,false);
	document.getElementById("ddragactionright").addEventListener("change",dchangeActionRight,false);




	document.getElementById("ddragactionup").addEventListener("change",function(e){
		changeLongPressAction(e.currentTarget,"du","web_service_duurl_container");
	},false);
	document.getElementById("ddragactiondown").addEventListener("change",function(e){
		changeLongPressAction(e.currentTarget,"dd","web_service_ddurl_container");
	},false);
	document.getElementById("ddragactionleft").addEventListener("change",function(e){
		changeLongPressAction(e.currentTarget,"dl","web_service_dlurl_container");
	},false);
	document.getElementById("ddragactionright").addEventListener("change",function(e){
		changeLongPressAction(e.currentTarget,"dr","web_service_drurl_container");
	},false);

	document.getElementById("web_service_duurl_input").addEventListener("change",function(e){
		changeWebServiceURL(this,"duurl")
	},false);
	document.getElementById("web_service_ddurl_input").addEventListener("change",function(e){
		changeWebServiceURL(this,"ddurl")
	},false);
	document.getElementById("web_service_dlurl_input").addEventListener("change",function(e){
		changeWebServiceURL(this,"dlurl")
	},false);
	document.getElementById("web_service_drurl_input").addEventListener("change",function(e){
		changeWebServiceURL(this,"drurl")
	},false);















	document.getElementById("enabledrag").addEventListener("change",changeEnableDrag,false);
	document.getElementById("ddetectval").addEventListener("change",dchangeDetectVal,false);
	document.getElementById("ddetectval").value = optobj.dxval;
	document.getElementById("ddetectvallbl").textContent = optobj.dxval;
	if(optobj.mdrag){
		document.getElementById("enabledrag").checked = true;
		document.getElementById("dragcontainer").style.display = "block"
	}
}, false);










function changeLongPressAction(elem,optname,contname,cs){
	var val = elem.value;
	if(val === "web" || val === "webbg"){
		document.getElementById(contname).style.visibility = "visible";
	}else{
		document.getElementById(contname).style.visibility = "hidden";
	}
	if(cs)return;
	optobj[optname] = val;
	storeOption();
}
function changeWebServiceURL(elem,optname){
	optobj[optname] = elem.value.replace(/^\s+|\s+$/g, "");
	storeOption();
}








function dchangeActionUp(e){
	var val = this.value;
	optobj.du = val;
	storeOption();
}
function dchangeActionDown(e){
	var val = this.value;
	optobj.dd = val;
	storeOption();
}
function dchangeActionLeft(e){
	var val = this.value;
	optobj.dl = val;
	storeOption();
}
function dchangeActionRight(e){
	var val = this.value;
	optobj.dr = val;
	storeOption();
}
function dchangeDetectVal(e){
	var val = this.value;
	document.getElementById("ddetectvallbl").textContent = val;
	optobj.dxval = val;
	storeOption();
}
function changeEnableDrag(e){
	if (this.checked) {
		optobj.mdrag = true;
		document.getElementById("dragcontainer").style.display = "block"
	}else{
		optobj.mdrag = false;
		document.getElementById("dragcontainer").style.display = "none"
	};
	storeOption();
}
function changeDetectVal(e){
	var val = this.value;
	document.getElementById("detectvallbl").textContent = val;
	optobj.waittime = val;
	storeOption();
}
function createExceptItem(inpuval){
	excptidex++;
	var maincont = document.getElementById("exceptpopupllist");

	var cont = document.createElement("div");
	maincont.appendChild(cont);
	cont.setAttribute("class","oinputcontclass");

	var cimg = document.createElement("img");
	cont.appendChild(cimg);
	cimg.setAttribute("src","img/closee.png");
	cimg.setAttribute("class","closeimgclass");
	cimg.index = excptidex;
	cimg.addEventListener("click",clickCloseImg2,false);

	var inpt = document.createElement("input");
	cont.appendChild(inpt);
	inpt.setAttribute("type","text");
	inpt.setAttribute("class","openurlitemclass");
	inpt.setAttribute("placeholder","URL");
	inpt.index = excptidex;
	inpt.value = inpuval;
	inpt.addEventListener("blur",blurExceptInput,false);
	inpt.setAttribute("id","exceptinput"+excptidex);
}
function blurExceptInput(e){
	var row = e.currentTarget;
	var val = row.value;
	val = val.replace(/^\s+|\s+$/g, "");
	if(val){
		setExceptOption(val,row.index);
	}else{
		setExceptOption(null,row.index);
		var prntnd = row.parentNode;
		prntnd.parentNode.removeChild(prntnd);
	}
}
function setExceptOption(val,index){
	if(val){
		var optionobj = {};
		optionobj.url = val;
		optionobj.sel = "1"	;	
		excpetoptionarray[index] = optionobj;
	}else{
		excpetoptionarray[index] = null;
	}

	var opt =[];
	for(var i = 0; i < excpetoptionarray.length; i++){
		if(excpetoptionarray[i]){
			opt.push(excpetoptionarray[i]);
		}
	}
	optobj.excpetoptionarray = opt;
	storeOption();
}
function clickCloseImg2(e){
	var eindx = e.currentTarget.index;
	var row = document.getElementById("exceptinput"+eindx);
	row.focus();
	row.value = "";
	row.blur();
}
function clickAddButton2(){
	createExceptItem("");
}
function storeOption(){
	localStorage.setItem("opt_obj",JSON.stringify(optobj));
    chrome.runtime.getBackgroundPage(function(bgpage){
		bgpage.setOption(optobj);
	});
}
