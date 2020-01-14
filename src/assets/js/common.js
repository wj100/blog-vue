/*添加代码块样式
@params string
return  string
* */
function addStyle(htmlstr) {
  //正则匹配所有pre标签
  //var regex0 = new RegExp("(i?)(\<pre)([^\>]+\>)","gmi");
  //正则匹配不含style="" 或 style='' 的pre标签
  var regex1 = new RegExp("(i?)(\<pre)(?!(.*?style=['\"](.*)['\"])[^\>]+\>)", "gmi");
  //给不含style="" 或 style='' 的pre标签加上style=""
  htmlstr = htmlstr.replace(regex1, "$2 style=\"\"$3");
  //正则匹配含有style的pre标签
  var regex2 = new RegExp("(i?)(\<pre.*?style=['\"])([^\>]+\>)", "gmi");
  //在pre标签的style里面增加css样式(这里增加的样式：display:block;max-width:100%;height:auto;border:5px solid red;)
  htmlstr = htmlstr.replace(regex2, "$2display:block;max-width:100%; font-family:'Microsoft Yahei';height:auto;overflow:auto;background:#607d8b;color:#fff;padding:10px$3");
  return htmlstr;
}

export {
  addStyle,
}

