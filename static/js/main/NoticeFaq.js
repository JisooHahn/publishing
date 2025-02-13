// 누르면 페이지 상단으로 가는 버튼
const gotoTopButton = document.querySelector(".goToTopButtonContainer");

gotoTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// 근데 이 버튼이 페이지 하단으로 가야만 노출됨

// 스크롤 감지
window.addEventListener("scroll", () => {
    // 페이지 하단에 도달했는지 확인
    if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight
    ) {
        gotoTopButton.classList.add("show"); // 애니메이션으로 보이기
    } else {
        gotoTopButton.classList.remove("show"); // 애니메이션으로 숨기기
    }
});

// 검색 모달창....
const searchModalLayout = document.querySelector(".searchModalLayout");
const searchModalWindow = document.querySelector(".searchModalWindow");
const searchModalButton = document.querySelector(".searchButton");

// 검색창 밖을 클릭하면 모달창 꺼짐
document.addEventListener("click", function (event) {
    // 모달 내부를 클릭하지 않은 경우에만 모달을 숨김
    if (
        !searchModalWindow.contains(event.target) &&
        // 자꾸 버튼 눌러도 모달창이 안 켜져서 얘도 조건에 넣어버림
        !searchModalButton.contains(event.target)
    ) {
        searchModalLayout.style.display = "none"; // 모달 숨기기
    }
});

// 검색 버튼을 누르면 모달창 켜짐
searchModalButton.addEventListener("click", () => {
    searchModalLayout.style.display = "flex"; // 모달 열기
});

// 뭔가 입력하면 숨겨져있던 결과창이 뜸

const searchResult = document.querySelector("#hiddenContents");
const searchInput = document.querySelector(".searchInput");

searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() !== "") {
        console.log("인앤아웃");
        searchResult.style.display = "flex"; // 섹션 보이기
    } else {
        searchResult.style.display = "none";
    }
});

// 메뉴버튼 누르면 숨겨져있던 공유창이 뜸
const shareWindow = document.querySelector(".menuShareWindow");
const shareButton = document.querySelector(".styleMenu");

shareWindow.style.display = "none";

shareButton.addEventListener("click", () => {
    shareWindow.style.display = "block";
});

// 공유창 바깥 누르면
document.addEventListener("click", function (event) {
    if (
        !shareWindow.contains(event.target) &&
        !shareButton.contains(event.target)
    ) {
        shareWindow.style.display = "none";
    }
});

// 복사버튼 눌렀을때 복사되고 alert...

// 버튼 누르면 페이지 밑 자주 묻는 질문으로
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight, // 페이지의 맨 끝으로 이동
    });
}
