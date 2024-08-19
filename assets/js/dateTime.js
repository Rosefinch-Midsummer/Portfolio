// dateTime.js
function createDateTimeElement() {
    // 检查元素是否已存在
    if (!document.getElementById('date-time')) {
        const dateTimeDiv = document.createElement('div');
        dateTimeDiv.id = 'date-time';
        dateTimeDiv.className = 'date-time';
        dateTimeDiv.innerHTML = `
            <span id="current-time" class="large-time">00:00</span>
            <span id="current-date" class="small-time">2023-01-01</span>
        `;
        document.body.appendChild(dateTimeDiv);
    }
}

function updateDateTime() {
    const now = new Date();
    const year = now.getFullYear() + 552;
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // 确保元素存在再更新内容
    const timeElement = document.getElementById("current-time");
    const dateElement = document.getElementById("current-date");

    if (timeElement && dateElement) {
        timeElement.textContent = `${hours}:${minutes}`;
        dateElement.textContent = `${year}-${month}-${date}`;
    }
}

function initDateTime() {
    createDateTimeElement();
    updateDateTime(); // 首次更新
    setInterval(updateDateTime, 1000); // 每秒更新
}

export { initDateTime };