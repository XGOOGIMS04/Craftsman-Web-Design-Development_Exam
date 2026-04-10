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