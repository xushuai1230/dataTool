export default {
  //移除数组中为空的元素
  removeEmptyArrayEle(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == undefined || arr[i] == "") {
        arr.splice(i, 1);
        i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，

      }
    }
    return arr;
  },
  //获取url参数 paraName参数的名称。使用方法:GetUrlParam("id",url);
  getUrlParam(paraName, url) {
    var arrObj = url.split("?");
    if (arrObj.length > 1) {
      var arrPara = arrObj[1].split("&");
      var arr;
      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");
        if (arr != null && arr[0] == paraName) {
          return arr[1];
        }
      }
      return "";
    } else {
      return "";
    }
  },
  // 替换url参数 返回新的url
  replaceUrlParam(url, arg, val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + val;
    var tF = url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText);
    var tS = (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
    return url.match(pattern) ? tF : tS;
  },
  //转化为下拉框所需要格式[{ value:'',text:''}]
  toJson(arr) {
    if (!arr.length) return null;
    var array = new Array();
    for (var i = 0; i < arr.length; i++) {
      array.push({
        "value": arr[i],
        "label": arr[i]
      });
    }
    return array;
  },
  // 数组去重
  uniq(array) {
    var temp = []; //一个新的临时数组
    for (var i = 0; i < array.length; i++) {
      if (temp.indexOf(array[i]) == -1) {
        temp.push(array[i]);
      }
    }
    return temp;
  }
}
