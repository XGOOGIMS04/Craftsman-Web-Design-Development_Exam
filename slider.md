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

---

### S-2 
가로로 움직임

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
- 슬라이드 html 코드

---

``` css
#slider {
    overflow: hidden; /* slider 영역 밖에 있는 이미지 2, 3 은 보이지 않게 처리 */
}
.sliderWrap {
    display: flex; /* 이미지 가로정렬 */
}
.sliderWrap  .slider {
    position: relative;
}
.sliderWrap  .slider  img {
    vertical-align: top; /* s-1 과는 다르게 가로 정렬이라서 여백이 생기지 않지만 일단 넣어줌 */
}
.sliderWrap  .slider  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
}
```
- css 전체 코드
- 이미지가 옆으로 이동하기 때문에 display: flex; 로 가로 정렬을 해준다
- overflow: hidden; 을 줌으로써, slider 영역 밖에 있는 이미지 2, 3 보이지 않게 처리한다(존재하는데 안보이게 처리)

---

``` javascript 
<script>
    $(function(){
        let currentIndex = 0; // 현재 이미지

        $('.sliderWrap').append($('.slider').first().clone(true)); // 첫번째 이미지를 복사, 마지막에 추가. 이렇게 하면 안끊긴다고 함

        setInterval(function(){ // 3초에 한번씩 실행
            currentIndex++; // 현재 이미지를 1씩 증가
            
            $('.sliderWrap').animate({marginLeft: -currentIndex * 100 + "%"}, 600)

            if(currentIndex == 3){ // 이미지가 마지막일때
                setTimeout(function(){
                    $('.sliderWrap').animate({marginLeft:0}, 0); // 애니메이션을 정지
                    currentIndex = 0; // 현재 이미지를 초기화
                }, 700);
            }
        }, 3000)
    })
</script>
```
- 제이쿼리 전체코드

---

``` javascript
<script>
    $(function(){
        let currentIndex = 0; // 현재 이미지

        // 첫번째 슬라이드를 선택해서, 복사한다음 맨 끝에 추가
        $('.sliderWrap').append($('.slider').first().clone(true));

        setInterval(function(){ // 3초에 한번씩 실행
            // 3초마다 현재 이미지를 1씩 증가시킴
            currentIndex++; 
            
            // .sliderWrap 을 왼쪽으로 민다.
            $('.sliderWrap').animate({marginLeft: -currentIndex * 100 + "%"}, 600)

            // currentIndex가 3이 되면(마지막 이미지일때) 실행됨
            if(currentIndex == 3){
                setTimeout(function(){ // 700ms 후에 한번만 실행되는 함수
                    // sliderWrap을 순간이동으로 처음 위치로 돌림(0초만에)
                    $('.sliderWrap').animate({marginLeft:0}, 0); // 애니메이션을 정지

                    // 번호도 초기화
                    currentIndex = 0;
                }, 700);
            }
        }, 3000)
    })
</script>
```
- 제이쿼리 한줄 설명
- s3 에서 s1로 반복할때 끊기는 느낌이 있어서, 맨 끝에 s1 복사복을 넣어서 자연스럽게 전환되도록 해줌
- 이미지1 -> 이미지2 -> 이미지3 -> 이미지1 로 되는 순간 다시 리셋해버릴꺼임
- 반복순서 : 1 -> 2 -> 3 -> 복사1 -> (몰래 1로 이동) -> 2 -> 3 ....
    복사 1에서 진짜 1로 순간이동 하는게 0초 라서 눈에 안보임
- 타임라인 : s1 → s2 → s3 → 복사1 (0.7초 동안 보임)
                  ↓
           사람 모르게 순간이동으로 진짜 s1으로 리셋
                  ↓
              s2 → s3 → 복사1 → 무한반복

---
``` javascript
<script>
    window.onload = function(){
        let currentIndex = 0; // 현재 이미지
        const sliderWrap = document.querySelector('.sliderWrap'); // 전체 이미지
        const slider = document.querySelectorAll('.slider'); // 각각의 이미지
        const sliderClone = sliderWrap.firstElementChild.cloneNode(true); // 첫번째 이미지 저장
        sliderWrap.appendChild(sliderClone); // 복사한 이미지를 마지막에 추가
        
        setInterval(() => {
            currentIndex++; //현재 이미지를 1씩 증가시켜줌

            sliderWrap.style.marginLeft = -currentIndex * 100 + "%"; // 이미지 이동
            sliderWrap.style.transition = "all 0.6s"; // 이미지 애니메이션 설정

            if(currentIndex == 3){
                setTimeout(() => {
                    sliderWrap.style.transition = '0s'; // 애니메이션 정지
                    sliderWrap.style.marginLeft = '0'; // 애니메이션 위치 초기화
                    currentIndex = 0; // 현재 이미지 초기화
                }, 700);
            }
        }, 3000);
    }
</script>
```
- js 전체코드

---

``` javascript
<script>
    window.onload = function(){
        let currentIndex = 0; // 현재 이미지

        // .sliderWrap 요소 1개를 선택하여, 선택한 요소를 sliderWrap 변수에 저장
        const sliderWrap = document.querySelector('.sliderWrap');

        // .slider 요소 3개를 전부 선택하고, 선택한 3개를 slider 변수에 저장(배열 형태로 저장)
        const slider = document.querySelectorAll('.slider');

        // sliderWrap 의 첫번째 자식요소(s1)를 선택하고 복사하여 sliderClone 변수에 저장함
        const sliderClone = sliderWrap.firstElementChild.cloneNode(true); 

        // 복사해준 s1을 sliderWrap 의 맨 끝에 추가
        sliderWrap.appendChild(sliderClone); 

        setInterval(() => { // 3초마다 안의 코드를 반복 실행
            // //현재 이미지를 1씩 증가시켜줌
            currentIndex++; 

            // sliderWrap 을 왼쪽으로 밀어서 다음 슬라이드가 보이게 함
            sliderWrap.style.marginLeft = -currentIndex * 100 + "%";

            // marginLeft가 바뀔때 0.6초 동안 부드럽게 이동하게 해줌
            sliderWrap.style.transition = "all 0.6s";

            if(currentIndex == 3){ // currentIndex가 3일때 아래 코드 실행

                setTimeout(() => { // 0.7초후 안의 코드를 한번만 실행함
                    // transition을 0으로 바꿔서 애니메이션을 끊어줌
                    sliderWrap.style.transition = '0s';

                    // sliderWrap 을 처음 위치로 순간이동 시킴.
                    sliderWrap.style.marginLeft = '0';

                    // 슬라이드 번호 0으로 초기화함
                    currentIndex = 0;
                }, 700);
            }
        }, 3000);
    }
</script>
```
- js 한줄 설명 코드
-  전체 흐름
    3초마다
    ├── currentIndex 1 증가
    ├── sliderWrap 왼쪽으로 이동 (0.6초 동안 부드럽게)
    └── currentIndex가 3이면 (복사1이 보일 때)
        └── 0.7초 후
            ├── transition 끔 (순간이동 준비)
            ├── sliderWrap 처음으로 순간이동 (눈에 안보임)
            └── currentIndex = 0 으로 초기화


### S-3
위에서 아래로 움직임

``` html
<article id="slider">
    <div class="sliderWrap">
        <div class="slide s1">
            <img src="./이미지/slider01.jpg" alt="이미지 설명1">
            <span>이미지1</span>
        </div>
        <div class="slide s2">
            <img src="./이미지/slider02.jpg" alt="이미지 설명2">
            <span>이미지2</span>
        </div>
        <div class="slide s3">
            <img src="./이미지/slider03.jpg" alt="이미지 설명3">
            <span>이미지3</span>
        </div>
    </div>
</article>
```
- S-3 html 전체 코드

---

``` css
#slider {
    overflow: hidden;
}
.sliderWrap .slider {
    position: relative;
}
.sliderWrap .slider img {
    vertical-align: top;
}
.sliderWrap .slider span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
}
```
- S-3 css 전체 코드

---

``` javascript 
<script>
    $(function(){
        let currentIndex = 0;
        $('.sliderWrap').append($('.slider').first().clone(true)); // 첫번째 이미지를 복사해서 마지막에 추가

        setInterval(function(){ // 3초에 한번씩 실행
            currentIndex++; // 현재 이미지를 1씩 증가

            $('.sliderWrap').animate({marginTop: -currentIndex * 300 + "px"}, 600); // 이미지 애니메이션

            if(currentIndex == 3){ // 마지막 이미지일때
                setTimeout(function(){
                    $('.sliderWrap').animate({marginTop: 0}, 0); // 애니메이션 초기화
                    currentIndex = 0; // 현재 이미지를 초기화
                }, 700)
            }
        }, 3000)
    })
</script>
```
- 제이쿼리 전체 코드
- S-2 와 다른점 >> 
    - S-2 (좌우 슬라이드)
    - marginLeft: -currentIndex * 100 + "%"
    - → 이미지 너비가 100%니까 100%씩 이동

    - S-3 (위아래 슬라이드)
    - marginTop: -currentIndex * 300 + "px"
    - → 이미지 높이가 300px이니까 300px씩 이동

---

``` javascript
<script>
    window.onload = function(){
        let currentIndex = 0; // 현재 이미지 설정
        const sliderWrap = document.querySelector('.sliderWrap'); // 전체 이미지
        const slider = document.querySelectorAll('.slider'); // 각각의 이미지
        const sliderClone = sliderWrap.firstElementChild.cloneNode(true); // 첫번째 이미지를 저장

        sliderWrap.appendChild(sliderClone);

        setInterval(() => {
            currentIndex++; 

            sliderWrap.style.marginTop = -currentIndex * 300 + "px";
            sliderWrap.style.transition = "all 0.6s";

            if (currentIndex == slider.length){ // 3 대신 length 를 넣어줌으로써 이미지가 몇개든 상관없이 코드 재사용성 가능
                setTimeout(() => {
                    sliderWrap.style.transition = "0s";
                    sliderWrap.style.marginTop = "0";
                    currentIndex = 0;
                }, 700);
            }
        }, 3000);
    }
</script>
```
- js 전체 코드(S-2랑 거의 비슷함. 다른점은 왼쪽으로 이동이냐 위쪽으로 이동이냐)
- currentIndex == slider.length 로써 이미지가 몇개인지에 따라 상관없이 코드 재사용 가능


### S-4
제자리 반응형
- 이미지 태그가 없음. 백그라운드로 넣어주기 때문에
``` html
<article id="slider">
    <div class="sliderWrap">
        <div class="slider s1">
            <span>이미지1</span>
        </div>
        <div class="slider s2">
            <span>이미지2</span>
        </div>
        <div class="slider s3">
            <span>이미지3</span>
        </div>
    </div>
</article>
```
- S-4 html 전체 코드

---

```css 
.sliderWrap {
    position: relative;
    height: 100%; /* 배경이미지로써 크기가 자동으로 안잡히기 때문에 높이 적어줌, 너비는 자동 */
}
.sliderWrap > div {
    display: none;
}
.sliderWrap > div:first-child {
    display: block;
}
.sliderWrap .slider {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%; /* 배경이미지로써 크기가 자동으로 안잡히기 때문에 너비 높이 적어줌 */
    height: 100%; /* 배경이미지로써 크기가 자동으로 안잡히기 때문에 너비 높이 적어줌 */
    background-repeat: no-repeat; 
    background-position: center; 
    background-size: cover; 
}
.sliderWrap .slider.s1 {
    background-image: url(./이미지/slider04.jpg);
}
.sliderWrap .slider.s2 {
    background-image: url(./이미지/slider05.jpg);
}
.sliderWrap .slider.s3 {
    background-image: url(./이미지/slider06.jpg);
}
.sliderWrap .slider span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.4);
}
```
- css 전체 코드
- position: absolute를 주면 너비, 높이가 자동으로 안되서 적어줘야함
    - .sliderWrap 은 position:relative 라서 블록 요소 기본 동작이 살아있음. 블록 요소는 너비를 안줘도 부모 너비를 자동으로 꽉 채움. 그러나 S-5 같은 경우 부모가 flex이기 때문에 너비가 자동으로 안잡혀서 너비를 직접 줘야함
    - 블록요소 일 경우
        - position: relative  → 너비 자동 , 높이 직접 줘야 함
        - 부모가 flex + position: relative → 너비 직접 줘야 함, 높이 직접 줘야 함
        - position: absolute → 너비 높이 둘 다 직접 줘야 함
- 앞의 유형들은 img 태그를 사용함. 그래서 이미지 자체 크기가 있어서, 박스 크기가 자동으로 잡혔음. 이번엔 img 가 아닌 배경 이미지로 처리함으로써, .slider 안에 span 밖에 없으므로 크기가 자동으로 안잡혀서 width, height를 직접 줘야함
- img 태그는 이미지 자체가 콘텐츠라서 브라우저가 이미지 크기를 읽어서 박스 크기를 자동으로 잡아줌. but 배경 이미지는 꾸미기용 스타일이라서 브라우저가 크기 계산을 안함 => 배경 이미지를 쓸때는 항상 너비와 높이를 적어줘야함 

background-repeat: no-repeat 
- 배경 이미지는 기본적으로 타일처럼 반복됨. 그래서 1번만 나오게 함

background-position: center
- 배경이미지가 영역보다 작거나 클떄 어느 위치에 놓을지 정함. center는 정중앙

background-size: cover
- 배경이미지가 영역을 빈틈없이 꽉 채우게 함. 이미지 비율은 유지하면서 영역을 전부 덮어써버림. 반응영에서 화면 크기가 바뀌어도 이미지가 항상 꽉 차보이게 하려할떄 사용

이 세개를 같이 사용하면, 어떤 화면 크기에서도 이미지가 자연스럽게 보임
- no-repeat  → 이미지 반복 방지
- center     → 항상 정중앙에 위치
- cover      → 크기 상관없이 꽉 채움

---

``` javascript
<script>
    $(function(){
        let currentIndex = 0;

        setInterval(() => {
            let nextIndex = (currentIndex + 1) % 3;

            $('.slider').eq(currentIndex).fadeOut(1200);
            $('.slider').eq(nextIndex).fadeIn(1200);

            currentIndex = nextIndex;
        }, 3000);
    })
</script>
```
- S-4 제이쿼리 전체 코드
- 궁금한 점 : S-2, S-3 유형은 마지막 이미지 뒤에 복사본을 추가함으로써 자연스럽게 전환되도록 했는데, S-1, S-4 유형은 왜 복사본을 사용하지 않는가?
    - S-1, S-4 유형은 제자리에서 전환, S-2, S-3 유형은 슬라이드가 옆으로 또는 위아래로 이동함. 이동방향이 있으므로 끝에서 처음으로 돌아올때 자연스럽게 전환이 필요했음

---

``` javascript
<script>
    window.onload = function(){
        let currentIndex = 0;
        const slider = document.querySelectorAll('.slider');

        // css 에서 주석처리한 부분을 js 로 처리
        slider.forEach(el => el.style.opacity = '0');
        slider[0].style.opacity = '1';

        setInterval(() => {
            let nextIndex = (currentIndex + 1) % slider.length;

            slider[currentIndex].style.opacity = '0';
            slider[nextIndex].style.opacity = '1';
            slider.forEach(el => el.style.transition = 'all 1s'); // 1초동안 전환

            currentIndex = nextIndex;
        }, 3000)
    }
</script>
```
- S-4 js 전체코드

---

### S-5
반응형 좌우 슬라이드
``` html
<article id="slider">
    <div class="sliderWrap">
        <div class="slider s1">
            <span>이미지1</span>
        </div>
        <div class="slider s2">
            <span>이미지2</span>
        </div>
        <div class="slider s3">
            <span>이미지3</span>
        </div>
    </div>
</article>
```
- S-5 html 전체 코드

---

``` css
#slider {
    overflow: hidden;
}
.sliderWrap {
    width: 400%; /* 가로 정렬 이기때문에 너비는 400%됨 */
    height: 100%; 
    display: flex; /* 가로정렬 */
}
.sliderWrap .slider {
    position: relative;
    width: 100%; 
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.sliderWrap .slider.s1 {
    background-image: url(./이미지/slider04.jpg);
}
.sliderWrap .slider.s2 {
    background-image: url(./이미지/slider05.jpg);
}
.sliderWrap .slider.s3 {
    background-image: url(./이미지/slider06.jpg);
}
.sliderWrap .slider span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;  
    background-color: rgba(255, 255, 255, 0.4);
}
```
- css 전체 코드
width: 400%, height: 100%
- 슬라이드가 가로로 세개 + 복사본 1개라서 sliderWrap의 4배 너비를 가져야함, height는 부모인 #slider 높이를 물려받기 위해 줌

- 부모가 일반 블록 요소 -> 너비 자동으로 채워짐
- but 부모가 display: flex 면 너비가 자동으로 안잡혀서 넣어줌
- (+) 블록요소 일 경우
        - position: relative  → 너비 자동 ✅, 높이 직접 줘야 함
        - 부모가 flex + position: relative → 너비 직접 줘야 함, 높이 직접 줘야 함
        - position: absolute → 너비 높이 둘 다 직접 줘야 함

.slider에 너비도 같이 준 이유?
- position: relative라도 display: flex의 자식이 되면 너비가 자동으로 안잡힘. 그래서 width: 100%를 줘야 3개가 균등하게 나뉨

span에 width, height 를 안 준 이유?
- span 은 absolute이지만, 안에 텍스트가 있기 때문에 크기가 자동으로 잡힘. img 처럼 콘텐츠가 크기를 결정해줌

---

``` javascript 
<script>
    $(function(){
        let currentIndex = 0; // 현재 이미지

        $('.sliderWrap').append($('.slider').first().clone(true)); // 첫번째 이미지를 복사해서 마지막에 추가

        setInterval(function(){
            currentIndex++;

            $('.sliderWrap').animate({marginLeft: -currentIndex * 100 + "%"}, 600);

            if(currentIndex == 3){
                setTimeout(function(){
                    $('.sliderWrap').animate({marginLeft: 0}, 0); // 애니메이션 정지

                    currentIndex = 0; // 현재 이미지 초기화
                }, 700);
            }
        }, 3000)
    })
</script>
```
- S-5 제이쿼리 전체코드

``` javascript 
<script>
    window.onload = function(){
        let currentIndex = 0;
        const sliderWrap = document.querySelector('.sliderWrap');
        const slider = document.querySelectorAll('.slider');
        const sliderClone = sliderWrap.firstElementChild.cloneNode(true);

        sliderWrap.appendChild(sliderClone);

        setInterval(() => {
            currentIndex++;

            sliderWrap.style.marginLeft = -currentIndex * 100 + "%";
            sliderWrap.style.transition = "all 600ms";

            if(currentIndex == slider.length){
                setTimeout(() => {
                    sliderWrap.style.transition = "0s";
                    sliderWrap.style.marginLeft = "0";
                    currentIndex = 0;
                }, 700);
            }
        }, 3000);
    }
</script>
```
- S-5 js 전체코드