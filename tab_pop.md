### T-1 
탭메뉴

``` html
<section class="content1">
    <div class="tab-menu">
        <div class="tab-btn">
            <ul>
                <li class="active"><a href="#">탭메뉴1</a></li> 
                <li><a href="#">탭메뉴2</a></li>
            </ul>
        </div>
        <div class="tab-con">
            <div>
                탭메뉴1<br>탭메뉴1<br>탭메뉴1<br>탭메뉴1
            </div>
            <div>
                탭메뉴2<br>탭메뉴2<br>탭메뉴2<br>탭메뉴2
            </div>
        </div>
    </div>
</section>
```
- T-1 html 전체 코드

---

``` css
/* tab-menu */
        .tab-menu {
            /* 탭메뉴 전체 영역에 안쪽 여백 20px */
            padding: 20px; 
        }
        /* ul안의 li 가로정렬 */
        .tab-menu .tab-btn ul {
            display: flex;
        }
        /* li의 기본 점들을 없애줌 */
        .tab-menu .tab-btn li {
            list-style: none;
        }
        /* li에 active 클래스가 붙어있을때 안의 a태그에 밑줄 줌 */
        /* js가 나중에 클릭한 탭에 active를 붙여줄것임 */
        .tab-menu .tab-btn li.active a {
            text-decoration: underline;
        }
        /* 탭버튼 링크에 스타일  */
        .tab-menu .tab-btn li a {
            display: block; /* a태그를 블록으로 만들어서 padding이 먹히게 함 */
            padding: 10px; /* 버튼 안쪽 여백 */
            background-color: #6b6b6b;
        }
        /* 탭 내용 영역 스타일 */
        .tab-menu .tab-cont > div {
            padding: 10px; /* 내용 안쪽 여백 */
            background-color: #b0b0b0;
            line-height: 1.6; /* 줄간격 */
        }
        /* 탭 내용 중 두번째 div만 숨김. 처음엔 탭1만 보이고, 탭2 숨김 */
        .tab-menu .tab-cont > div:nth-child(2){
            display: none;
        }
```
- css 기본 구조

---

``` javascript
<script>
    $(function(){
        // 탭 버튼 li 2개를 선택해서 tabBtn에 저장
        let tabBtn = $('.tab-btn > ul > li'); 
        // 탭 내용 div 2개를 선택해서 tabCont에 저장
        let tabCont = $('.tab-cont > div');
        
        tabCont.hide().eq(0).show(); // 첫번째 컨텐츠만 보이게 설정

        tabBtn.click(function(){ // 탭 버튼 클릭했을때 실행
            const index = $(this).index(); // 클릭한 번호를 저장

            $(this).addClass('active').siblings().removeClass('active'); // 내가 클릭한 버튼에 클래스를 추가하고 나머지 버튼은 삭제
            tabCont.eq(index).show().siblings().hide(); // 내가 클릭한 버튼의 컨텐츠는 보여주고, 나머지는 숨김
        })
    })
</script>
```
- T-1 제이쿼리 전체코드

` tabCont.hide().eq(0).show(); `
- 내용 2개를 전부 숨기고, 첫번째 내용 선택해서 첫번째만 보이게 함

`const index = $(this).index();`
- 클릭한 li가 몇번째인지 번호 가져옴
    - 탭1 클릭 → index = 0
    - 탭2 클릭 → index = 1

`$(this).addClass('active').siblings().removeClass('active');`
- 클릭한 li에 active 클래스 추가하고, 나머지 li들 선택하고, 나머지 li들의 active 클래스 제거
    - 탭1 클릭하면, 탭1에 밑줄, 탭2 클릭하면 탭2에 밑줄

`tabCont.eq(index).show().siblings().hide();`
- 클릭한 번호와 같은 내용을 선택, 그 내용을 보여줌, 나머지 내용들 선택, 나머지 내용을 숨김
    - 탭1 클릭하면 내용1이 보이고, 내용2 숨김. 탭2 클릭하면 내용2 보이고 내용1 숨김

---

``` javascript
<script>
    window.onload = function(){
        let tabBtn = document.querySelectorAll('.tab-btn > ul > li'); // 버튼 설정
        let tabCont = document.querySelectorAll('.tab-cont > div'); // 콘텐츠 설정

        tabCont.forEach(el => el.style.display = "none"); // 모든 콘텐츠를 숨김
        tabCont[0].style.display = "block"; // 첫번째 콘텐츠르 보이게 설정

        tabBtn.forEach((tab, index) => { 
            tab.addEventListener("click", () => {

                tabBtn.forEach(tab => tab.classList.remove("active")); // 모든 버튼 클래스 삭제
                tab.classList.add("active"); // 클릭한 버튼만 클래스 추가

                tabCont.forEach(cont => cont.style.display = "none"); // 모든 콘텐츠 숨김
                tabCont[index].style.display = "block"; // 클릭한 버튼에 콘텐츠 내용을 보여줌
            });
        });
    }
</script>
```
- T-1 js 전체 코드
`tabBtn.forEach((tab, index) => {`
- tab : 현재 li 요소
- index : 현재 li가 몇번쨰인지(0, 1)

`tabBtn.forEach(tab => tab.classList.remove("active"))`
- 클릭했을때 모든 버튼에서 active 클래스를 제거함. 이게 없으면 탭1, 탭2 둘다 밑줄 생김

`tab.classList.add("active")`
- 클릭한 버튼에만 active 클래스를 추가함. 그러면 밑줄 생김

`tabCont.forEach(cont => cont.style.display = "none")`
- 모든 내용 숨김

`tabCont[index].style.display = "block"`
- 클릭한 버튼 번호(index)와 같은 번호의 내용만 보여줌
    - 탭1 클릭 -> index = 0 -> tabCont[0] 보임
    - 탭2 클릭 -> index = 1 -> tabCont[1] 보임

전체흐름 : 탭2클릭 -> 모든 버튼 active 제거, 탭2에 active 추가(밑줄생김) -> 모든 내용 숨김 -> 내용2 보임

---

### P-1
팝업 

``` html
<main id="contents">
    <section class="content3"> 
        <a href="#" class="popup-btn">팝업</a> <!-- 추가함 -->
    </section>
</main>
<!-- //contents --> 

<div class="popup-view">
    <a href="#" class="popup-close">닫기</a>
</div>
<!--  // popup-view-->
```
- P-1 html 전체 코드

---

``` css
/* popup */
#wrap {
    position: relative; /* 박스를 기준으로 가운데 정렬 기준점 */
}
.content3 {
    display: flex;
    align-items: center;
    justify-content: center;
}
.popup-btn {
    background-color: rgba(255, 255, 255, 0.6);
    display: inline-block; /* 왜 그냥 블록이 아닌가 */
    padding: 10px;

}
.popup-view {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    background-color: #a2a2a2;
    border: 3px solid #000;
    z-index: 1000; /* 다른 요소들 위에 뜨게 */
    display: none; /* 처음엔 숨겨둠 */
}
.popup-close {
    background-color: #fff;
    display: inline-block;
    padding: 10px;
}
```
- P-1 css 전체코드

`#wrap {position: relative;}`
- 팝업화면 정중앙 뜨도록 기준점을

`.content3 { display: flex; align-items: center;justify-content: center;}`
- 팝업 버튼을 content3 안에서 정중앙에 배치
    -  display: flex; -> 정렬기능 스위치 on, 이걸 해야 아랫거 작동 가능
    - align-items: center     → 세로 중앙
    - justify-content: center → 가로 중앙

`.popup-btn {display: inline-block;}`
- a는 인라인 이라서 padding 이 안먹힘. block 을 주면 버튼이 가로로 꽉 차버림. 그래서 inline-block 으로 padding은 먹히면서 크기는 내용물에 맞게 함

---

``` javascript
<script>
    $(function(){
        $(".popup-btn").click(function(){
            $(".popup-view").show();
        });
        $(".popup-close").click(function(){
            $(".popup-view").hide();
        });
    })
</script>
```
- P-1 제이쿼리 전체 코드
- popup-btn 버튼을 클릭하면 popup-view를 보이게 하라
- popup-close 버튼을 클릭하면 popup-view를 가려라

---

``` javascript
<script>
    window.onload = function(){
        document.querySelector(".popup-btn").addEventListener("click", function(){
            document.querySelector(".popup-view").style.display = "block";
        });
        document.querySelector(".popup-close").addEventListener("click", function(){
            document.querySelector(".popup-view").style.display = "none";
        })

    }
</script>
```
- P-1 js 전체 코드