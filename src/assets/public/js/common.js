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
    },
    // 获取当前时间之后或之前的时间
    date(days) {
        debugger
        Date.prototype.addDays = function(days) {

            var date = new Date(this);
            date.setDate(date.getDate() + days);
            return date;
        }
    },
    /**
           * 获取上一个月
           *
           * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
           */
    getPreMonth(val) {

        // var date = new Date(); // 获取当前的时间对象
        var date = val?val:new Date()
        var year = date.getFullYear();
        var month = date.getMonth() +1;
        var day = date.getDate()+1; // 获取到当前天
        var newDay = date.getDate()
        var endDate = year + '/' + month + '/' + day;
        var startDta = year + '/' + month + '/' + newDay;
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中月的天数
        var year2 = year;
        var month2 = parseInt(month) - 1;
        if (month2 == 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        var t2 = year2 + '/' + month2 + '/' + day2;
        return [t2,endDate,startDta];
    }


}
