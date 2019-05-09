//表单验证类型

 var checkNull = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('此处值不能为空'));
    }else{
    	callback();
    }
  };
export default {
    checkNull:checkNull,
}