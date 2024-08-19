document.addEventListener('DOMContentLoaded', () => {
    const inputTextArea = document.getElementById('input');
    const outputTextArea = document.getElementById('output');

    // 处理文本的函数
    function processText(addHeading, addAsterisks) {
        const text = inputTextArea.value.split('\n').map(line => {
            if (line.trim() === '') return ''; // 跳过空行
            let formattedLine = line;
            if (addHeading) {
                formattedLine = `${addHeading} ${formattedLine}`; // 添加 ## 或 ###
            }
            if (addAsterisks) {
                formattedLine = `**${formattedLine}**`; // 在每行前后添加 **
            }
            return formattedLine;
        }).join('\n');
        outputTextArea.value = text; // 更新输出文本框
    }

    // 添加 ## 按钮事件
    document.getElementById('add-heading1-btn').addEventListener('click', () => {
        processText('##', false);
    });

    // 添加 ### 按钮事件
    document.getElementById('add-heading2-btn').addEventListener('click', () => {
        processText('###', false);
    });

    // 添加 ** 按钮事件
    document.getElementById('add-asterisks-btn').addEventListener('click', () => {
        processText(false, true);
    });

    // 复制全文按钮事件
    document.getElementById('copy-btn').addEventListener('click', () => {
        outputTextArea.select();
        document.execCommand('copy');
        // alert('文本已复制！');
    });

    // 删除文本按钮事件
    document.getElementById('clear-btn').addEventListener('click', () => {
        inputTextArea.value = '';
        outputTextArea.value = '';
    });

    // 导出为Markdown按钮事件
    document.getElementById('export-btn').addEventListener('click', () => {
        const text = outputTextArea.value;
        const blob = new Blob([text], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.md'; // 默认文件名
        a.click();
        URL.revokeObjectURL(url); // 释放 URL 对象
    });

    // 上传文件按钮事件
    document.getElementById('upload-btn').addEventListener('click', () => {
        const fileInput = document.getElementById('file-input');
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                inputTextArea.value = e.target.result; // 显示文件内容
            };
            reader.readAsText(file); // 读取文件
        } else {
            alert('请先选择一个文件！'); // 提示用户选择文件
        }
    });
});