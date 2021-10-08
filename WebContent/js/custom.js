$(function(){

	$.extend( $.validator.messages, {
		required: "필수 항목입니다.",
		remote: "항목을 수정하세요.",
		email: "유효하지 않은 E-Mail주소입니다.",
		url: "유효하지 않은 URL입니다.",
		date: "올바른 날짜를 입력하세요.",
		dateISO: "올바른 날짜(ISO)를 입력하세요.",
		number: "유효한 숫자가 아닙니다.",
		digits: "숫자만 입력 가능합니다.",
		creditcard: "신용카드 번호가 바르지 않습니다.",
		equalTo: "같은 값을 다시 입력하세요.",
		extension: "올바른 확장자가 아닙니다.",
		maxlength: $.validator.format( "{0}자를 넘을 수 없습니다. " ),
		minlength: $.validator.format( "{0}자 이상 입력하세요." ),
		rangelength: $.validator.format( "문자 길이가 {0} 에서 {1} 사이의 값을 입력하세요." ),
		range: $.validator.format( "{0} 에서 {1} 사이의 값을 입력하세요." ),
		max: $.validator.format( "{0} 이하의 값을 입력하세요." ),
		min: $.validator.format( "{0} 이상의 값을 입력하세요." )
	});

	$.validator.setDefaults({
		errorElement: "div",
		errorClass: "jqval-error",
		errorPlacement: function(error, element) {
			if (element.parents('.search_field').length > 0){
				error.appendTo( element.parents('.search_field') );
			} else {
				// error.appendTo( element.parent("div").next("div") );
				// error.appendTo( element.parent("div").next() );
				error.appendTo(element.parent());

			}
			error.slideDown(400);
			error.animate({ opacity: 1 }, { queue: false, duration: 700 });
		},
	});

	// 로그인 체크
	// var arrStorageCheck = ['_login.php'];
	// if($.inArray($(location).attr('pathname').split("/").pop(-1), arrStorageCheck) != -1){
	// 	var lastPage = storage.get("lastPage");
	// 	storage.clear();
	// 	storage.set("lastPage", lastPage);
	// }else{
	// 	if(!storage.get("userInfo")){
	// 		sweet.alert("", "로그인 정보가 없습니다.", "small","",userLogOut)
	// 	}
	// }

	// 로그아웃
	// function userLogOut(){
	// 	storage.clear('/views/_login/_login.php');
	// }

	if ($('.sidebar').length > 0) {
		$(".sidebar .nav > .has-sub > a").click(function() {
			var e = $(this).next(".sub-menu")
					, a = ".sidebar .nav > li.has-sub > .sub-menu";
			0 === $(".page-sidebar-minified").length && ($(a).not(e).slideUp(250, function() {
				$(this).closest("li").removeClass("expand")
			}),
					$(e).slideToggle(250, function() {
						var e = $(this).closest("li");
						$(e).hasClass("expand") ? $(e).removeClass("expand") : $(e).addClass("expand")
					}))
		}),
				$(".sidebar .nav > .has-sub .sub-menu li.has-sub > a").click(function() {
					if (0 === $(".page-sidebar-minified").length) {
						var e = $(this).next(".sub-menu");
						$(e).slideToggle(250)
					}
				})

		$(".sidebar ul.left-menu li a").click(function(){
			if ($(this).attr('data-menu-id') !== undefined){
				var storageData = {};
				storageData.menu_id = $(this).attr('data-menu-id');
				storage.set("menuInfo", storageData)

				link.url($(this).attr('data-menu-link'))
			}
		});

		$(".sidebar-minify-btn").click(function(){
			$('#page-container').toggleClass('sidebar-minified');
		});

		generateSlimScroll('.sidebar [data-scrollbar="true"]');

		if(storage.get("menuInfo")){
			menuNavigationActive(storage.get("menuInfo","menu_id"))
		}
	}

	if ($('.header-sort').length > 0){
		$('.header-sort').click(function() {
		  var isSortedAsc  = $(this).hasClass('sort-asc');
		  var isSortedDesc = $(this).hasClass('sort-desc');
		  var isUnsorted = !isSortedAsc && !isSortedDesc;
		
		  // 싱글정렬
		  $('.header-sort').removeClass('sort-asc sort-desc');
		  // 멀티정렬
		  // $(this).removeClass('sort-asc sort-desc');
		  
		  if (isUnsorted || isSortedDesc) {
			$(this).addClass('sort-asc');
		  } else if (isSortedAsc) {
			$(this).addClass('sort-desc');
		  }
		});      
	  }
	  
	libraryInit();
});

// 메뉴 현재 위치 표시
function menuNavigationActive(menu_id){
	var activeMenu = $('.sidebar ul.left-menu').find("[data-menu-id='"+menu_id+"']")
	$('ol.breadcrumb').empty()
	$(activeMenu).parent().toggleClass('active')
	$(activeMenu).parents().closest('li.has-sub').addClass('active')

	$('ol.breadcrumb').append('<li class="home">Home</li>');
	var pageName;
	for(var i=0; i< $('.sidebar ul.left-menu').find(".active > a").length; i++){
		$('ol.breadcrumb').append('<li>'+$('.sidebar ul.left-menu').find(".active > a")[i].innerText+'</li>');
		pageName = $('.sidebar ul.left-menu').find(".active > a")[i].innerText;
	}

	$('#txt-page-title').text(pageName)
	$('ol.breadcrumb li').last().addClass('active')
}

// 월달력 만들기
function monCalendar(id, date) {
	var monCalendar = document.getElementById(id);

	if( typeof( date ) !== 'undefined' ) {
		date = date.split('-');
		if (getToday().substr(0, 7) == date[0]+'-'+str.pad(date[1],2)){
			var date = new Date();
		}else{
			date[1] = date[1] - 1;
			date = new Date(date[0], date[1], '01');
		}
	} else {
		var date = new Date();
	}

	var currentYear = date.getFullYear(); //년도를 구함
	var currentMonth = date.getMonth() + 1; //연을 구함. 월은 0부터 시작하므로 +1, 12월은 11을 출력
	var currentDate = date.getDate(); //오늘 일자.

	var toDay = currentYear+'-'+str.pad(currentMonth,2)+'-'+str.pad(currentDate,2);

	date.setDate(1);
	var currentDay = date.getDay(); //이번달 1일의 요일은 출력. 0은 일요일 6은 토요일

	var dateString = new Array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat');
	var lastDate = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	if( (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0 )
		lastDate[1] = 29;
	//각 달의 마지막 일을 계산, 윤년의 경우 년도가 4의 배수이고 100의 배수가 아닐 때 혹은 400의 배수일 때 2월달이 29일 임.

	var currentLastDate = lastDate[currentMonth-1];
	var week = Math.ceil( ( currentDay + currentLastDate ) / 7 ); //총 몇 주인지 구함.

	if(currentMonth != 1)
		var prevDate = currentYear + '-' + ( currentMonth - 1 ) + '-' + currentDate;
	else
		var prevDate = ( currentYear - 1 ) + '-' + 12 + '-' + currentDate;

	//만약 이번달이 1월이라면 1년 전 12월로 출력.
	if(currentMonth != 12)
		var nextDate = currentYear + '-' + ( currentMonth + 1 ) + '-' + currentDate;
	//만약 이번달이 12월이라면 1년 후 1월로 출력.
	else
		var nextDate = ( currentYear + 1 ) + '-' + 1 + '-' + currentDate;

	var calendar = '';
	calendar += '<div class="hd">';
	calendar += '	<a href="javascript:void(0)" class="btn-prev-month" onclick="monCalendar(\'' +  id + '\', \'' + prevDate + '\')"></a>';
	calendar += currentYear + '년 ' + str.pad(currentMonth,2) + '월';
	calendar += '	<a href="javascript:void(0)" class="btn-next-month" onclick="monCalendar(\'' +  id + '\', \'' + nextDate + '\')"></a>';
	calendar += '</div>';
	calendar += '<div class="calendar-inner-table">';
	calendar += '	<table cellpadding="0" cellspacing="0" border="0">';
	calendar += '	<thead>';
	calendar += '	<tr>';
	calendar += '		<th>일</th>';
	calendar += '		<th>월</th>';
	calendar += '		<th>화</th>';
	calendar += '		<th>수</th>';
	calendar += '		<th>목</th>';
	calendar += '		<th>금</th>';
	calendar += '		<th>토</th>';
	calendar += '	</tr>';
	calendar += '	</thead>';
	calendar += '	<tbody>';

	var dateNum = 1 - currentDay;
	var yymmdd, className;

	for(var i = 0; i < week; i++) {
		calendar += '			<tr>';
		for(var j = 0; j < 7; j++, dateNum++) {
			if( dateNum < 1 || dateNum > currentLastDate ) {
				calendar += '				<td> </td>';
				continue;
			}
			yymmdd = currentYear+'-'+str.pad(currentMonth,2)+'-'+str.pad(dateNum,2);
			className= (yymmdd == $.format.date(new Date(), 'yyyy-MM-dd')) ? 'today' : 'notWork';
			calendar += '				<td><div id="calendar_'+yymmdd+'" class='+className+' value='+yymmdd+'>' + dateNum + '</div></td>';
		}
		calendar += '			</tr>';
	}
	calendar += '			</tbody>';
	calendar += '		</table>';
	calendar += '</div>';

	monCalendar.innerHTML = calendar;
}

function getToday(addDate) {
	if (addDate == undefined) addDate=0

	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate()+addDate;

	var output = d.getFullYear() + '-' +
			((''+month).length<2 ? '0' : '') + month + '-' +
			((''+day).length<2 ? '0' : '') + day;

	return output;
}

function randomNum(min, max){
	var randNum = Math.floor(Math.random()*(max-min+1)) + min; return randNum;
}

function libraryInit() {

	initTippy();

	$('.btnFileDel').off('click');
	$(".btnFileDel").click(function() {
		$(this).parents().closest('.search_field.inline-form').remove()
	});

	$(".file-upload").off('change');
	$(".file-upload").on('change',function(){
		var fileName = $(this).val();
		$(this).next().val(fileName);
		$(this).next().next().removeClass('hide');

		$(this).next().next().off('click');
		$(this).next().next().click(function() {
			$(this).prev().val('');
			$(this).addClass('hide');
		});

	});

	// daterangepicker 선언
	if ($('.date-picker').length > 0){
		var date = new Date();
		var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		$('.date-picker').daterangepicker({
			locale :{
				format: 'YYYY-MM-DD',
				separator: ' ~ ',
				applyLabel: "적용",
				cancelLabel: "닫기"
			},
			"startDate": firstDay,
			"endDate": lastDay,
		});
	}

	if ($('.date').length > 0){
		$('.date').daterangepicker({
			locale :{
				format: 'YYYY-MM-DD',
			},
			"singleDatePicker": true,
			"autoApply": true,
		}, function(start, end, label) {
			console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
		});
	}

	// 글자수 체크
	if ($('.remaining').length > 0){
		$('.remaining').each(function(){
			var totalLen = $(this).data('text-len');
			var countId = $(this).data('count');
			var inputId = $(this).data('input');
			var $count = $('#'+countId, this);
			var $input = $("#"+inputId);

			var update = function(){
				var before = $count.text() * 1;
				var now = totalLen - $input.val().length;

				// 사용자가 입력한 값이 제한 값을 초과하는지를 검사한다.
				if (now < 0) {
					var str = $input.val();
					$("#"+inputId).focus();
					var inputVal = str.substr(0, totalLen);
					alert(totalLen+'자를 초과하였습니다.');
					now = 0;
					$input.val(inputVal);
				}

				// 필요한 경우 DOM을 수정한다.
				if (before != now) {
					$count.text($input.val().length);
				}
			};
			$input.bind('input keyup paste', function(){
				setTimeout(update, 0);
			});
			update();
		});
	}

	// 바이트 체크
	if ($('.remaining_byte').length > 0){
		$('.remaining_byte').each(function(){
			var totalLen = $(this).data('text-len');
			var countId = $(this).data('count');
			var inputId = $(this).data('input');
			var $count = $('#'+countId, this);
			var $input = $("#"+inputId);

			var update = function(){
				var dom = $input;
				var str = dom.val();
				var _byte = 0;
				var charStr = '';

				if (str.length <= 0) {
					$count.text(0);
					return;
				}
				for (var i = 0; i < str.length; i++) {
					charStr = str.charAt(i);
					if (escape(charStr).length > 4) {
						_byte += 2;
					} else {
						_byte++;
					}

					if (_byte <= totalLen) {
						strLength = i + 1;
					}
				}
				$count.text(_byte);
				if (_byte > totalLen) {
					alert(totalLen+'자를 초과하였습니다.');
					dom.val(dom.val().substr(0, strLength));
					$count.text(totalLen);
					return;
				} else {
					$count.text(_byte);
				}
			};

			$input.bind('input keyup paste', function(){
				setTimeout(update, 0);
			});
			update();
		});
	}

	// 바이트 체크
	// if ($('.emulator_cont').length > 0){
	// 	generateSlimScroll('.emulator_cont', { height: '568px', size: '3px'});
	// }
}

function divButtonDisplayAction(item) {
	$('#div-button-display-sub').empty();
	var html = '';
	if (item == 'copy') {
		html += '		<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '			<div class="search_field inline-form">';
		html += '				<div class="remaining" data-input="step3-button-copy" data-count="step3-button-copy-count" data-text-len="200">';
		html += '					<input type="text" class="form-control" id="step3-button-copy" name="step3-button-copy" value="" placeholder="복사할 값을 입력하세요"/>';
		html += '					<p class="text-right color-gray"><span id="step3-button-copy-count">0</span>/200자</p>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
	} else if (item == 'url') {
		html += '		<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '			<div class="search_field inline-form">';
		html += '				<div class="remaining" data-input="step3-button-url" data-count="step3-button-url-count" data-text-len="200">';
		html += '					<input type="text" class="form-control" id="step3-button-url" name="step3-button-url" value="" placeholder="http://www.ibk.co.kr 형식으로 입력하세요"/>';
		html += '					<p class="text-right color-gray"><span id="step3-button-url-count">0</span>/200자</p>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
	} else if (item == 'tel') {
		html += '		<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '			<div class="search_field inline-form">';
		html += '				<div class="remaining" data-input="step3-button-tel" data-count="step3-button-tel-count" data-text-len="40">';
		html += '					<input type="text" class="form-control" id="step3-button-tel" name="step3-button-tel" value="" placeholder="전화번호를 입력하세요"/>';
		html += '					<p class="text-right color-gray"><span id="step3-button-tel-count">0</span>/40자</p>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
	} else if (item == 'coordinate') {
		html += '		<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '			<div class="search_field inline-form">';
		html += '				<div class="remaining" data-input="step3-button-coordinate-lat" data-count="step3-button-coordinate-lat-count" data-text-len="40">';
		html += '					<input type="text" class="form-control" id="step3-button-coordinate-lat" name="step3-button-coordinate-lat" value="" placeholder="위도를 입력하세요"/>';
		html += '					<p class="text-right color-gray"><span id="step3-button-coordinate-lat-count">0</span>/40자</p>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
		html += '		<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '			<div class="search_field inline-form">';
		html += '				<div class="remaining" data-input="step3-button-coordinate-long" data-count="step3-button-coordinate-long-count" data-text-len="40">';
		html += '					<input type="text" class="form-control" id="step3-button-coordinate-long" name="step3-button-coordinate-long" value="" placeholder="경도를 입력하세요"/>';
		html += '					<p class="text-right color-gray"><span id="step3-button-coordinate-long-count">0</span>/40자</p>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
		html += '		<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '			<div class="search_field inline-form">';
		html += '				<div class="remaining" data-input="step3-button-coordinate-name" data-count="step3-button-name-count" data-text-len="100">';
		html += '					<input type="text" class="form-control" id="step3-button-name" name="step3-button-name" value="" placeholder="위치이름을 입력하세요"/>';
		html += '					<p class="text-right color-gray"><span id="step3-button-name-count">0</span>/100자</p>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
		html += '		<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '			<div class="search_field inline-form">';
		html += '				<div class="remaining" data-input="step3-button-url" data-count="step3-button-url-count" data-text-len="200">';
		html += '					<input type="text" class="form-control" id="step3-button-url" name="step3-button-url" value="" placeholder="http://www.ibk.co.kr 형식으로 입력하세요"/>';
		html += '					<p class="text-right color-gray"><span id="step3-button-url-count">0</span>/200자</p>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
	} else if (item == 'query') {
		html += '		<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '			<div class="search_field inline-form">';
		html += '				<div class="remaining" data-input="step3-button-coordinate-name" data-count="step3-button-name-count" data-text-len="100">';
		html += '					<input type="text" class="form-control" id="step3-button-name" name="step3-button-name" value="" placeholder="위치이름을 입력하세요"/>';
		html += '					<p class="text-right color-gray"><span id="step3-button-name-count">0</span>/100자</p>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
		html += '		<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '			<div class="search_field inline-form">';
		html += '				<div class="ele_area remaining height-auto lh-1-6" data-input="step3-button-url-content" data-count="step3-button-url-count" data-text-len="200">';
		html += '					<textarea rows="5" class="width-100" id="step3-button-url-content" name="step3-button-url-content" placeholder="http://www.ibk.co.kr 형식으로 입력하세요"></textarea>';
		html += '					<p class="text-right color-gray"><span id="step3-button-url-count">0</span>/200자</p>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
	} else if (item == 'calendar') {
		html += '		<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '			<div class="search_field inline-form">';
		html += '				<input type="text" class="form-control date-picker" value="01/01/2018 - 01/15/2018" />';
		html += '		</div>';
		html += '		<div class="ele_area pdd-top-10">';
		html += '			<div class="search_field inline-form">';
		html += '				<div class="remaining" data-input="step3-button-calendar-title" data-count="step3-button-calendar-title-count" data-text-len="100">';
		html += '					<input type="text" class="form-control" id="step3-button-calendar-title" name="step3-button-calendar-title" value="" placeholder="제목을 입력하세요"/>';
		html += '					<p class="text-right color-gray"><span id="step3-button-calendar-title-count">0</span>/100자</p>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
		html += '		<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '			<div class="search_field inline-form">';
		html += '				<div class="ele_area remaining height-auto lh-1-6" data-input="step3-button-calendar-content" data-count="step3-button-calendar-content-count" data-text-len="500">';
		html += '					<textarea rows="5" class="width-100" id="step3-button-calendar-content" name="step3-button-calendar-content" placeholder="내용을 입력하세요"></textarea>';
		html += '					<p class="text-right color-gray"><span id="step3-button-calendar-content-count">0</span>/500자</p>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
	} else if (item == 'msg') {
		html += '		<div class="ele_area pdd-top-10">';
		html += '			<div class="search_field inline-form">';
		html += '				<div class="remaining" data-input="step3-button-msg-tel" data-count="step3-button-msg-tel-count" data-text-len="40">';
		html += '					<input type="text" class="form-control" id="step3-button-msg-tel" name="step3-button-msg-tel" value="" placeholder="전화번호를 입력하세요"/>';
		html += '					<p class="text-right color-gray"><span id="step3-button-msg-tel-count">0</span>/40자</p>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
		html += '		<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '			<div class="search_field inline-form">';
		html += '				<div class="ele_area remaining height-auto lh-1-6" data-input="step3-button-msg-content" data-count="step3-button-msg-content-count" data-text-len="100">';
		html += '					<textarea rows="5" class="width-100" id="step3-button-msg-content" name="step3-button-msg-content" placeholder="문자메시지 내용을 입력하세요"></textarea>';
		html += '					<p class="text-right color-gray"><span id="step3-button-msg-content-count">0</span>/100자</p>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
	}
	$('#div-button-display-sub').append(html);

	libraryInit()
}
