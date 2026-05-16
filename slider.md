### S-1
제자리에서 3초에 한번씩 움직임

``` html
<article id="slider">
    <div class="sliderWrap"> 
        <div class="slider s1">
            <img src="./이미지/slider01.jpg" alt="이미지 설명1">
            <span>이미지1</span> 
        </div>
        <div class="slider s2">
            <img src="./이미지/slider02.jpg" alt="이미지 설명2">
            <span>이미지2</span>
        </div>
        <div class="slider s3">
            <img src="./이미지/slider03.jpg" alt="이미지 설명3">
            <span>이미지3</span>
        </div>
    </div>
</article>
```
- 슬라이드 html

---

``` css
.sliderWrap {}
.sliderWrap .slider {}
.sliderWrap .slider img {}
.sliderWrap .slider span {}
```
- 슬라이더 기본 css 구조

``` css
.sliderWrap {
    position: relative; /* 기준점 */
}
.sliderWrap > div {
    display: none; /* 우선 이미지를 안보이게 설정해줌 */
}
.sliderWrap > div:first-child { /* 첫번째 이미지를 보이게 해줌 */
    display: block; 
}
.sliderWrap .slider {
    position: absolute; /* 이미지 3개 겹침 */
    left: 0;
    top: 0;
}
.sliderWrap .slider img {
    vertical-align: top;
}
.sliderWrap .slider span {
    position: absolute;
    left: 50%; /* 요소의 왼쪽 상단 꼭짓점을 중앙으로 보내기 때문에, 약간 오른쪽 아래로 치우침 */
    top: 50%;
    transform: translate(-50%, -50%); /* 그래서 transform을 사용하여 요소 자신의 너비의 50%, 높이의 50% 만큼 왼쪽 위로 다시 당겨줌 */
    background-color: rgba( 0, 0, 0, 0.4);
    padding: 10px 50px;
    color: #fff;
}
```
- 전체적 css 코드

``` css
.sliderWrap .slider span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
```
- css 정중앙 정렬 곻식
left: 50%   → 가로 중앙으로 이동 (근데 약간 오른쪽으로 치우침)
top: 50%    → 세로 중앙으로 이동 (근데 약간 아래로 치우침)
translate(-50%, -50%) → 치우친 만큼 보정해서 완벽한 정중앙

- left 50%, top 50%를 주면 요소의 왼쪽 상단 꼭짓점이 정중앙으로 이동
    -> 약간 오른쪽 아래로 치우쳐보임
- 이 치우친 것을 transform으로 보정해줌
    -> 요소 자신의 너비의 50%, 높이의 50% 만큼 왼쪽 위로 당겨움 + span 자체가 왼쪽으로 50%, 위쪽으로 50% 이동함
    -> translate 는 요소를 밀어주기만 함
    translate(-50%, -50%)
        → 왼쪽으로 span너비의 50% 만큼 밀기
        → 위로 span높이의 50% 만큼 밀기

기준! 
left: 50%          → 부모(slider) 너비의 50%
translate(-50%)    → 자기 자신(span) 너비의 50%

``` css
.sliderWrap .slider img {
    vertical-align: top;
}
```
- 이미지는 인라인 구조이기 때문에 약간 여백이 생김
- .slider 박스가 이미지 높이 + 여백 높이 만큼 커져버림
- vertical-align: top; 으로 여백 제거 -> 박스 이미지 크기가 딱 맞춰짐

``` css
.sliderWrap > div {
    display: none; /* 우선 이미지를 안보이게 설정해줌 */
}
.sliderWrap > div:first-child { /* 첫번째 이미지를 보이게 해줌 */
    display: block; 
}
```
- 이미지를 안보이게 설정해준다음, 첫번째 이미지만 보이게 하고, 첫번째 사라지고 두번째만 보이게, 두번째 사라지고 세번째만 보이게 이걸 스크립트로 처리해줄것

``` javascript
    let currentIndex = 0; // 첫번째 이미지
```
- currentIndex가 0이면 첫번째 이미지, 2로 바뀌면 두번째 이미지 이런식으로 바뀜

``` javascript
<script>
    $(function(){
        let currentIndex = 0; // 첫번째 이미지로 나타나게 설정. 현재 보이는 슬라이드 번호
        
        setInterval(function(){ // 3초에 한번씩 실행
            let nextIndex = (currentIndex + 1) % 3 // 1 2 0 반복, 다음 슬라이드 번호 

            $('.slider').eq(currentIndex).fadeOut(1200); // 첫번째(현재) 이미지 사라짐
            $('.slider').eq(nextIndex).fadeIn(1200);  // 두번째(다음)이미지 나타남
            
            currentIndex = nextIndex; // 두번째 인덱스 값을 현재 인덱스가 값에 저장. 현재 번호를 다음 번호로 업데이트

        }, 3000) // 3초 뒤에 작동시켜라 
    })
</script>
```
- 제이쿼리 전체 코드
- eq : 선택한 요소들 중에서 몇번째 것을 선택할지 지정하는 것. 인덱스는 0에서 부터 시작
    $('.slider').eq(0)  // 첫번째 slider (s1)
    $('.slider').eq(1)  // 두번째 slider (s2)
    $('.slider').eq(2)  // 세번째 slider (s3)

``` javascript
<script>
    window.onload = function(){
        let currentIndex = 0; // 현재 이미지
        const slider = document.querySelectorAll('.slider'); // 모든 이미지를 변수에 저장

        // 아래 부분은 css 의 > div, > div:first-child 부분
        slider.forEach(img => img.style.opacity = '0'); // 모든 이미지를 투명하게
        slider[0].style.opacity = '1'; // 첫번째 이미지만 보이게

        setInterval(() => {
            let nextIndex = (currentIndex + 1) % slider.length; // 1 2 0  반복

            slider[currentIndex].style.opacity = '0'; // 첫번째 이미지 사라짐
            slider[nextIndex].style.opacity = '1'; // 두번째 이미지 나타남
            slider.forEach(img => img.style.transition = 'all 1s'); // 이미지의 애니메이션 추가

            currentIndex = nextIndex; // 두번째 인덱스 값을 현재 인덱스 값에 저장 
        }, 3000)
    }
</script>
```
- js 전체 코드

``` javascript
window.onload = function(){
    // 현재 보이는 슬라이드 번호를 저장하는 변수
    let currentIndex = 0; 

    // .slider 클래스를 가진 요소 3개를 전부 선택해서 slider 에 저장함. 이후 querySelectorAll이 반환하는게 노트리스트 배열 형태이기 때문에 slider [0], slider [1], slider[2] 로 각각 접근 가능
    const slider = document.querySelectorAll('.slider');

    // 슬라이드 3개를 전부 투명하게 만듬. forEach로 3개를 하나씩 꺼내서 opacity = 0을 줌
    slider.forEach(img => img.style.opacity = '0'); 

    // 바로 위 코드에서 3개를 전부 투명하게 했는데, 첫번째 슬라이드만 다시 보이게 해줌(코트 재사용성)
    slider[0].style.opacity = '1';

    setInterval(() => { // 일정 시간마다 반복 실행 함수
        // 다음에 보여줄 슬라이드 번호 계산. slider.length 슬라이드 개수
        let nextIndex = (currentIndex + 1) % slider.length; 

        // 현재 보이는 슬라이드를 투명하게 만들어서 사라지게 함
        slider[currentIndex].style.opacity = '0'; 

        // 다음 슬라이드를 보이게 만듬
        slider[nextIndex].style.opacity = '1'; 

        // opacity가 바뀔때 1초 동안 부르럽게 전환되게 애니메이션을 줌. setInterval안에 있어서 처음 로드 때는 적용 안되고, 첫번째 전환부터 적용됨. 첫번째 이미지 후 두번째 이미지로 전환될때부터 자연스럽게 하기 위해 setInterval 안에 넣음
        slider.forEach(img => img.style.transition = 'all 1s'); 

        // 다음 슬라이드 번호를 현재 번호로 업데이트 
        currentIndex = nextIndex; 
    }, 3000) // setInterval 에게 3초마다 한번씩 실행하라고 알려줌
}
```
- js 코드 한줄씩 분석 (js는 복잡해서 하나씩 설명 적음)
- 궁금한 점 : 애니메이션 부분에서 왜 forEach로 또 그 안에서 여러번 작동하게 하나?
    setInterval 는 시간을 반복, forEach는 슬라이드 3개를 반복
    3초마다 다음 슬라이드 번호 계산, 현재 슬라이드 사라짐, 다름 슬라이드 나타남, 슬라이드 3개 전부에 forEach 로 그 안에서 s1 transition 적용, s2 transition 적용, s3 transition 적용
    + opacity가 바뀌는 슬라이드가 매번 달라짐. 어떤 슬라이드가 바뀔지 모르니까 3개 전부에 transition을 줘서 어떤 슬라이드가 바뀌어도 부드럽게 전환되게함

#### javascript / 제이쿼리 비교
- js 에서는 css 대신 opacity로 처리함. 
``` javascript 
const slider = document.querySelectorAll('.slider')  // 슬라이드 3개 선택

slider.forEach(img => img.style.opacity = '0')  // 3개 전부 투명하게
slider[0].style.opacity = '1'                   // 첫번째만 보이게
```
- javascript 슬라이드 초기 설정

``` css
.sliderWrap > div { display: none; }
.sliderWrap > div:first-child { display: block; }
```
- 제이쿼리 슬라이드 초기 설정


``` javascript
// jQuery
$('.slider').eq(0)   // 첫번째 슬라이드

// JS
slider[0]            // 첫번째 슬라이드
```
- slider[currentIndex] 는 제이쿼리의 eq()랑 같은 역할
- querySelectorAll 로 가져온 결과가 배열 형태라서 [숫자]로 몇번째인지 바로 접근할 수 있음

``` javascript
slider.forEach(img => img.style.transition = 'all 1s')
```
- transition을 setInterval 안에 넣은 이유 : 처음부터 transition을 주면 첫번째 이미지가 나타날때도 애니메이션이 생겨버림. 그래서 setInterval 안에 넣어서 3초후에 슬라이드 전환이 시작될떄부터 애니메이션이 적용되게 한 것