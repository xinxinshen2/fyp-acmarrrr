(function () {
    // 1️⃣ 禁用右键
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        // alert("右键已禁用！");
    });

    // 2️⃣ 禁用常见的快捷键
    document.addEventListener("keydown", function (event) {
    if (
        event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "i") || // Ctrl + Shift + I
        (event.ctrlKey && ["u", "s", "i", "j", "c", "k"].includes(event.key.toLowerCase()))
    ) {
        event.preventDefault();
    }
});


    // 3️⃣ 定期检测 debugger
    setInterval(function () {
        let before = new Date().getTime();
        debugger;
        let after = new Date().getTime();
        if (after - before > 100) {
            alert("检测到开发者工具，页面即将刷新！");
            location.reload(); // 立即刷新页面
        }
    }, 500);

    // 4️⃣ 监听 console.log()，防止调试
    if (window.console && window.console.log) {
        const oldLog = console.log;
        console.log = function () {
            if (new Error().stack.includes("toString")) {
                alert("检测到开发者工具，页面即将刷新！");
                location.reload(); // 立即刷新页面
            }
            oldLog.apply(console, arguments);
        };
    }

    // 5️⃣ **实时检测 DevTools 是否打开，并刷新网页**
    function detectDevTools() {
        const threshold = 160; // 设定窗口大小检测阈值
        if (
            window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold
        ) {
            // alert("检测到开发者工具，页面即将刷新!!!");
            location.reload(); // 立即刷新页面
        }
    }

    // 每100毫秒检测一次
    setInterval(detectDevTools, 100);
})();
