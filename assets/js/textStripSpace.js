// 获取 DOM 元素
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const processBtn = document.getElementById('processBtn');
const copyBtn = document.getElementById('copyBtn');
const exportBtn = document.getElementById('exportBtn');
const clearBtn = document.getElementById('clearBtn');

// 开始处理文本
processBtn.addEventListener('click', () => {
    let text = inputText.value;

    // 根据用户选择去除相应的字符
    if (document.getElementById('removeSpaces').checked) {
        text = text.replace(/ +/g, ''); // 去除空格
    }
    if (document.getElementById('removeTabs').checked) {
        text = text.replace(/\t/g, ''); // 去除制表符
    }
    if (document.getElementById('removeNewlines').checked) {
        text = text.replace(/\n/g, ''); // 去除回车
    }

    // 将处理后的文本显示到输出框
    outputText.value = text;
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