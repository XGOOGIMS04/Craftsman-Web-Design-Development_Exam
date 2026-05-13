## M-1 M-2 차이
M-1 -> 메뉴 하나에 마우스를 올리면 그 메뉴의 서브메뉴만 열림
M-2 -> 메누 하나에 마우스를 올리면 서브메뉴 4개가 전부 열림


### M-1

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


### M-2
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