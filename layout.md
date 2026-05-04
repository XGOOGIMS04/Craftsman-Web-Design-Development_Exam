### layoutA-1
``` css
margin: 0 auto 
```
- 가운데 정렬

``` css  
display: flex
```
- 자식 요소들을 가로로 정렬할때 사용

### layout A-2
``` html
<article id="slider"></article>
```
- 이미지 슬라이드 태그는 없기에 강사님은 article 시멘틱 태그로 사용 
- section으로도 사용 가능


``` html
<nav class="nav"></nav>
```
- 주요 네비게이션의 링크 담는 영역

``` html  
<section class="content1"></section>
```
- content들은 각 영역의 독립적인 의미를 가지기에 section 태그 사용

### layoutB-1
```css 
#wrap { width: 100%; }
```
- B유형은 처음 영역을 잡을떄 wrap 너비를 1200px이 아닌 100%로 줘아햠

``` html
     <header id="header">
        <div class="header_container">
            <h1 class="logo"></h1>
            <nav class="nav"></nav>
        </div>
    </header>
```
- header_container 만들기
- header 영역에는 100%인 전체영역과 1200px인 가운데 영역이 있어야하므로 가운데 영역을 만들어줄 header_container 를 만들어 준다. 그 안에 로고랑 네비 부여


### layout B-3
``` html
<div class="container"></div>
```
- B-2 처럼 헤더와 푸터에 각각 컨테이너를 주지 않고, 재활용 가능한 컨테이너를 만들어준다

``` css
/* 컨테이너 재활용 */
.container {
    width: 1200px;
    height: inherit;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
}
```
- height 는 부모한테 상속 받음
- flex 로 가로 정렬

### layout C-1
``` html
<div id="wrap">
    <aside id="aside"></aside>
    <main id="main"></main>
</div>
```
- C유형은 크게 왼쪽(aside)와 오른쪽(main)으로 나눈 후 세분화 하였다


- html 구조상 id = main 안에 id = slider, contents, footer 가 있지만 중복될 일이 없기때문에 css 작성할때 #main #slider {} 가 아닌, #slider 로 적어주었다


- aside의 로고와 네비를 나눌 때 세로 정렬 이기 때문에 display:flex; 는 필요가 없다


- contents 영역을 나눌떄 독립적인 주제 영역이라면 article 을 사용해도 괜찮다, 주제별로 묶일때 사용하는 section을 사용해도 괜찮다. 사용하기 나름

### layout C-2
``` css
#aside h1 {}
#aside nav {}
```
- logo, nav는 중복되지 않기때문에 클래스 선택자를 사용했던 이전과는 다른방법으로 h1, nav 태그 선택자를 사용해보았다


### layout D-1
- 크게 세 aside, main, footer  세 영역으로 나누었다

``` css
#main {
    width: calc(100% - 200px);
}
```
- main 은 aisde 와 달리 반응형이여서, 정확히 픽셀로 지정할 수 없다.
- 또한, 퍼센트와 픽셀은 같이 쓸 수 없음 -> calc()로 사용하였다

``` css 
#wrap {
    display: flex;
    flex-wrap: wrap;
}
```
- aside, main, footer를 한줄에 억지로 넣으려고 하기에 한줄에 다 붙어버린다 
- flex-wrap: wrap;을 사용하여 공간이 부족하면 자동으로 내려가도록 하였다


``` css
#slider .link {
    position: absolute;
    right: 0;
    top: 0;
}
```
``` css
#slider {
    position: relative;
}
```
- 링크를 slider 위로 올리기 위해 link에 position: absolute; 를 사용해준다
- absolute; 를 사용했으면 반드시 방향을 지정해줘야하며, 기준점이 되는 relative를 설정해야한다
- 단, position: absolute; 를 자주 쓰게되면 반응형이 어려워진다는 단점이 있다


##### 새로 알게된 단축키 : 태그 선택하고 command + d => 태그 동시 선택 가능

### layout E-1(위아래 반응형)
``` html
<div id="wrap">
    <main id="main"></main>
    <footer id="footer"></footer>
</div>
```
- 크게 구조를 main(A, B, C) 과 footer(D) 로 나누었다

``` css
#main {
    width: 100%;
    height: calc(100vh - 120px);
    background-color: #efefef;
}
```
- E유형에서 footer 영역을 제외한 높이가 100%으로 맞춰야한다
- height는 % 라는걸 인식할 수 없다(제일 처음 height에 %를 쓸때?..)
- 그럴때 쓰는 단위는 vh, 내 화면을 기준으로 처리해준다. 
- ex. 100vh = 화면을 100등분을 꽉 채워라

``` html
<main id="main">
    <header id="header"></header>
    <section id="contents"></section>
    <article id="slider"></article>
</main>
```
``` css
#header {
    width: 200px;
    height: 100%; /* height에 % 가능 */
    background: #efefef;
}
```
- #main 안의 A, B, C는 각각  header, contents, slider 영역으로 나누었다
- 부모인 main의 height 값이 정해져 있으므로 자식인 A, B, C에선 %가 먹힌다


``` css
#header .logo {
    width: 100%;
    height: 10%;
    background-color: #e3e3e3;
}
```
- 위아래 다 반응형이라서 강사님은 .logo 높이도 %로 작성한거같음

### layout E-4 
``` css 
#footer .footer1 {
    width: 200px; /* 200px 고정 */
    height: 120px;
    background-color: #a3a3a3;
}
#footer .footer2 {
     width: calc(100% - 500px); /* calc 사용 */
}
#footer .footer2 .footer2-1 {
    width: 100%;
    height: 60px;
    background-color: #9d9d9d;
}
#footer .footer2 .footer2-2 {
    width: 100%;
    height: 60px;
    background-color: #929292;
}
#footer .footer3 {
    width: 300px; /* 감잡아서 300px */
    height: 120px;
    background-color: #838383;
}
```
- footer 레이아웃 에서는 logo 영역이 200px에 맞춰줘있다. 그래서 footer css를 위 처럼 해보았다

### layout F-1
``` css
#slider .link {
    width: 1340px;
    height: 100px;
    background-color: red;
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: translateX(-50%);
}
```
- .banner는 slider 위에 있다. 그래서 position: absolute;를 사용하여 위치를 지정해준다
- bottom: 0;, right: 50%; 이면 .banner의 왼쪽이 slider의 50%가 되는 위치에서부터 시작한다
- transform: translateX(-50%); 에서 translateX(-50%)는 x축으로 -50% 만큼 이동한것이다. 
- 위의 설명들을 조합하면 banner가 slider의 bottom 중앙에 위치하게 된다