$(function(){
    //만약 접속한 기기의 가로크기가 480초과라면 menu영역이 보이고,480이하면 menu영역 숨김
    var winwidth=$(window).width();
    if(winwidth>480) {//pc버전
        $('header nav').show();
        $('.mo_menu').hide();
    }else{//모바일버전
        $('header nav').hide();
    }

    $('.mo_menu').hide();
    $('.sitemap').hide(); //display:flxe와 display:none을 같이 사용 못할때 display:none대신 제이쿼리로 숨김
    //menu_btn을 클릭하면 sitemap의 영역이 나타남
    $('.menu_btn').click(function(){
        if(winwidth>=1600){
            $('.sitemap').show();
        }else{
            $('.mo_menu').show();
        }
    });
    //site_close을 클릭하면 sitemap영역이 사라짐
    $('.site_close').click(function(){
        $('.sitemap').hide();
    });
    //mo_close를 클릭하면 mo_menu영역이 사라짐
    $('.mo_close').click(function(){
        $('.mo_menu').hide(); 
    });

    //모바일버전 mo_nav 아코디언 메뉴
    $('.mo_nav .sub').hide();
    $('.mo_nav > ul > li').click(function(){
        //만약 클릭한 메뉴에 active가 설정되어 있지 않다면
        if($(this).attr('class') != 'active'){
            //mo_nav의 모든 주메뉴애서 active클래스 제거
            $('.mo_nav > ul li').removeClass('active')
            //클릭한 메뉴만 active클래스 추가
            $(this).addClass('active')
            //모든 서브메뉴 숨김
            $('.mo_nav .sub').slideUp();
            //클릭한 서브메뉴만 나타남
            $(this).find('.sub').slideToggle();
        //클릭한 메뉴에 active가 설정되어 있다면
        }else{
            //클릭한 메뉴에서 active클래스 제거
            $(this).removeClass('active');
            //클릭한 메뉴의 서브메뉴 숨김
            $(this).find('.sub').slideUp();

        }
    });


    //메인 슬라이드
    //인덱스 번호를 나타내는 변수 선언 및 초기화
    var num=0;
    //왼쪽 이미지의 총 개수를 읽어서 total변수에 저장
    var total=$('.photo').length;

    //왼쪽 이미지의 높이를 읽어서 imgHeight변수에 저장
    var imgHeight=$('.photo').height();




    //만약 접속한 기기의 가로길이가 1600이상이면 양쪽 슬라이드 실행되고
    //1600미만이면 모바일 슬라이드(한쪽 슬라이드) 살행
    if(winwidth>=1000){
        //pc버전 슬라이드
        //왼쪽 이미지 영역 - 첫번째 이미지만 보임
        $('.photo').css('z-index',1);
        $('.p1').css('z-index',5);
        //가운데 이미지 영역 - 첫번째 이미지만 보임
        $('.small').hide();
        $('.small:first').show();
        //오른쪽 글자 영역 - 첫번째 글자들만 보임
        $('.txt').removeClass('active').hide();
        $('.txt:first').show().addClass('active');
        //number(숫자) 영역 - 첫번째 숫자만 보임
        $('.number a').hide();
        $('.number a:first').show();

        //NEXT버튼을 클릭하면 왼쪽 이미지가 위로 올라옴
        $('.next_btn').click(function(){
            clearInterval(auto);
            auto=setInterval(movefn,10000);
            barfn();


            //이미지의 인덱스 번호를 1씩 증가시킴
            num++;
            //이미지의 인덱스 번호가 이미지의 총 개수보다 크면 0으로 초기화
            if(num>=total) { num=0; }
            //왼쪽 이미지의 개수만큼 반복
            $('.photo').each(function(){
                //왼쪽 이미지의 인덱스번호를 imgNum변수에 저장
                var imgNum=$(this).index();
                //만약 num값과 imgNum값이 같다면
                if(num==imgNum){
                    //모든 이미지는 순서를 뒤로 함.
                    $('.photo').css('z-index',1);
                    //imgNum 인덱스 번호에 해당하는 이미지 이동
                    $(this).css({'top':imgHeight, 'z-index':5});
                    $(this).animate({'top':0},900,"easeOutExpo");
                    $(this).prev().css('z-index',3)
                }
            });
            //가운데 이미지의 개수만큼 반복
            $('.small').each(function(){
                //가운데 이미지의 인덱스 번호를 centerNum변수에 저장
                var centerNum=$(this).index();
                //만약 num값과 centerNum값이 같다면
                if(num==centerNum){
                    //모든 가운데 이미지 안보임
                    $('.small').fadeOut(300);
                    $(this).fadeIn(300);
                }
            });
            //number(숫자)의 개수만큼 반복
            $('.number a').each(function(){
                //숫자(a태그)의 인덱스 번호를 aNum변수에 저장
                var aNum=$(this).index();
                //만약 num값과 aNum값이 같다면
                if(num==aNum){
                    //모든 숫자 안보임
                    $('.number a').hide();
                    //현재 숫자만 보임
                    $(this).show();
                }
            });
            //txt영역 글자 애니메이션
            $('.txt').each(function(){
                //txt영역의 인덱스 번호를 txtNum변수에 저장
                var txtNum=$(this).index();
                //만약 num값과 txtNum값이 같다면
                if(num==txtNum){
                    $('.txt').removeClass('active').hide();
                    $(this).show().addClass('active');
                }
            });


        });

        //PREV버튼을 클릭하면 왼쪽 이미지가 위로 올라옴
        $('.prev_btn').click(function(){
            clearInterval(auto);
            auto=setInterval(movefn,10000);
            barfn();


            //이미지의 인덱스 번호를 1씩 감소시킴
            num--;
            //이미지의 인덱스 번호가 0보다 작으면 total-1로 초기화
            if(num<0) { num=total-1; }
            //왼쪽 이미지의 개수만큼 반복
            $('.photo').each(function(){
                //왼쪽 이미지의 인덱스번호를 imgNum변수에 저장
                var imgNum=$(this).index();
                //만약 num값과 imgNum값이 같다면
                if(num==imgNum){
                    //모든 이미지는 순서를 뒤로 함.
                    $('.photo').css('z-index',3);
                    //imgNum 인덱스 번호에 해당하는 이미지 이동
                    $(this).next().css('z-index',4)
                    $(this).prev().css('z-index',2)
                    $(this).prev().prev().css('z-index',1)
                    $(this).css({'top':-imgHeight, 'z-index':5});
                    $(this).animate({'top':0},900,"easeOutExpo");
                }
            });
            //가운데 이미지의 개수만큼 반복
            $('.small').each(function(){
                //가운데 이미지의 인덱스 번호를 centerNum변수에 저장
                var centerNum=$(this).index();
                //만약 num값과 centerNum값이 같다면
                if(num==centerNum){
                    //모든 가운데 이미지 안보임
                    $('.small').fadeOut(300);
                    $(this).fadeIn(300);
                }
            });
            //number(숫자)의 개수만큼 반복
            $('.number a').each(function(){
                //숫자(a태그)의 인덱스 번호를 aNum변수에 저장
                var aNum=$(this).index();
                //만약 num값과 aNum값이 같다면
                if(num==aNum){
                    //모든 숫자 안보임
                    $('.number a').hide();
                    //현재 숫자만 보임
                    $(this).show();
                }
            });
                    //txt영역 글자 애니메이션
            $('.txt').each(function(){
                //txt영역의 인덱스 번호를 txtNum변수에 저장
                var txtNum=$(this).index();
                //만약 num값과 txtNum값이 같다면
                if(num==txtNum){
                    $('.txt').removeClass('active').hide();
                    $(this).show().addClass('active');
                }
            });
        });
        //10초마다 자동으로 실행 (10초마다 movefn함수 호출)
        var auto=setInterval(movefn, 10000);
        //함수 선언
        function movefn(){
            $('.next_btn').trigger('click');
            barfn();
        }
        //함수 선언
        function barfn(){
            $('.bar').stop();
            $('.bar').css('width',0);
            //slide_bar 안의 자식 객체 bar의 가로길이 길어짐
            $('.bar').animate({'width':'100%'},9800, function(){
                $('.bar').css('width',0);
            });
        }
        //함수 호출
        barfn();

        //best영역(.best_hover에 마우스 오버했을 때 .best_move가 살짝 이동함)
        $('.best_hover').mouseover(function(){
            //0~50 사이의 무작위 수 발생
            var x=Math.ceil(Math.random()*50);
            var y=Math.ceil(Math.random()*50);
            $(this).find('.best_move').stop().animate({'left':x, 'top':y},1000);
        });
        //best_btn을 클릭하면 오른쪽 3개의 이미지가 이동함
        var sw=0
        //best ul의 길이/2한 값을 ulMove변수에 저장
        var ulMove=Math.ceil($('.best ul').width()/2);
        $('.best_btn').click(function(e){
            e.preventDefault();
            //만약 sw값이 0이면
            if(sw==0){
                sw=1;
                $('.best_btn').css('background-position','left center');
                $('.best ul').stop().animate({left:-ulMove},700,'easeInOutExpo');
            }else{
                sw=0;
                $('.best_btn').css('background-position','right center');
                $('.best ul').stop().animate({left:0},700,'easeInOutExpo');
            }
        });
        //fullpage
        $('#fullpage').fullpage({
            //fullpage의 동그란 메뉴 사용
            navigation:true,
            //fullpage의 동그란 메뉴 위치를 화면 왼쪽으로 설정
            navigationPosition:'left',
            //fullpage의 동그란 메뉴에 메뉴이름 설정
            navigationTooltips:['MAIN','BEST','COMMUNITY','BRAND'],
            //fullpage의 동그란 메뉴의 이름을 사용
            showActiveTooltip:true,
            //fullpage의 내용을 불러온 다음 function안의 명령어 실행
            //매개변수(anchorLink:메뉴랑 section연동, index:section의 인덱스 번호,direction:화면이 이동하는 방향)
            afterLoad:function(anchorLink, index, direction){
                //2번째 section이거나 4번째 section일때는 (논리 연산자||:또는)
                if(index==2 || index==4) {
                    //네비게이션의 주메뉴에 active설정
                    $('header nav > ul > li').addClass('active');
                }
                //첫번째 section이거나 3번째 section일때에는
                if(index==1 || index==3){
                    //네비게이션의 주메뉴에 active설정
                    $('header nav > ul > li').removeClass('active');
                }
            },
            //section이 이동할때 function다음의 명령어 실행
            //매개변수 (index:section의 인덱스번호, nextIndex:다음 section을 가리킴,direction:화면이 이동하는 방향)
            onLeave:function(index, nextIndex, direction){
                //만약 section의 인덱스번호가 4이고, 다음 section의 인덱스번호가 5이면 (section4에서 아래로 이동할 때)
                if(index==4 && nextIndex==5) {
                    //header안의 menu영역이 사라짐
                    $('header .menu').fadeOut();
                //그렇지 않으면
                }else{
                    //header안의 menu영역이 나타남
                    $('header .menu').fadeIn();
                }
            }      
        });

    }else{
        //태블릿, 모바일버전 슬라이드
        //photo의 인덱스 번호를 나타내는 변수
        var mo_num=0;
        //photo의 총 개수를 mo_total 변수에 저장
        var mo_total=$('.photo').length;
        //photo의 가로길이를 imgWidth변수에 저장
        var imgWidth=$('.photo').width();
        //모든 photo 보임
        $('.photo').show();
        //모든 center_img안의 small도 보임
        $('.small').show();
        //마지막 photo이미지를 첫번째 photo이미지의 왼쪽에 배치 
        $('.photo:last-child').prependTo('.left_img');
        //마지막 small이미지를 첫번째 small이미지의 왼쪽에 배치
        $('.small:last-child').prependTo('.center_img');
        //.left_img의 left값을 photo의 가로길이만큼 왼쪽으로 이동시킴
        $('.left_img').css('left',-imgWidth);

        //center_img의 left값을 photo의 가로길이만큼 왼쪽으로 이동시킴
        $('.center_img').css('left',-imgWidth);
        //.number a중 첫번째 a에 active설정
        $('.number a:first-child').addClass('active');
        //.right_txt의 txt객체 중 첫번째 txt에 active클래스 설정
        $('.right_txt .txt:first-child').addClass('active');

        //next_btn에 클릭이벤트 설정
        $('.next_btn').click(function(){
            //이미지의 인덱스 번호를 1씩 증가시킴
            mo_num++;
            //만약 인덱스번호가 mo_total값 이상이면 0으로 초기화
            if(mo_num>=mo_total){ mo_num=0; }
            //mo_num에 해당하지 않는 number a 는 active클래스 제거
            $('.number a').eq(mo_num-1).removeClass('active');
            //mo_num에 해당하는 number a에 active클래스 설정
            $('.number a').eq(mo_num).addClass('active');
            //mo_num에 해당하지 않는 .txt는 active클래스 제거
            $('.txt').eq(mo_num-1).removeClass('active');
            //mo_num에 해당하는 .txt에 active클래스 설정
            $('.txt').eq(mo_num).addClass('active');


            //'-='+imgWidth ==> 왼쪽으로 photo가로길이 만큼 이동
            $('.left_img').animate({left:'-='+imgWidth},700,'easeOutExpo',
            function(){
                //.left_img영역이 이동하고 난 후 첫번째 photo가 left_img영역의 맨뒤로 추가됨
                $('.photo:first-child').appendTo('.left_img');
                $('.left_img').css('left',-imgWidth);

            });

            $('.center_img').animate({left:'-='+imgWidth},700,'easeOutExpo',
            function(){
                //.left_img영역이 이동하고 난 후 첫번째 photo가 left_img영역의 맨뒤로 추가됨
                $('.small:first-child').appendTo('.center_img');
                $('.center_img').css('left',-imgWidth);

            });
        });//next_btn

        //prev_btn에 클릭이벤트 설정
        $('.prev_btn').click(function(){
            //이미지의 인덱스 번호를 1씩 감소시킴
            mo_num--;
            //만약 인덱스번호가 0미만이면 mo_total-1로 초기화
            if(mo_num<0){ mo_num=mo_total-1; }
            //mo_num에 해당하지 않는 number a 는 active클래스 제거
            //:not()메서드는 ()안의 조건의 반대가 되는 객체 선택자
            $('.number a:not(:eq(mo_num))').removeClass('active');
            //mo_num에 해당하는 number a에 active클래스 설정
            $('.number a').eq(mo_num).addClass('active');
            //mo_num에 해당하지 않는 .txt는 active클래스 제거
            $('.txt:not(:eq(mo_num))').removeClass('active');
            //mo_num에 해당하는 .txt에 active클래스 설정
            $('.txt').eq(mo_num).addClass('active');


            //'+='+imgWidth ==> 오른쪽으로 photo가로길이 만큼 이동
            $('.left_img').animate({left:'+='+imgWidth},700,'easeOutExpo',
            function(){
                //.left_img영역이 이동하고 난 후 마지막 photo가 left_img영역의 맨앞으로 삽입됨
                $('.photo:last-child').prependTo('.left_img');
                $('.left_img').css('left',-imgWidth);

            });

            $('.center_img').animate({left:'+='+imgWidth},700,'easeOutExpo',
            function(){
                //.center_img영역이 이동하고 난 후 마지막 small이 center_img영역의 맨앞으로 삽입됨
                $('.small:last-child').prependTo('.center_img');
                $('.center_img').css('left',-imgWidth);

            });
        });//prev_btn

        //mo_best 슬라이드
        //outerWidth()메서드는 패딩값,마진값까지 포함한 가로길이를 구함
        var mo_width=$('.mo_best ul li').outerWidth();
        $('.mo_best ul li:last-child').prependTo('.mo_best ul');
        $('.mo_best ul').css('left',-mo_width);

        //배열선언
        var startX={};
        var endX={};
        $('.mo_best ul').on({
            //.mo_best ul 객체에 touchstart이벤트 설정
            'touchstart':function(e){
                //터치이벤트가 발생한 객체
                //pageX : 가로 스크롤을 포함한 브라우저 화면을 기준으로한 X좌표
                startX=e.touches[0].pageX;
            },
            //mo_best ul 객체에 touchmove 이벤트 설정
            'touchmove':function(e){
                //touch움직임이
                endX=e.touches[0].pageX;
                //touch한 시작X좌표에서 움직임이 끝난 X좌표값을 빼서 fnX에 저장
                var fnX=startX-endX;
                //만약 fnX값이 0보다 크면(왼쪽방향)
                if(fnX>0){
                    $('.mo_best ul').stop().animate({'left':'-='+mo_width},700,'easeInExpo',function(){
                        $('.mo_best ul li:first-child').appendTo('.mo_best ul');
                        $('.mo_best ul').css('left',-mo_width);
                    });

                //fnX값이 0보다 크지 않다면(작거나 같다면,오른쪽방향)        
                }else{
                    $('.mo_best ul').stop().animate({'left':'+='+mo_width},700,'easeInExpo',function(){
                        $('.mo_best ul li:last-child').prependTo('.mo_best ul');
                        $('.mo_best ul').css('left',-mo_width);
                    });
                }

            }
        });


    } //if



});