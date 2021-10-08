$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

var storage = storageFunc();
function storageFunc(){
	return {
		get : function (item, key){
			if (key !== undefined){
				var _data = $.parseJSON(sessionStorage.getItem(item));
				return _data[key];
			}else{
				return $.parseJSON(sessionStorage.getItem(item));
			}
		},
		set : function(item, data){
			sessionStorage.setItem(item, JSON.stringify(data));
		},
		remove : function(item){
			sessionStorage.removeItem(item);
		},
		clear : function(url){
			sessionStorage.clear();
			if (url){
				storage.set("lastPage", $(location).attr('pathname'));
				$(location).attr('href',url);
			};
		}
	}
}

var sweet = swalFunc();
function swalFunc(){
	function linkCallbackFunc(link, callback, param){
		if (link == "link"){
			window.location.href = callback;
		}else if (link == "back"){
			history.back()
		}else if (link == "reload"){
			window.location.reload();
		}else{
			if(callback !== undefined) callback(param);
		}
	}
	return {
		alert : function(title, message, customSize, link, callback, param){
			swal({
				title : title,
				text: message,
				html: message,
				customClass: 'custom-swal-alert '+customSize,
				showCancelButton: true,
				cancelButtonText: "닫기",
				showConfirmButton: false,
				closeOnConfirm: true,
				closeOnCancel: true
			},function(isConfirm){
				if (!isConfirm) {
					linkCallbackFunc(link, callback, param);
				}
			});
		},
		confirm : function(title, message, link, callback, param){
			swal({
				title: title,
				text: message,
				html: message,
				showCancelButton: true,
				confirmButtonColor : '#3695ff',
				confirmButtonText: '확인',
				cancelButtonText: '취소',
				customClass: 'custom-swal-alert ',
				closeOnConfirm: false,
				closeOnCancel: true,
				closeModal: false,
				showLoaderOnConfirm : callback !== undefined ? true : false
			},function() {
				linkCallbackFunc(link, callback, param);
			});
		},
		close : function(){
			swal.close()
		}
	}
}


var link = linkFunc();
function linkFunc(){
	return {
		url : function (callback){
			$(location).attr('href',callback)
		},
		back : function(){
			history.back()
		},
		reload : function(){
			window.location.reload();
		},
		reUrl : function(strUrl){
			var expUrl = /^http[s]?\:\/\//i;
			var url;
			if (expUrl.test(strUrl)) url = strUrl;
			else url = 'http://'+strUrl;

			return url;
		},
		popup : function(strUrl){
			window.open(strUrl, "", "width="+screen.width+", height="+screen.height+", fullscreen=yes, toolbar=no, menubar=no, scrollbars=no, resizable=yes" );
		},
	}
}

var str = strFunc();
function strFunc(){
	return {
		comma : function (str){
			str = String(str);
			return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
		},
		uncomma : function (str){
			str = String(str);
			return str.replace(/,/g,"");
		},
		round : function (num,n){
			return parseFloat(Math.round(num * Math.pow(10, n)) /Math.pow(10,n)).toFixed(n);
		},
		pad : function (n, width) {
			  n = n + '';
			  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
		},
		replace: function (text,val1,val2) {
			var re = new RegExp(val1,"g")

			text = text.replace(re , val2);
			return text;
		},
		isEmpty : function (val){
			return (val === undefined || val == null || val.length <= 0) ? true : false;
		},
		replace: function (text,val1,val2) {
			var re = new RegExp(val1,"g")

			text = text.replace(re , val2);
			return text;
		},
		trim : function (str) {
			return $.trim(str);
		},
		textNewLine : function (str) {
			return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
		},
	}
}

function generateSlimScroll(el, option){
	if (option){
		$(el).slimscroll(option);
	}else{
		$(el).slimscroll({
			height: 'auto',
			size: '3px'
		});
	}
}

function toastMsg(text) {
	$.toast({
		loader:false,
		bgColor:'#555555',
		textColor:'#fff',
		position:'top-center',
		text : text
	})
}
