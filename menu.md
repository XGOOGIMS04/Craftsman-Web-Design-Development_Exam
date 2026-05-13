## M-1 M-2 차이
M-1 -> 메뉴 하나에 마우스를 올리면 그 메뉴의 서브메뉴만 열림
M-2 -> 메누 하나에 마우스를 올리면 서브메뉴 4개가 전부 열림


### << M-1 >>

```css
/* nav */
.nav {
}
.nav > ul {
}
.nav > ul > li {
}
.nav > ul > li > a {
}
.nav > ul > li > ul {
}
.nav > ul > li > ul > li {
}
.nav > ul > li > ul > li > a {
}
```

```html
<nav class="nav">
    <ul>
        <li>
            <a href="#">메뉴1</a>
            <ul>
                <li><a href="#">서브메뉴1-1</a></li>
                <li><a href="#">서브메뉴1-2</a></li>
                <li><a href="#">서브메뉴1-3</a></li>
            </ul>
        </li>
        <li>
            <a href="#">메뉴2</a>
            <ul>
                <li><a href="#">서브메뉴2-1</a></li>
                <li><a href="#">서브메뉴2-2</a></li>
                <li><a href="#">서브메뉴2-3</a></li>
            </ul>
        </li>
        <li>
            <a href="#">메뉴3</a>
            <ul>
                <li><a href="#">서브메뉴3-1</a></li>
                <li><a href="#">서브메뉴3-2</a></li>
                <li><a href="#">서브메뉴3-3</a></li>
            </ul>
        </li>
        <li>
            <a href="#">메뉴4</a>
            <ul>
                <li><a href="#">서브메뉴4-1</a></li>
                <li><a href="#">서브메뉴4-2</a></li>
                <li><a href="#">서브메뉴4-3</a></li>
            </ul>
        </li>
    </ul>
</nav>
```

- 메뉴와 서브메뉴 기본구조

```css
.nav > ul > li > a {
    display: inline-block;
    padding: 10px 50px;
    background-color: #b0b0b0;
}
```

- a 태그는 인라인 구조라서 padding 좌우가 안먹힘 -> display: inline-block; 로 인라인과 블록 성질을 동시에 가지고 있도록 부여함

```css
.nav > ul > li > ul > li > a {
    display: inline-block;
    padding: 10px;
    background-color: #c1c1c1;
    width: 100%;
    box-sizing: border-box;
}
```

- 서브메뉴도 동일하게 해줌
- width 값에 100%를 주면, padding 양쪽에 10px이 포함되어 있어서 오버를 함 -> width 안에 padding을 포함시키기 위해 box-sizing: border-box; 를 사용함

```css
.nav > ul > li > ul {
    position: absolute;
    left: 0;
}
```

- 서브메뉴가 .nav 영역을 차지하면 안되기 때문에 position 을 준다. 그리고 li 각각에 기준점을 준다
- 그러면 영역이 사라지기 때문에 서브메뉴 width 값이 적용이 안되기 때문에 다시 width값을 부여해줘야함

```javascript
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script>
    $(document).ready(function(){
        $(".nav > ul > li").mouseover(function(){
            $(this).find('.submenu').stop().slideDown()
        })
        $('.nav > ul > li').mouseout(function(){
            $(this).find('.submenu').stop().slideUp()
        })
    })
</script>
```
- 제이쿼리 버전

```javascript
<script>
window.onload = function(){
    let navList = document.querySelectorAll('.nav > ul > li')

    navList.forEach(function(navItem){
        navItem.addEventListener("mouseover", function(){
            this.querySelector('.submenu').style.height = '155px';
        });
    });
    navList.forEach(function(navItem){
        navItem.addEventListener("mouseout", function(){
            this.querySelector('.submenu').style.height = '0px'
        });
    });
}</script>
```
- javascript 버전

``` javascript 
let navList = document.querySelectorAll('.nav > ul > li')
```
- a태그가 아닌 li 태그가 이벤트 대상

``` javascript 
navList.forEach(function(navItem){
    ...
})
```
- 배열의 요소를 하나씩 꺼내서 반복해줌
- forEach가 반복할때마다 현재 요소를 꺼내서 콜백 함수에 자동으로 넘겨주며 navItem에 담김
    1번째 반복 → navItem = 메뉴1 li
    2번째 반복 → navItem = 메뉴2 li
    3번째 반복 → navItem = 메뉴3 li
    4번째 반복 → navItem = 메뉴4 li

``` javascript 
navItem.addEventListener("mouseover", function(){
    ...
})
```
- 요소.addEventListener("이벤트 종류", 실행할 함수)
- 마우스 오버했을때 실행할 함수 등록

``` javascript
this.querySelector(".submenu").style.height = "155px"
```
- 마우스가 올라간 li(this) 안의 submenu를 찾아라
- querySelector인 이유는 메뉴1에 마우스를 올렸는데 4개 submenu가 다 열리면 안되기 때문. this를 사용하면 지금 이벤트가 발생한 그 li안에서만 찾기 때문에 1개만 열림
- 그 요소의 height를 155px로 직접 지정
- 155px이 이유는 submenu 항목이 3개이고, 각 항목의 높이를 계산한 값

``` css
/* js용 css */
.nav > ul > li > ul {
    display: block;
    height: 0; /* 처음엔 높이를 0으로 숨김 */
    overflow: hidden; /* height가 0이면 내용이 안보이게 잘라냄 */
    transition: all 600ms; /* height가 변할떄 600ms 동안 서서히 변함 */
}
```
- js로 height를 조절하려면, css에서 미리 height 트렌지션 세팅이 되어있어야함
- display:none 대신 height:0 을 쓰는 이유 ?
    transition 은 display:none -> block 사이에서는 애니메이션이 동작하지 않음. 반면 height: 0 -> 155px는 숫자 사이 변화라서 부드럽게 작동함. 즉, slideDown 효과를 사용하기 위함
- height: 0; 은 처음에 서브메뉴를 숨김
- overflow: hidden; 은 height가 0일떄 내부 내용이 빠져나오지 않게 잘라냄
- height를 0으로 박스 크기를 0으로 만들어도, 박스 밖으로 나온 내용물들을 잘라내야 하기 때문에 오버플로를 사용해준다 + height는 박스 크기만 줄이고, 안에 있는 내용물한테는 아무 영향을 안주기때문에 내용물인 서브메뉴는 어딘가에 존재하여 밖으로 튀어나온다
- transition: all 600ms 는 height값이 바뀔때마다 애니메이션 효과를 줌

#### M-1 최종정리
1. 페이지 로드 완료 (window.onload)
2. li 4개를 navList에 저장
3. li 4개 각각에 mouseover/mouseout 이벤트 등록
4. 메뉴1에 마우스 올림
5. mouseover 이벤트 발생 → this = 메뉴1 li
6. 메뉴1 li 안의 .submenu를 찾아 height = 155px
7. CSS transition이 0px → 155px를 600ms에 걸쳐 서서히 열어줌
8. 마우스 나가면 mouseout → height = 0으로 되돌림


### << M-2 >>
``` css
.nav > ul {
    display: flex;
}
```
메뉴 정렬할떄 .nav > ul > li 가 아닌 .nav > ul > li에게 주는 이유?
- display: flex 는 그 요소의 자식들을 가로로 정렬해줌. 즉, flex를 준 요소가 아니라 그 안의 자식들이 영향을 받음
- 그래서 정렬하고 싶은 요소의 부모에게 줘야함. html때 적용한거 기억하기

``` javascript
<script>
$(function(){
    $('.nav > ul > li').mouseover(function(){
        $('.nav > ul > li > ul').stop().slideDown(200)
    })
    $('.nav > ul > li').mouseout(function(){
        $('.nav > ul > li > ul').stop().slideUp(200) 
    })
})
</script>
```
- 제이쿼리 전체 코드
- $('.nav > ul > li > ul') 에서 M-1 과는 다르게 this가 아닌 이유?
    마우스를 오버한 애가 아니라 서브메뉴 ul 4개를 다 선택해야 하기 때문

``` javascript 
<script>
    window.onload = function(){
        let navList = document.querySelector('.nav > ul')

        navList.addEventListener("mouseover", function(){
            navList.querySelectorAll('.submenu').forEach(sub => {
                sub.style.height = '155px'
            })
        })
        navList.addEventListener("mouseout", function(){
            navList.querySelectorAll('.submenu').forEach(sub => {
                sub.style.height = '0'
            })
        })
    }
</script>
```
- js 전체 코드

``` javascript
let navList = document.querySelector('.nav > ul')
```
- querySelector 로 ul 한개만 선택함. 그래서 li 각각이 아닌, ul 전체에 이벤트를 검

``` javascript 
navList.addEventListener("mouseover", function(){
    navList.querySelectorAll('.submenu').forEach(sub => {
        sub.style.height = '155px'
    })
})
```
- ul 전체에 mouseover를 검
- querySelectorAll로 서브메뉴 4개를 전부 선택하고, forEach로 4개 전부 height를 155px로 바꿈

#### M-2 최종정리
1. ul 1개를 navList에 저장
2. navList 전체에 mouseover/mouseout 이벤트 등록
3. 메뉴 어디든 마우스 올림
4. submenu 4개를 전부 찾아서 height = 155px
5. 마우스 나가면 4개 전부 height = 0
- 추가로 궁금했던 점 : forEach에서 높이 각각 155px를 줬는데, 왜 각각 하나씩 안내려가고, 한번에 내려가는것인? => 4개를 순서대로 처리하는데, 그 속도가 사람눈에 보이지 않을 만큼 빠름. 그래서 동시에 바뀌는것처럼 보임


### << M-3 >>
M-3 은 전체 서브메뉴 색상이 들어가야함
전체메뉴를 가상요소를 이용하여 처리함

``` css
#header {
    position: relative; /*메뉴 기준점 추가해줌*/
}
#header::after { /* 가상요소 */
    content: ''; /* 필수! 없으면 가상요소 안생김 */
    width: 100%;
    height: 0; /*스크립트로 처리해줄것*/
    background-color: #808080;
    position: absolute;
    z-index: 1; /* .nav보다 우선순위를 낮게 설명함 */
    left: 0;
    top: 100px; /* header 아래에 위치 */
    transition: all 400ms;
}
#header.on::after {
    height: 155px; /* header가 0이였다가 class on이 생겼을때 155로 바뀜 */
} 
```
- ::after 는 html에 태그를 추가하지 않고 css 만으로 요소를 하나 만드는것
- 메뉴의 배경을 가상요소로 만들어줌

``` css
/* nav */
.nav {
    position: relative; /* z-index는 position이랑 같이 써야함 */
    z-index: 1000; /*겹쳤을때 우선순위 정해줌*/
}
.nav > ul {
    display: flex;
    justify-content: right;
    margin-top: 61px; /*밑 고정*/
}
.nav > ul > li {
    position: relative;
}
.nav > ul > li > a {
    display: inline-block;
    padding: 10px 50px;
    background-color: #b0b0b0;
}
.nav > ul > li > a:hover {
    background-color: #696969;
}
.nav > ul > li > ul {
    text-align: center;
    position: absolute;
    top: 39px; /*이게 없으면 서브메뉴가 a태그 위에 겹침*/
    left: 0;
    width: 100%; /* 박스사이징 하고 적용이 안된 너비 처리 */
    display: none;
}
.nav > ul > li > ul > li {}
.nav > ul > li > ul > li > a {
    display: inline-block;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}
.nav > ul > li > ul > li > a:hover {
    background-color: #8f8f8f;
}
```
- nav 부분 css
- z-index 를 사용하여, 가상 박스와 서브메뉴의 우선순위를 정해줌. 이때 z-index는 position이랑 같이 사용해야함

``` javascript
<script>
$(function(){
    $('.nav > ul > li').mouseover(function(){
        $('.nav > ul > li > ul').stop().slideDown(500)
        $('#header').addClass('on') /* header 에 클래스 on을 붙이면 css에 만든 가상박스 나옴 */
    })
    $('.nav > ul > li').mouseout(function(){
        $('.nav > ul > li > ul').stop().slideUp(100)
        $('#header').removeClass('on') /* header 에 클래스 on을 붙이면 css에 만든 가상박스 삭제됨 */
    })
})
</script>
```
- 제이쿼리 전체 코드

``` javascript
<script>
window.onload = function(){
    let navList = document.querySelector('.nav > ul')

    navList.addEventListener("mouseover", () => { // 화살표 함수 사용
        navList.querySelectorAll('.submenu').forEach(sub => {
            sub.style.height = '156px'
        })
        document.getElementById('header').classList.add('on') // header에 class = 'on'을 붙여라?
    })
    navList.addEventListener("mouseout", () => { // 화살표 함수 사용
        navList.querySelectorAll('.submenu').forEach(sub => {
            sub.style.height = '0px'
        })
        document.getElementById('header').classList.remove('on')
    })
}
</script>
```
- js 전체 코드

``` javascript
document.getElementById('header').classList.add('on')
document.getElementById('header').classList.remove('on')
```
- M-3 에서 추가된 부분
- classList : 요소의 클래스를 추가/제거/확인할 수 있는 기능
- classList.add('on')은 <div id="header" class="on"> 으로 바뀌며, css에서는 #header의 높이가 156px 로 바뀌며 회색 배경이 펼쳐짐

#### M-3 최종 정리
마우스 올림
├── 서브메뉴 4개 height = 156px (서브메뉴 열림)
└── header에 class="on" 추가 → 회색 배경 펼쳐짐

마우스 나감
├── 서브메뉴 4개 height = 0 (서브메뉴 닫힘)
└── header에 class="on" 제거 → 회색 배경 사라짐