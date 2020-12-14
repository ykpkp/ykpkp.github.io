var ConsoleManager = {
    onOpen() {
        alert("已进入开发者模式~")
    },
    // onClose() {
    //     alert("已退出开发者模式~")
    // },
    init() {
        var self = this;
        var x = document.createElement('div');
        var isOpening = false,
            isOpened = false;
        Object.defineProperty(x, 'id', {
            get() {
                if (!isOpening) {
                    self.onOpen();
                    isOpening = true;
                }
                isOpened = true;
            }
        });
        setInterval(function() {
            isOpened = false;
            console.info(x);
            console.clear();
            if (!isOpened && isOpening) {
                self.onClose();
                isOpening = false;
            }
        }, 200)
    }
}
// ConsoleManager.onOpen = function() {
//     // alert("老哥，帶你去個好地方！")
//     // window.location = "https://www.bilibili.com/bangumi/play/ss2514/?from=search&seid=1858373854696867347";
// }

ConsoleManager.init();