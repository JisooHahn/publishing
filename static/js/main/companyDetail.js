// 로그인 후 회원버튼에 마우스를 갖다대면 전용 메뉴가 뜸
const memberButton = document.querySelector(".loginedMemberButton>button"); // 홍길동님
const memberNav = document.querySelector(".loginMemberNav"); // 메뉴

const showDiv = () => (memberNav.style.display = "block"); // div가 보이게
const hideDiv = () => (memberNav.style.display = "none"); // div가 숨겨지게

// 마우스가 나가면 창이 꺼지게
// div에서 커서가 nav까지 가기 전에 창이 꺼져버리기 때문에 약간 꺼지는 시간에 딜레이를 주었다
const checkMouseLeave = () => {
    setTimeout(() => {
        // 버튼과 메뉴 둘 다 마우스를 떼면 숨기기
        if (!memberButton.matches(":hover") && !memberNav.matches(":hover")) {
            hideDiv();
        }
    }, 100);
};

// 마우스를 올렸을 때
memberButton.addEventListener("mouseenter", showDiv);
memberNav.addEventListener("mouseenter", showDiv);

// 마우스를 뗐을 때
memberButton.addEventListener("mouseleave", checkMouseLeave);
memberNav.addEventListener("mouseleave", checkMouseLeave);

// 검색창 눌렀을 때만 뜨는 창
const searchBox = document.querySelector(".searchBox>input");
const searchWindow = document.querySelector(".searchWindow");

searchBox.addEventListener("focus", () => {
    searchWindow.style.visibility = "visible";
    searchWindow.style.pointerEvents = "auto";
});

searchBox.addEventListener("blur", () => {
    searchWindow.style.visibility = "hidden";
    searchWindow.style.pointerEvents = "none";
});

// 복사 버튼 만들기, 복사 한 다음 텍스트 alert
// 복사할 버튼을 선택
const copyButton = document.querySelector("#copyUrl"); // 복사 버튼

const copyCurrentUrl = async () => {
    try {
        // clipboard에 지정한 텍스트(여기선 페이지의 url)추가
        await navigator.clipboard.writeText(window.location.href); // window.location.href는 현재 페이지의 url
        alert("URL이 복사되었습니다. 많이 공유해주세요:)"); // 알림 메시지
    } catch (err) {
        console.error("URL 복사 실패:", err);
    }
};

// 버튼 누르면 회사 주소 복사
copyButton.addEventListener("click", copyCurrentUrl);

// 복사 버튼 만들기, 복사 한 다음 텍스트 alert
// 복사할 텍스트 요소와 버튼을 선택
const copyText = document.querySelector("#copyText");
const copyAddressBtn = document.querySelector(".address>button");

// Clipboard API로 특정 텍스트를 복사시킬 수 있다. 신기
copyAddressBtn.addEventListener("click", () => {
    // #copyText 요소의 텍스트를 클립보드에 복사
    navigator.clipboard
        .writeText(copyText.textContent) // 텍스트를 클립보드에 복사
        .then(() => {
            // 복사 성공 시 텍스트 출력
            alert("주소가 복사되었습니다");
        })
        .catch((err) => {
            // 복사 실패 시 오류 메시지 출력
            console.error("Failed to copy text: ", err);
        });
});

// 기업/서비스 소개 더보기 버튼 누르면 정보 전체출력
const moreInfoBtn = document.querySelector(".companyDetailButton");
const moreInfoText = document.querySelector(".companyDetailText");
const textGradient = document.querySelector(".compnayDetailHide");
const expandIcon = moreInfoBtn.querySelector(".expandIcon"); // 펼치기 아이콘
const collapseIcon = moreInfoBtn.querySelector(".collapseIcon"); // 접기 아이콘
const buttonText = moreInfoBtn.querySelector(".buttonText"); // 버튼 내 텍스트 span

// 버튼 클릭 시 이벤트
collapseIcon.style.display = "none";
expandIcon.style.display = "inline-block";

moreInfoBtn.addEventListener("click", () => {
    const isExpanded = moreInfoBtn.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
        // 이미 열려있으면 닫기
        moreInfoText.style.maxHeight = "168px";
        moreInfoText.style.overflow = "hidden";
        textGradient.classList.add("gradient");
        moreInfoBtn.setAttribute("aria-expanded", "false");

        // 버튼 텍스트 변경 (SVG는 유지됨)
        buttonText.textContent = "더 보기";

        // SVG 변경
        expandIcon.style.display = "inline-block";
        collapseIcon.style.display = "none";
    } else {
        // 닫혀있으면 열기
        moreInfoText.style.maxHeight = "none";
        moreInfoText.style.overflow = "visible";
        textGradient.classList.remove("gradient");
        moreInfoBtn.setAttribute("aria-expanded", "true");

        // 버튼 텍스트 변경 (SVG는 유지됨)
        buttonText.textContent = "접기";

        // SVG 변경
        expandIcon.style.display = "none";
        collapseIcon.style.display = "inline-block";
    }
});

// 모달창 이미지 변경...
// 일일히 innerhtml이나 이미지를 다 집어넣고 display를 바꾸는 것보단 배열에 이미지들을 넣어
// 링크만 바꾸는게 더 편해보임
const modalImages = [
    "https://cdn.jumpit.co.kr/lg/images/syyun_26773/20232607112656155_1080_790.webp",
    "https://cdn.jumpit.co.kr/lg/images/syyun_26773/20232607112658487_1080_790.webp",
    "https://cdn.jumpit.co.kr/lg/images/syyun_26773/20232607112653349_1080_790.webp",
    "https://cdn.jumpit.co.kr/lg/images/syyun_26773/20232707112703284_1080_790.webp",
]; // 이미지 목록

let currentIndex = 0; // 현재 이미지 인덱스

const imgElement = document.querySelector(".moduleSlide img"); // 이미지 태그
const prevButton = document.querySelector(".moduleLeftButton"); // 왼쪽 버튼
const nextButton = document.querySelector(".moduleRightButton"); // 오른쪽 버튼
const moduleSlide = document.querySelector(".moduleSlide"); // 슬라이드 컨테이너

// 이미지 변경 함수
const updateImage = () => {
    imgElement.src = modalImages[currentIndex];
};

// 왼쪽 버튼 클릭 시
prevButton.addEventListener("click", () => {
    // currentIndex - 1: 현재 인덱스
    // modalImages.length: 배열 안에 있는 이미지들의 개수
    // + modalImages.length 는 인덱스가 음수가 되는걸 방지하기 위해
    // % modalImage.length 는 인덱스가 배열의 크기를 넘어가지 않게 하려고,,
    currentIndex = (currentIndex - 1 + modalImages.length) % modalImages.length;
    updateImage(); // 이미지를 변경
});

// 오른쪽 버튼 클릭 시
nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % modalImages.length;
    updateImage();
});

// 초기 이미지 설정
updateImage();

// 홈페이지에서 누른 이미지에 따라 모달창에서 조회 가능하게
// 아으 이미지 이벤트 진짜 많네

const companyImages = document.querySelectorAll(".companyImages img"); // 회사 이미지 리스트
const modal = document.querySelector(".moreImageModal"); // 모달창
const modalImgElement = document.querySelector(".moduleSlide img"); // 모달 내 이미지
const modalCloseButton = document.querySelector(".modalCloseButton"); // 닫기 버튼
const imagesLastStyle = document.querySelector(".moreContentPc"); // 마지막 이미지를 덮는 스타일

// 마지막 이미지로 설정하는 함수
const showThirdImage = () => {
    currentIndex = modalImages.length - 2; // 3번째 이미지 인덱스(마지막 이미지는 가려져 안 보임)
    updateImage(); // 이미지 변경
    modal.style.display = "flex"; // 모달창 띄우기
};

// 마지막 이미지 클릭 이벤트 추가
imagesLastStyle.addEventListener("click", showThirdImage);

// 이미지 클릭 이벤트 추가
companyImages.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index; // 클릭한 이미지의 인덱스 저장
        updateImage(); // 모달창 이미지 변경
        modal.style.display = "flex"; // 모달창 보이게
    });
});

// 모달창 닫기
modalCloseButton.addEventListener("click", () => {
    modal.style.display = "none"; // 모달창 숨기기
});

// 초기 이미지 설정 함수
const updateModalImage = () => {
    modalImgElement.src = modalImages[currentIndex];
};

// 사원 수 그래프
document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("companyGraph").getContext("2d");

    new Chart(ctx, {
        type: "bar", // 기본은 막대 그래프
        data: {
            labels: ["24.07", "24.08", "24.09", "24.10", "24.11"], // x축 라벨
            datasets: [
                {
                    label: "직원 수",
                    data: [216, 218, 217, 215, 226],
                    type: "line", // 선 그래프
                    borderColor: "#2e37ff",
                    backgroundColor: "#2e37ff",
                    fill: false,
                    tension: 0.1,
                    pointRadius: 5, // 점 크기
                    pointStyle: "circle", // 점 스타일을 circle로 변경
                },
                {
                    label: "입사자 수",
                    data: [12, 7, 0, 6, 14],
                    backgroundColor: "#00dd6d",
                },
                {
                    label: "퇴사자 수",
                    data: [5, 1, 8, 3, 8],
                    backgroundColor: "#c4c4c4",
                },
            ],
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false, // x축의 세로선 숨기기
                    },
                },
            },
            plugins: {
                legend: {
                    display: false, // 기본 범례 숨기기
                },
                tooltip: {
                    enabled: true, // 툴팁 활성화
                    mode: "index", // 여러 데이터셋에 대해 툴팁을 동시에 표시
                    intersect: false, // 데이터를 정확히 일치시키지 않아도 툴팁 표시
                    backgroundColor: "rgba(255, 255, 255, 0.9)", // 배경색 하얗게 설정
                    borderColor: "#000", // 테두리 색을 검정색으로 설정
                    borderWidth: 1, // 테두리 두께 설정
                    titleColor: "#000", // 제목 텍스트 색상 설정
                    bodyColor: "#000", // 본문 텍스트 색상 설정
                    callbacks: {
                        title: function (tooltipItem) {
                            return tooltipItem[0].label; // x축 레이블(날짜)만 표시
                        },
                        label: function (tooltipItem) {
                            let datasetLabel = tooltipItem.dataset.label || "";
                            let value = tooltipItem.raw;
                            return datasetLabel + ": " + value; // 데이터셋 이름과 값 표시
                        },
                    },
                },
            },
        },
    });
});
