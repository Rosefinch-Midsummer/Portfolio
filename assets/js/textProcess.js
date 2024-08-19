// 获取 DOM 元素
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const processBtn = document.getElementById('processBtn');
const copyBtn = document.getElementById('copyBtn');
const exportBtn = document.getElementById('exportBtn');
const clearBtn = document.getElementById('clearBtn');

// 统计文本信息
function updateStats(text) {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const characters = text.length;

    document.getElementById('stats').innerText = `行数: ${lines.length}, 单词数: ${words.length}, 字符数: ${characters}`;
}

// 开始处理文本
processBtn.addEventListener('click', () => {
    let text = inputText.value;

    // 去除空格、制表符和回车
    if (document.getElementById('removeSpaces').checked) {
        text = text.replace(/ +/g, '');
    }
    if (document.getElementById('removeTabs').checked) {
        text = text.replace(/\t/g, '');
    }
    if (document.getElementById('removeNewlines').checked) {
        text = text.replace(/\n/g, '');
    }

    // 去除重复行
    if (document.getElementById('removeDuplicates').checked) {
        const lines = text.split('\n');
        text = [...new Set(lines)].join('\n');
    }

    // 修剪行首行尾空白
    if (document.getElementById('trimWhitespace').checked) {
        text = text.split('\n').map(line => line.trim()).join('\n');
    }

    // 转换大小写
    if (document.getElementById('toUpperCase').checked) {
        text = text.toUpperCase();
    }
    if (document.getElementById('toLowerCase').checked) {
        text = text.toLowerCase();
    }

    // 替换文本
    const replaceFrom = document.getElementById('replaceFrom').value;
    const replaceTo = document.getElementById('replaceTo').value;
    if (replaceFrom) {
        const regex = new RegExp(replaceFrom, 'g');
        text = text.replace(regex, replaceTo);
    }

    // 将处理后的文本显示到输出框
    outputText.value = text;

    // 更新文本统计信息
    updateStats(text);
});

// 复制结果到剪贴板
copyBtn.addEventListener('click', () => {
    outputText.select();
    document.execCommand('copy');
    // alert('结果已复制到剪贴板！');
});

// 导出文本为 .txt 文件
exportBtn.addEventListener('click', () => {
    const blob = new Blob([outputText.value], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'processed_text.txt';
    link.click();
});

// 清除结果
clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
    document.getElementById('removeSpaces').checked = true;
    document.getElementById('removeTabs').checked = true;
    document.getElementById('removeNewlines').checked = true;
});