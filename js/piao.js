 var a_idx = 0;
      $(document).ready(function ($) {
        $("body").click(function (e) {
            var red = parseInt(Math.random()*257).toString(16);
        var blue = parseInt(Math.random()*257).toString(16);
        var green= parseInt(Math.random()*257).toString(16);
        var color = '#'+red+blue+green;
          var a = new Array("❤ 富强 ❤", "❤ 民主 ❤", "❤ 文明 ❤", " ❤ 和谐 ❤", "❤ 自由 ❤", " ❤ 平等 ❤", "❤ 公正 ❤", "❤ 法治 ❤", "❤ 爱国 ❤", "❤ 敬业 ❤", "❤ 诚信 ❤", "❤ 友善 ❤");
          var $i = $("<span/>").text(a[a_idx]);
          a_idx = (a_idx + 1) % a.length;
          var x = e.pageX,
            y = e.pageY;
          $i.css({
            "z-index": 999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": color,
            "font-size": "20px"
          });
          $("body").append($i);
          $i.animate({
            "top": y - 180,
            "opacity": 0
          }, 1500, function () {
            $i.remove();
          });
        });
      });

//播放音效
var mp3 = "/Music/jingli.mp3";
var mp3 = new Audio(mp3);
var sub = document.getElementsByClassName('tupian')[0];
sub.onmouseover = function(){
      mp3.play(); //播放 mp3这个音频对象
//暂停
 // mp3.pause();
            // mp3.load();
}
sub.onmouseout = function(){
      //暂停
       mp3.pause();
       mp3.load();
}

// 收藏博客
function addBookmark(){
  var url=window.document.location.href;
  try{
   window.external.addFavorite(url,"小鹏博客");
  }catch(e){
   try{
    window.sidebar.addPanel(url,"小鹏博客");
   }catch(e){
    alert("加入收藏失败，有劳您使用Ctrl+D来添加");
   }
  }
 }