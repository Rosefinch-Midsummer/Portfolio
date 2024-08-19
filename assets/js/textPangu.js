document.addEventListener('DOMContentLoaded', () => {
    const inputTextArea = document.getElementById('input');
    const outputTextArea = document.getElementById('output');

    document.getElementById('process-btn').addEventListener('click', () => {
        const text = inputTextArea.value;
        const spacedText = pangu.spacing(text);
        outputTextArea.value = spacedText;
    });

    document.getElementById('copy-btn').addEventListener('click', () => {
        outputTextArea.select();
        document.execCommand('copy');
        // alert('文本已复制！');
    });

    document.getElementById('clear-btn').addEventListener('click', () => {
        inputTextArea.value = '';
        outputTextArea.value = '';
    });

    document.getElementById('export-btn').addEventListener('click', () => {
        const text = outputTextArea.value;
        const blob = new Blob([text], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.md';
        a.click();
        URL.revokeObjectURL(url);
    });
});