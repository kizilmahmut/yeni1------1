////////// XML YÜKLE ////////////////////
function LoadXML(filename)
{
	//var xhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xhttp=new ActiveXObject("Microsoft.XMLDOM");
	}
	//filename=filename+"?"+Math.random();
	xhttp.open("GET",filename,false); filename = "file://tevfikileriaihl.mebk12.tr/meb_iys_dosyalar/54/01/764823/xml/dikmenu.xml"
	xhttp.send();
	return (xhttp.responseXML);
}
//////////browser kontrol//////////////////
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
		|| this.searchVersion(navigator.appVersion)
		|| "an unknown version";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
				return data[i].identity;
			}
			else if (dataProp)
			return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	]
};
BrowserDetect.init();
///////////////////////////////////////////
var b;
function browserKontrol(){
	if (BrowserDetect.browser=="Explorer")
	{
	  	if(BrowserDetect.version<10){
			b=0;
			/*if(BrowserDetect.version<8){
				//alert('');
			}*/
		}
		else{
			b=1;
		}
	}
	else {
		b=1;
	}
}
////////// YENI UST MENU//////////////////////////////////////////////
function mainMenuItems(xmlDocName,xmlDocNameSub)
{
	browserKontrol();
	xmlDoc=LoadXML(xmlDocName);
	xmlDocSub=LoadXML(xmlDocNameSub);
	x=xmlDoc.getElementsByTagName('menusatir');
	xSub=xmlDocSub.getElementsByTagName('altmenu');
	nameString="";
	menuSayisi=0;
	acilma=0;
	
	for (t=1;t<x.length-1;t++)
	{ 	 		
		if(x[t].childNodes[(1*(b+1))+b].childNodes[0]){
			nameString+=x[t].childNodes[(1*(b+1))+b].childNodes[0].nodeValue+'   '; 
		}
		//alert(nameString);
		menuSayisi=t;
		/*if(nameString.length<110){
			menuSayisi=t;
			alert(t);
			//alert(nameString.length);
		}*/
	}
	//alert(menuSayisi);
	for (i=1;i<menuSayisi+1;i++)
	{ 
		if(x[i].childNodes[(0*(b+1))+b].childNodes[0]){
			menu1=x[i].childNodes[(0*(b+1))+b].childNodes[0].nodeValue;
			}else{
			menu1=""; 
		}
		link=x[i].childNodes[(2*(b+1))+b].childNodes[0].nodeValue;
		if(x[i].childNodes[(1*(b+1))+b].childNodes[0]){
			name=x[i].childNodes[(1*(b+1))+b].childNodes[0].nodeValue; 
			acilma=x[i].attributes.getNamedItem('acilma').value;
			if(link=='' || menu1!=""){
				
				document.write('<li class="menu-item dropdown" data-toggle="tooltip" title="'+name+'"><a href="#" class="dropdown-toggle" data-toggle="dropdown">'+name+'<b class="caret"></b></a>');
				
				}else{
				if(acilma==0){
					document.write('<li  class="menu-item"><a href="'+link+'" >'+name+'</a>');
				}
				if(acilma==2){	
					if(link.indexOf("?")==0){
						document.write('<li  class="menu-item"><a href="'+link+'&amp;KeepThis=true&amp;width=60&amp;height=75&amp;TB_iframe=true" class="thickbox"  >'+name+'</a>');
						}else{
						document.write('<li  class="menu-item"><a href="'+link+'?KeepThis=true&amp;width=60&amp;height=75&amp;TB_iframe=true" class="thickbox"  >'+name+'</a>');
					}					
				}
				if(acilma==1){
					document.write('<li  class="menu-item"><a href="'+link+'" target="_blank">'+name+'</a>');
				}	
			}
			}else{
			name="";
		}
		if(menu1!=""){
			for (k=0;k<xSub.length;k++)
			{
				if(menu1==xSub[k].attributes.getNamedItem('altmenuadi').value){
					document.write('<ul class="dropdown-menu">');
					
					for (j=0;j<((xSub[k].childNodes.length/(b+1))-b);j++)
					{				
						document.write('<li ');
						if(xSub[k].childNodes[(j*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){
							document.write('class="menu-item dropdown dropdown-submenu"');
						}
						link2=xSub[k].childNodes[(j*(b+1))+b].childNodes[(1*(b+1))+b].childNodes[0].nodeValue;
						name2=xSub[k].childNodes[(j*(b+1))+b].childNodes[(0*(b+1))+b].childNodes[0].nodeValue;
						acilma=xSub[k].childNodes[(j*(b+1))+b].attributes.getNamedItem('acilma').value;
						if(acilma==0){
							document.write('><a tabindex="-1" href="'+link2+'"');
							if(xSub[k].childNodes[(j*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){document.write(' class="dropdown-toggle" data-toggle="dropdown"');}
							document.write('>');
						}
						if(acilma==2){
							if(link.indexOf("?")==0){
								document.write('><a tabindex="-1" href="'+link2+'&amp;KeepThis=true&amp;width=60&amp;height=75&amp;TB_iframe=true" class="thickbox" ');
								if(xSub[k].childNodes[(j*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){document.write(' class="dropdown-toggle" data-toggle="dropdown"');}
								document.write('>');
								}else{
								document.write('><a tabindex="-1" href="'+link2+'?KeepThis=true&amp;width=60&amp;height=75&amp;TB_iframe=true" class="thickbox" ');
								if(xSub[k].childNodes[(j*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){document.write(' class="dropdown-toggle" data-toggle="dropdown"');}
								document.write('>');
							}	
							}if(acilma==1){
							document.write('><a tabindex="-1" href="'+link2+'" target="_blank"');
							if(xSub[k].childNodes[(j*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){document.write(' class="dropdown-toggle" data-toggle="dropdown"');}
							document.write('>');
						}						
						document.write(name2+"</a>");
						
						if(xSub[k].childNodes[(j*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){
							menu2=xSub[k].childNodes[(j*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0].nodeValue;
							
							for (m=0;m<xSub.length;m++){
								if(menu2==xSub[m].attributes.getNamedItem('altmenuadi').value){							
									document.write('<ul class="dropdown-menu">');
									for (n=0;n<((xSub[m].childNodes.length/(b+1))-b);n++)
									{
										name3=xSub[m].childNodes[(n*(b+1))+b].childNodes[(0*(b+1))+b].childNodes[0].nodeValue;
										link3=xSub[m].childNodes[(n*(b+1))+b].childNodes[(1*(b+1))+b].childNodes[0].nodeValue;									
										document.write('<li ');
										if(xSub[m].childNodes[(n*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){
											document.write('class="dropdown-submenu"');
										}
										acilma=xSub[m].childNodes[(n*(b+1))+b].attributes.getNamedItem('acilma').value;
										if(acilma==0){
											document.write('><a tabindex="-1" href="'+link3+'"');
											if(xSub[m].childNodes[(n*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){document.write(' class="dropdown-toggle" data-toggle="dropdown"');}
											document.write('>');
										}
										if(acilma==2){
											if(link.indexOf("?")==0){
												document.write('><a tabindex="-1" href="'+link3+'&amp;KeepThis=true&amp;width=60&amp;height=75&amp;TB_iframe=true" class="thickbox" ');
												if(xSub[m].childNodes[(n*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){document.write(' class="dropdown-toggle" data-toggle="dropdown"');}
												document.write('>');
												}else{
												document.write('><a tabindex="-1" href="'+link3+'?KeepThis=true&amp;width=60&amp;height=75&amp;TB_iframe=true" class="thickbox" ');
												if(xSub[m].childNodes[(n*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){document.write(' class="dropdown-toggle" data-toggle="dropdown"');}
												document.write('>');
											}	
											}if(acilma==1){
											document.write('><a tabindex="-1" href="'+link3+'" target="_blank"');
											if(xSub[m].childNodes[(n*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){document.write(' class="dropdown-toggle" data-toggle="dropdown"');}
											document.write('>');
										}
										document.write(name3+'</a>');
										
										if(xSub[m].childNodes[(n*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){
											menu3=xSub[m].childNodes[(n*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0].nodeValue;		
											for (z=0;z<xSub.length;z++){
												if(menu3==xSub[z].attributes.getNamedItem('altmenuadi').value){							
													document.write('<ul class="dropdown-menu ">');
													for (f=0;f<((xSub[z].childNodes.length/(b+1))-b);f++){
														link4=xSub[z].childNodes[(f*(b+1))+b].childNodes[(1*(b+1))+b].childNodes[0].nodeValue;
														name4=xSub[z].childNodes[(f*(b+1))+b].childNodes[(0*(b+1))+b].childNodes[0].nodeValue;
														document.write('<li ');
														////////
														if(xSub[z].childNodes[(f*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){
															document.write('class="dropdown-submenu"');
														}
														////////
														acilma=xSub[z].childNodes[(f*(b+1))+b].attributes.getNamedItem('acilma').value;
														if(acilma==0){
															document.write('><a tabindex="-1" href="'+link4+'"');
															if(xSub[z].childNodes[(f*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){document.write(' class="dropdown-toggle" 	data-toggle="dropdown"');}
															document.write('>');
														}
														if(acilma==2){
															if(link.indexOf("?")==0){
																document.write('><a tabindex="-1" href="'+link4+'&amp;KeepThis=true&amp;width=60&amp;height=75&amp;TB_iframe=true" class="thickbox" ');
																if(xSub[z].childNodes[(f*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){document.write(' class="dropdown-toggle" data-toggle="dropdown"');}
																document.write('>');
																}else{
																document.write('><a tabindex="-1" href="'+link4+'?KeepThis=true&amp;width=60&amp;height=75&amp;TB_iframe=true" class="thickbox" ');
																if(xSub[z].childNodes[(f*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){document.write(' class="dropdown-toggle" data-toggle="dropdown"');}
																document.write('>');
															}	
														}
														if(acilma==1){
															document.write('><a tabindex="-1" href="'+link4+'" target="_blank"');
															if(xSub[z].childNodes[(f*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){document.write(' class="dropdown-toggle" data-toggle="dropdown"');}
															document.write('>');
														}
														document.write(name4+"</a>");
														///////////////////////////////////////////////////////////////////////
														if(xSub[z].childNodes[(f*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){
															menu4=xSub[z].childNodes[(f*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0].nodeValue;		
															for (t=0;t<xSub.length;t++){
																if(menu4==xSub[t].attributes.getNamedItem('altmenuadi').value){							
																	document.write('<ul class="dropdown-menu ">');
																	for (r=0;r<((xSub[t].childNodes.length/(b+1))-b);r++){
																		link5=xSub[t].childNodes[(r*(b+1))+b].childNodes[(1*(b+1))+b].childNodes[0].nodeValue;
																		name5=xSub[t].childNodes[(r*(b+1))+b].childNodes[(0*(b+1))+b].childNodes[0].nodeValue;
																		document.write('<li');
																		////////
																		acilma=xSub[t].childNodes[(r*(b+1))+b].attributes.getNamedItem('acilma').value;
																		if(acilma==0){
																			document.write('><a tabindex="-1" href="'+link5+'"');
																			if(xSub[t].childNodes[(r*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){document.write(' class="dropdown-toggle" 	data-toggle="dropdown"');}
																			document.write('>');
																		}
																		if(acilma==2){
																			if(link.indexOf("?")==0){
																				document.write('><a tabindex="-1" href="'+link4+'&amp;KeepThis=true&amp;width=60&amp;height=75&amp;TB_iframe=true" class="thickbox" ');
																				if(xSub[t].childNodes[(r*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){document.write(' class="dropdown-toggle" data-toggle="dropdown"');}
																				document.write('>');
																				}else{
																				document.write('><a tabindex="-1" href="'+link4+'?KeepThis=true&amp;width=60&amp;height=75&amp;TB_iframe=true" class="thickbox" ');
																				if(xSub[t].childNodes[(r*(b+1))+b].childNodes[(3*(b+1))+b].childNodes[0]){document.write(' class="dropdown-toggle" data-toggle="dropdown"');}
																				document.write('>');
																			}	
																		}
																		if(acilma==1){
																			document.write('><a tabindex="-1" href="'+link5+'" target="_blank">');
																		}
																		document.write(name5+"</a>");
																		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
																		document.write('</li>');
																	}
																	document.write("</ul>");
																}
															}
														}
														////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
														document.write('</li>');
													}
													document.write("</ul>");
												}
											}
										}
										document.write("</li>");
									}
									document.write("</ul>");
								}
							}
						}
						document.write("</li>");
					}
					document.write("</ul>");
				}
			}
		}
		document.write("</li>");
	}
}
////////// YENI ALT MENU//////////////////////////////////////////////
function footerMenuItems(xmlDocName,xmlDocNameSub)
{
	browserKontrol();
	xmlDoc=LoadXML(xmlDocName);
	xmlDocSub=LoadXML(xmlDocNameSub);
	x=xmlDoc.getElementsByTagName('menusatir');
	xSub=xmlDocSub.getElementsByTagName('altmenu');
	sayac=0;
	acilma=0;
	link="";
	for (i=1;i<x.length-1;i++)
	{	
		if(x[i].childNodes[(0*(b+1))+b].childNodes[0] && sayac<4){
			document.write('<div class="one_fifth"><h3 class="widgettitle">');
			if(x[i].childNodes[(0*(b+1))+b].childNodes[0]){
				menuadi=x[i].childNodes[(0*(b+1))+b].childNodes[0].nodeValue;
			}
			else{
				menuadi=null;
			}
			name=x[i].childNodes[(1*(b+1))+b].childNodes[0].nodeValue;
			document.write(name);
			document.write('</h3>');		
			document.write("<ul>");
			for (k=0;k<xSub.length;k++)
			{			 
				for (j=0;j<((xSub[k].childNodes.length/(b+1))-b);j++)
				{
					if(menuadi==xSub[k].attributes.getNamedItem('altmenuadi').value){
						acilma=xSub[k].childNodes[(j*(b+1))+b].attributes.getNamedItem('acilma').value;
						link=xSub[k].childNodes[(j*(b+1))+b].childNodes[(1*(b+1))+b].childNodes[0].nodeValue;
						document.write('<li ');
						if(acilma==0){
							document.write('><a href="'+link+'">');
						}
						if(acilma==2){
							if(link.indexOf("?")==0){
								document.write('><a href="'+link+'&amp;KeepThis=true&amp;width=60&amp;height=75&amp;TB_iframe=true" class="thickbox" >');
								}else{
								document.write('><a href="'+link+'?KeepThis=true&amp;width=60&amp;height=75&amp;TB_iframe=true" class="thickbox" >');
							}	
						}
						if(acilma==1){
							document.write('><a href="'+link+'" target="_blank">');
						}
						document.write(xSub[k].childNodes[(j*(b+1))+b].childNodes[(0*(b+1))+b].childNodes[0].nodeValue+"</a>");
						document.write("</li>");
					}
				}
			}
			document.write("</ul>");
			document.write("</div>");
			sayac++;			
		}
	}
	for (i=1;i<7-x.length;i++){
		document.write('<div class="one_fifth"><h3 class="widgettitle"></h3><ul><li><a href=""></a></li><li><a href=""></a></li></ul></div>');
	}
}