(function($) {
	$(document).ready(function(){
		(function run(){
			var books = $(".real3dflipbook");
			if(books.length == 0){
				setTimeout(function(){ 
					run(); 
				}, 1000);
			}else{
				
				$.each(books, function(){
					// console.log(this)
					var id = $(this).attr('id')
					// var optionsName = 
					// var options = window["options"+id]
					//var options = $(this).find("#options").html()
					var options = window['real3dflipbook_'+id]

					var json_str = options.replace(/&quot;/g, '"');
					json_str = json_str.replace(/“/g, '"');
					json_str = json_str.replace(/”/g, '"');
					json_str = json_str.replace(/″/g, '"');
					json_str = json_str.replace(/„/g, '"');

					json_str = json_str.replace(/«&nbsp;/g, '"');
					json_str = json_str.replace(/&nbsp;»/g, '"');


					options = jQuery.parseJSON(json_str);
					options.assets = {
						preloader:options.rootFolder+"images/preloader.jpg",
						left:options.rootFolder+"images/left.png",
						overlay:options.rootFolder+"images/overlay.jpg",
						flipMp3:options.rootFolder+"mp3/turnPage.mp3",
						shadowPng:options.rootFolder+"images/shadow.png"
					};

					options.pdfjsworkerSrc = options.rootFolder + 'js/pdf.worker.min.js'
					
					function convertStrings(obj){
					
						$.each(obj, function(key, value){
							// console.log(key + ": " + options[key]);
							if(typeof(value) == 'object' || typeof(value) == 'array'){
								convertStrings(value)
							}else if(!isNaN(value)){
								if(obj[key] === "")
									delete obj[key] 
								else
									obj[key] = Number(value)
							}else if(value == "true"){
								obj[key] = true
							}else if(value == "false"){
								obj[key] = false
							}
						});
					
					}
					convertStrings(options)
					//return
					
					for(var i=0;i<options.pages.length;i++){
						if(typeof(options.pages[i].htmlContent) != 'undefined' && options.pages[i].htmlContent != ""&& options.pages[i].htmlContent != "undefined" )
							options.pages[i].htmlContent = unescape(options.pages[i].htmlContent)
						else
							delete options.pages[i].htmlContent
					}

					options.social = [];
					
					if(options.facebook == "") delete options.facebook
					if(options.twitter == "") delete options.twitter
					if(options.google_plus == "") delete options.google_plus
					if(options.pinterest == "") delete options.pinterest
					if(options.email == "") delete options.email
					if(options.pageWidth == "") delete options.pageWidth
					if(options.pageHeight == "") delete options.pageHeight

					if(typeof(options.btnShare) == 'undefined' || !options.btnShare) options.btnShare = {enabled:false}
					if(typeof(options.btnNext) == 'undefined' || !options.btnNext) options.btnNext = {enabled:false}
					if(typeof(options.btnPrev) == 'undefined' || !options.btnPrev) options.btnPrev = {enabled:false}
					if(typeof(options.btnZoomIn) == 'undefined' || !options.btnZoomIn) options.btnZoomIn = {enabled:false}
					if(typeof(options.btnZoomOut) == 'undefined' || !options.btnZoomOut) options.btnZoomOut = {enabled:false}
					if(typeof(options.btnToc) == 'undefined' || !options.btnToc) options.btnToc = {enabled:false}
					if(typeof(options.btnThumbs) == 'undefined' || !options.btnThumbs) options.btnThumbs = {enabled:false}
					if(typeof(options.btnDownloadPages) == 'undefined' || !options.btnDownloadPages) options.btnDownloadPages = {enabled:false}
					if(typeof(options.btnDownloadPdf) == 'undefined' || !options.btnDownloadPdf) options.btnDownloadPdf = {enabled:false}
					if(typeof(options.btnExpand) == 'undefined' || !options.btnExpand) options.btnExpand = {enabled:false}
					if(typeof(options.btnExpandLightbox) == 'undefined' || !options.btnExpandLightbox) options.btnExpandLightbox = {enabled:false}
					if(typeof(options.btnSound) == 'undefined' || !options.btnSound) options.btnSound = {enabled:false}


					// options.btnShare.enabled = (options.socialShare && options.socialShare.length > 0)
					if(typeof(options.btnShare.icon) == 'undefined' || options.btnShare.icon == '') options.btnShare.icon = "fa-share";
					if(typeof(options.btnShare.title) == 'undefined' || options.btnShare.title == '') options.btnShare.title = "Share";

					if(typeof(options.btnNext.icon) == 'undefined' || options.btnNext.icon == '') options.btnNext.icon = "fa-chevron-right";
					if(typeof(options.btnNext.title) == 'undefined' || options.btnNext.title == '') options.btnNext.title = "Next page";

					if(typeof(options.btnPrev.icon) == 'undefined' || options.btnPrev.icon == '') options.btnPrev.icon = "fa-chevron-left";
					if(typeof(options.btnPrev.title) == 'undefined' || options.btnPrev.title == '') options.btnPrev.title = "Previous page";

					if(typeof(options.btnZoomIn.icon) == 'undefined' || options.btnZoomIn.icon == '') options.btnZoomIn.icon = "fa-plus";
					if(typeof(options.btnZoomIn.title) == 'undefined' || options.btnZoomIn.title == '') options.btnZoomIn.title = "Zoom in";

					if(typeof(options.btnZoomOut.icon) == 'undefined' || options.btnZoomOut.icon == '') options.btnZoomOut.icon = "fa-minus";
					if(typeof(options.btnZoomOut.title) == 'undefined' || options.btnZoomOut.title == '') options.btnZoomOut.title = "Zoom out";

					if(typeof(options.btnToc.icon) == 'undefined' || options.btnToc.icon == '') options.btnToc.icon = "fa-list-ol";
					if(typeof(options.btnToc.title) == 'undefined' || options.btnToc.title == '') options.btnToc.title = "Table of content";

					if(typeof(options.btnThumbs.icon) == 'undefined' || options.btnThumbs.icon == '') options.btnThumbs.icon = "fa-th-large";
					if(typeof(options.btnThumbs.title) == 'undefined' || options.btnThumbs.title == '') options.btnThumbs.title = "Pages";

					if(typeof(options.btnDownloadPages.icon) == 'undefined' || options.btnDownloadPages.icon == '') options.btnDownloadPages.icon = "fa-download";
					if(typeof(options.btnDownloadPages.title) == 'undefined' || options.btnDownloadPages.title == '') options.btnDownloadPages.title = "Download pages";
					// if(options.downloadPagesUrl)
						// options.btnDownloadPages.url = options.downloadPagesUrl;

					if(typeof(options.btnDownloadPdf.icon) == 'undefined' || options.btnDownloadPdf.icon == '') options.btnDownloadPdf.icon = "fa-file";
					if(typeof(options.btnDownloadPdf.title) == 'undefined' || options.btnDownloadPdf.title == '') options.btnDownloadPdf.title = "Download PDF";
					// if(options.downloadPdfUrl)
						// options.btnDownloadPdf.url = options.downloadPdfUrl;

					if(typeof(options.btnExpand.icon) == 'undefined' || options.btnExpand.icon == '') options.btnExpand.icon = "fa-expand";
					if(typeof(options.btnExpand.iconAlt) == 'undefined' || options.btnExpand.iconAlt == '') options.btnExpand.iconAlt = "fa-compress";
					if(typeof(options.btnExpand.title) == 'undefined' || options.btnExpand.title == '') options.btnExpand.title = "Toggle fullscreen";

					if(typeof(options.btnExpandLightbox.icon) == 'undefined' || options.btnExpandLightbox.icon == '') options.btnExpandLightbox.icon = "fa-expand";
					if(typeof(options.btnExpandLightbox.iconAlt) == 'undefined' || options.btnExpandLightbox.iconAlt == '') options.btnExpandLightbox.iconAlt = "fa-compress";
					if(typeof(options.btnExpandLightbox.title) == 'undefined' || options.btnExpandLightbox.title == '') options.btnExpandLightbox.title = "Toggle fullscreen";

					if(typeof(options.btnSound.icon) == 'undefined' || options.btnSound.icon == '') options.btnSound.icon = "fa-volume-up";
					if(typeof(options.btnSound.title) == 'undefined' || options.btnSound.title == '') options.btnSound.title = "Sound";

					if(typeof(options.viewMode) == 'undefined')
						options.viewMode = "webgl"

					if(options.btnDownloadPages.url){
						options.btnDownloadPages.url = options.btnDownloadPages.url.replace(/\\/g, '/')
						options.btnDownloadPages.enabled = true
					}else
						options.btnDownloadPages.enabled = false

					if(options.btnDownloadPdf.url){
						options.btnDownloadPdf.url = options.btnDownloadPdf.url.replace(/\\/g, '/')
						options.btnDownloadPdf.enabled = true
					}else
						options.btnDownloadPdf.enabled = false

					var bookContainer = $(this);
					if(bookContainer.attr('data-pdf') && bookContainer.attr('data-pdf') != "" ){
						options.type = 'pdf'
						options.pdfUrl = bookContainer.attr('data-pdf')
					}

					/*if(options.type == 'pdf')
						options.pages = []*/

					

					switch(options.mode){

						case "normal":
							var containerClass = bookContainer.attr("class")
							var containerId = bookContainer.attr("id")

							bookContainer.removeClass(containerClass).addClass(containerClass+"-"+containerId)
							options.lightBox = false;
							bookContainer
								.css("position","relative")
								.css("display","block")
								.css("height",String(options.height)+"px")
								// .css("z-index",'999999 !important')
							bookContainer.flipBook(options);

							if(typeof(options.responsiveHeight) != 'undefined' && options.responsiveHeight){
								
								window.onresize = function(event) {
									resizeHeight()
								};
								function resizeHeight(){
									if(bookContainer.width() > 0)
										bookContainer.css("height",String(bookContainer.width() / options.aspectRatio)+"px")
								}
								resizeHeight();

							}else if(options.fitToWindow){

								window.onresize = function(event) {
									fitToWindow()
								};
								function fitToWindow(){
									bookContainer.css("width",String($(window).width())+"px");
									bookContainer.css("height",String($(window).height())+"px");
								}
								fitToWindow();

							}else if(options.fitToParent){

								window.onresize = function(event) {
									fitToParent()
								};
								function fitToParent(){
									//find parent that has width & height != 0
									var parent = findParent(bookContainer);

									bookContainer.css("width",String(parent.width())+"px")
									bookContainer.css("height",String(parent.height())+"px")

									function findParent(elem){
										if(elem.parent().width() > 0 && elem.parent().height() > 0)
											return elem.parent()
										else
											return findParent(elem.parent())
									}
								}
								fitToParent();

							}else if(options.fitToHeight){

								window.onresize = function(event) {
									fitToHeight()
								};
								function fitToHeight(){
									if($(window).height() < options.height + bookContainer.offset().top)
										bookContainer.css("height",String($(window).height() - bookContainer.offset().top)+"px")
									else
										bookContainer.css("height",String(options.height)+"px")
								}
								fitToHeight();
							}
							break;
						case "lightbox":

							bookContainer
								.css("display","inline")
							options.lightBox = true;

							var containerClass = "real3dflipbook-" + bookContainer.attr("id") 
							
							if(options.lightboxCssClass && options.lightboxCssClass != ""){
								if($("."+options.lightboxCssClass).length > 0)
									$("."+options.lightboxCssClass).addClass(containerClass)
							}


							if(options.lightboxThumbnailUrl || options.lightboxText){
								
								var holder = $("<div class='"+containerClass+"'>")
							holder.attr('style', options.lightboxContainerCSS)
							bookContainer.before(holder)
							bookContainer.remove();
								
								
								if(options.lightboxThumbnailUrl && options.lightboxThumbnailUrl != ""){
									var thumb = $('<img></img>').attr('src', options.lightboxThumbnailUrl ).appendTo(holder)
									thumb.attr('style', options.lightboxThumbnailUrlCSS)
								}
								
								if(options.lightboxText && options.lightboxText != ""){
									var link = $('<a/>').text(options.lightboxText)
									if(options.lightboxTextPosition == 'top') 
										link.prependTo(holder) 
									else 
										link.appendTo(holder)
									link.attr('style', options.lightboxTextCSS)
								}
							}


							//check IE version

							/*var internetExplorerVersion = (function(){

							    var undef,
							        v = 3,
							        div = document.createElement('div'),
							        all = div.getElementsByTagName('i');

							    while (
							        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
							        all[0]
							    );

							    return v > 4 ? v : undef;

							}());

							if(internetExplorerVersion < 9){

								$("."+containerClass).click(function(){
									 window.open(options.pdfUrl, '_blank')
								})

							}else{

								$("."+containerClass).flipBook(options);
							}*/

							$("."+containerClass).flipBook(options);
							
							break;

						case "fullscreen":

							options.lightBox = false;
							var elem = 'body'
							
							bookContainer
								.appendTo(elem)
								.css("position","fixed")
								// .css("top","0")
								.css("bottom","0")
								.css("left","0")
								.css("right","0")
								.css('top', options.offsetTop+'px')
								//flipbook on top of everything - over the site menu
								.css('z-index', options.zIndex || '2147483647')
								;
							bookContainer.flipBook(options);
							$('body').css('overflow','hidden');

							if(options.menuSelector){

								var $menu = $(options.menuSelector)
								bookContainer.css('top', $menu.height()+'px')
								window.onresize = function(event) {
									bookContainer.css('top', $menu.height()+'px')
								};

							}
							break;
					}

				})
			}
		})();
	});
}(jQuery));