$(document).ready(function(){ 

	$(window).on("load",function(){

		//스크롤바 플러그인 ( 카테고리메뉴 depth1,depth3 / 내찜목록 드롭다운 메뉴, 공통 레이어 팝업에서 사용됨 )
    	$('.depth1').mCustomScrollbar();
    	$('.depth3 ul').mCustomScrollbar();
    	$('.wish .pop_body').mCustomScrollbar();
    	$('.popType1 .pop_body').mCustomScrollbar();
     });

	//공통 : Header 최상단에 스크롤 시, 밑줄 없어짐 + 상단으로가기 버튼 없어지고 생기는 기능 & 스크롤 다운 시 밑줄 생성, 상단으로 가기 버튼 생성
	$('#sidebar .btn_top').hide();
	$(window).on("scroll", function(event){
	
		var scrollTop = $(window).scrollTop();
		
		if( scrollTop > 0 ){
			
			$("#header").addClass('scroll_down');//scoll 다운 시 border-bottom style 주기
			$('#sidebar .btn_top').fadeIn(100);//scoll 다운 시 상단으로 가기 버튼 보여주기
		}else {
			
			$("#header").removeClass('scroll_down');//scolltop이 최상단일때 border-bottom style 없애기
			$('#sidebar .btn_top').fadeOut(100);//scolltop이 최상단일때 상단으로 가기 버튼 없애기
		}
	});

	//공통 : header 로그인 후 사용자 아이디 클릭 시 사용자 메뉴 드롭다운
	$('#userId').on('click' , function(e){

		e.preventDefault();
		//드롭다운 이외의 영역을 클릭 시, 드롭다운을 닫음
		$('body').click(function(e){
            if( $('.info_user .login').has(e.target).length === 0 ){
                 $('.lst_user').removeClass('on');
            }
        });

        $(this).parent().next('.lst_user').toggleClass('on');
	}); 

	//공통 : header 로그인 후 내 찜 목록 클릭 시 메뉴 드롭다운
	$('#userWish').on('click' , function(e){
		e.preventDefault();

		//드롭다운 이외의 영역을 클릭 시, 드롭다운을 닫음
		$('body').click(function(e){
            if( $('.info_user .wish').has(e.target).length === 0 ){
                 $('.popType2').removeClass('on');
            }
        });

		//닫기버튼 클릭 시 드롭다운 닫음
        $('.popType2 .btn_close').click(function(e){
        	$(this).parent().parent().removeClass('on');
        });

        $(this).next('.popType2').toggleClass('on');
	});

	//공통 : header 카테고리 버튼 클릭 시 카테고리 메뉴 열기 
 	$('.btn_category').on('click', function(e){

 		e.preventDefault();
 		$('#categoryMenu').addClass('on');
 		$('.dimm').show();

 		//카테고리 메뉴 - 닫기 버튼 클릭 이벤트
 		$('.btn_close').on('click', function(){
 			$('.dimm').hide();

 			//닫기버튼을 클릭할 때, 모든 체크된 메뉴 reset 
 			$('#categoryMenu').removeClass('on');
 			$('#categoryMenu .depth1 li.active > a ').removeClass('on');
 			$('#categoryMenu .depth2').removeClass('on');
 			$('#categoryMenu .depth2 input[type="radio"]').prop("checked", false);
 			$('#categoryMenu .depth3').removeClass('on');
 			$('#categoryMenu .depth3 input[type="checkbox"]').prop("checked", false);

 		});

 		//카테고리메뉴 이외의 영역을 클릭시 투명 dimm을 클릭하게 하여 카테고리 메뉴가 닫히게 함
 		$('.dimm').on('click', function(){
            $(this).hide();

            //카테고리메뉴 이외의 영역을 클릭할 때, 모든 체크된 메뉴 reset 
            $('#categoryMenu').removeClass('on');
            $('#categoryMenu .depth1 li.active > a ').removeClass('on');
            $('#categoryMenu .depth2').removeClass('on');
            $('#categoryMenu .depth2.vertical > li a').removeClass('on');
            $('#categoryMenu .depth2 input[type="radio"]').prop("checked", false);
            $('#categoryMenu .depth3').removeClass('on');
            $('#categoryMenu .depth3 input[type="checkbox"]').prop("checked", false);
        });
 	}); 

 	//카테고리 메뉴 depth1,2 클릭 기능 
 	$('#categoryMenu .depth1 li.active > a ').on('click', function(){
 		$('#categoryMenu .depth1 li.active > a ').removeClass('on');
 		$('#categoryMenu .depth2').removeClass('on');
 		$('#categoryMenu .depth2.vertical > li a').removeClass('on');
 		$('#categoryMenu .depth3').removeClass('on');
 		$('#categoryMenu .depth2 input[type="radio"]').prop("checked", false);
 		$('#categoryMenu .depth3 input[type="checkbox"]').prop("checked", false);
 
 		$(this).addClass('on');
 		$(this).next('.depth2').addClass('on');

 		//depth2 vertical 메뉴 클릭 이벤트
 		$('#categoryMenu .depth2.vertical > li a').click(function(e){
 			$('#categoryMenu .depth2.vertical > li a').removeClass('on');
 			$(this).addClass('on');
 		});

 	});

 	//카테고리 메뉴 depth3 메뉴 클릭 기능
 	var radioBoxObj = $('#categoryMenu .depth2 input[type="radio"]');
   	
   	radioBoxObj.change(function(){
   		if($(radioBoxObj).is(":checked")){
   			var activeTab = $(this).attr('data-tab');
	    	$('#categoryMenu .depth3').removeClass('on');
	    	$('#' + activeTab).addClass('on');
	    	$('#categoryMenu .depth3 input[type="checkbox"]').prop("checked", false);
   		}

   });

 	//공통 : 왼쪽 사이드 메뉴 클릭 이벤트
	var sideObj = $('#sideMenu ul li.active a');

	$(sideObj).on('click' , function(){

    	$(sideObj).removeClass('on');
        $(this).addClass('on');
        
 	});

    // 공통 : 레이어 팝업 - 로그인, 비회원으로 계속, 비밀번호찾기, 가입하기, 데이터 요청하기
    $('.js-open').click(function(e) {
        e.preventDefault();        
        var activeLayer = $(this).attr('data-pop');
        var wHeight = $(window).height();

        $('.popType1').addClass('hidden'); //모든 팝업 감추기
        $('#' + activeLayer).removeClass('hidden'); //호출한 팝업만 부르기
        $('.dimm').show().removeClass('transparent').css('z-index' , '1030'); //배경 가져오기

        //닫기 버튼 클릭 시
        $('.js-close').click(function() {
            $('.popType1').addClass('hidden');//모든 팝업 감추기
            $('.dimm').hide().addClass('transparent').css('z-index' , '10'); //배경 감추기
        });

        //브라우저 창의 높이가 750px 이하일때, 레이어 팝업에 스크롤바 적용
	    if(wHeight < 750 ){	
	    	$('.popType1').addClass('small');
	    } else {
	    	$('.popType1').removeClass('small');
	    }

	    //브라우저 창을 조정할 때, 높이가 750px 이하일 때 레이어 팝업에 스크롤바 적용
        $(window).on("resize" , function(e){
	    	var wHeight = $(window).height();

	    	if(wHeight < 750 ){	
	    		$('.popType1').addClass('small');
	    	} else {
	    		$('.popType1').removeClass('small');
	    	}
	    });
    });

	//메인페이지 : defalt 슬라이더 기능
	$(".popular").slick({
        dots: true,//페이징 사용여부
        infinite: true, //무한반복
        lazyLoad: 'ondemand',
        slidesToShow: 3, //보여질 슬라이드의 갯수
        slidesToScroll: 1 //넘겨질 슬라이드의 갯수
      });

	//메인페이지 : 인기상품 탭 클릭
	$('#popularPro').on('click' , function(e){
		
		e.preventDefault();
	    $('.lst_tab a').parent().removeClass('on');
		$('.tab_contents').removeClass('active');

		$(this).parent().addClass('on');
		$('#popularCont').addClass('active');

		//인기상품 슬라이더 기능 생성
		$(".popular").slick({
	        dots: true,
	        infinite: true,
	        lazyLoad: 'ondemand',
	        slidesToShow: 3,
	        slidesToScroll: 1
	      });

		//최신상품 슬라이더 기능 삭제
		$(".new").slick('unslick');

	 });

	//메인페이지 : 최신 상품 탭 클릭
	$('#newPro').on('click' , function(e){
		
		e.preventDefault();
	    $('.lst_tab a').parent().removeClass('on');
		$('.tab_contents').removeClass('active');

		$(this).parent().addClass('on');
		$('#newCont').addClass('active');

		//최신상품 슬라이더 기능 생성
		$(".new").slick({
	        dots: true,
	        infinite: true,
	        lazyLoad: 'ondemand',
	        slidesToShow: 3,
	        slidesToScroll: 1
	      });

		//인기상품 슬라이더 기능 삭제
		$(".popular").slick('unslick');
	 });

	//서브페이지 : 탭 메뉴 (데이터, 뉴스) 
	var tabObj = $('#subTab a');

	$(tabObj).on('click' , function(e){
		var activeTab = $(this).attr('data-tab');
		
		e.preventDefault();
	    $(tabObj).parent().removeClass('on');
		$('.tab_contents').removeClass('active');

		$(this).parent().addClass('on');
		$('#' + activeTab).addClass('active');
	 });

	//서브페이지 공통 : 상단으로 가기 버튼
	$("#sidebar .btn_top").on('click' , function(e) {
        $('html').animate({scrollTop : 0}, 300);
    });

    //서브페이지 공통 : 데이터 상품 요청 버튼 마우스 오버 기능
    $('.btn_data').hover(function() {
	  $(this).addClass('on');
	  $(this).find('span').removeClass('hidden');
	}, function(){
	  $(this).removeClass('on');
	  $(this).find('span').addClass('hidden');
	});

    //서브페이지 '뉴스'화면 -  툴팁 클릭 기능
    $('.txt_tooltip').on('click' , function(){
    	var objW = $(this).width();
    	$(this).next().toggleClass('on').css('left' , objW + 10);

    	//닫기버튼 클릭 시
    	$('.tooltip_box .btn_close').on('click', function(){
    		$(this).parent().removeClass('on');
    	});
    });

    //서브페이지 - 뉴스_주제어분석결과 화면 슬라이더 기능
	$(".ranking_slider").slick({
        //dots: true,//페이징 사용여부
        infinite: false, //무한반복
        lazyLoad: 'ondemand',
        slidesToShow: 2, //보여질 슬라이드의 갯수
        slidesToScroll: 2 //넘겨질 슬라이드의 갯수
      });

    //서브 페이지 '뉴스'화면 (주제어분석결과, 문서변화량 분석결과) - 날짜선택 기능
    date();

    function date(){
        $.datepicker.setDefaults({
            dateFormat: 'yy.mm.dd' 
            ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
            ,showButtonPanel: true //버튼 보여주기
            ,buttonImageOnly: true
            ,buttonImage: "images/icon_date.png"
            ,buttonText: "날짜를 선택해 주세요."
            ,changeMonth: true //콤보박스에서 월 선택 가능                
            ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시                
            ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
            ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
            ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
            ,dayNamesMin: ['일','월','화','수','목','금','토']
            ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일']
            //,minDate: "-7D" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
            ,maxDate: "today", //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)   
            
            //달력 높이값 조정
            beforeShow: function(input) {
		    	var i_offset= $(input).offset(); //클릭된 input의 위치값 체크

			    setTimeout(function(){
			       $('#ui-datepicker-div').css({'top':i_offset.top - 65, 'bottom':''});
			    })
			}           
        });

        //datepicker로 선언
        $("#startDate").datepicker();                    
        $("#endDate").datepicker();
        
        //From의 초기값을 일주일 전 날짜로 설정
        $('#startDate').datepicker('setDate', '-7D'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
        
        //To의 초기값을 오늘로 설정
        $('#endDate').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    }
  
});



