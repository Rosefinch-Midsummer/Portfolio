const themeToggleButton = document.getElementById("theme-toggle");
const eyeCareToggleButton = document.getElementById("eye-care-toggle");

const siderbar = document.querySelector(".sidebar");
const toggleBtn = document.querySelector(".toggle-btn");

toggleBtn.addEventListener("click", () => {
  siderbar.classList.toggle("active");
});

let isDarkMode = false;
let isEyeCareMode = false;

themeToggleButton.addEventListener("click", function () {
    if (isDarkMode) {
        document.body.classList.remove("dark-mode");
        themeToggleButton.textContent = "切换为黑暗模式";
        isDarkMode = false;
    } else {
        document.body.classList.add("dark-mode");
        themeToggleButton.textContent = "切换为明亮模式";
        isDarkMode = true;
        isEyeCareMode = false; // 确保护眼模式被移除
        document.body.classList.remove("eye-care-mode");
    }
});

eyeCareToggleButton.addEventListener("click", function () {
    if (isEyeCareMode) {
        document.body.classList.remove("eye-care-mode");
        isEyeCareMode = false;
    } else {
        document.body.classList.add("eye-care-mode");
        isEyeCareMode = true;
        isDarkMode = false; // 确保暗黑模式被移除
        document.body.classList.remove("dark-mode");
        themeToggleButton.textContent = "切换为黑暗模式"; // 更新按钮文本
    }
});

document.getElementById("scroll-top").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 侧边栏伸缩功能
// document.getElementById("toggle-sidebar").addEventListener("click", function () {
//     const sidebar = document.getElementById("sidebar");
//     sidebar.classList.toggle("collapsed");
// });

function updateDateTime() {  
    const now = new Date();  
    const year = now.getFullYear() + 552; // 年份加552  
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份  
    const date = String(now.getDate()).padStart(2, '0'); // 日期  
    const hours = String(now.getHours()).padStart(2, '0'); // 小时  
    const minutes = String(now.getMinutes()).padStart(2, '0'); // 分钟  
    const seconds = String(now.getSeconds()).padStart(2, '0'); // 秒  

    document.getElementById("current-time").textContent = `${hours}:${minutes}:${seconds}`;  
    document.getElementById("current-date").textContent = `${year}-${month}-${date}`;  
}  

// 每秒更新一次时间  
setInterval(updateDateTime, 1000);  
updateDateTime(); // 初始调用

// const line = document.querySelector('.line');

// line.addEventListener('animationend', function() {
//     line.style.animation = 'shrink 0s';
//     line.offsetHeight; // 强制重新渲染，使动画立即生效
//     line.style.animation = 'grow 4s 1s normal both, blink 0.5s infinite normal';
// });

