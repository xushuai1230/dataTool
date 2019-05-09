  export function MP(ak) {
        return new Promise(function (resolve, reject) {
             window.init = function () {
            resolve(BMap)
       }
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "http://api.map.baidu.com/api?v=2.0&ak="+ak+"&callback=init";
      script.onerror = reject;
      document.head.appendChild(script);
    })
  }
// export function MP() {
//   return new Promise(function (resolve, reject) {
//     window.onload = function () {
//       resolve(BMap)
//     }
//     var script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = "http://api.map.baidu.com/api?v=2.0&ak=gunzdTw6GkbgSE5s51VUC20p3elQxAKL&callback=init";
//     script.onerror = reject;
//     document.head.appendChild(script);
//   })
// }
// <!--引用百度地图把main.js 中的jquery引用放在前面-->
// <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=" ></script>