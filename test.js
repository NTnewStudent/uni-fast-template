var str = '%7B%22code%22%3A200%2C%22data%22%3A%5B1%2C2%2C4%2C6%2C7%5D%2C%22ids%22%3A%221%2C2%2C3%2C5%2C76%2C9%22%2C%22obj%22%3A%7B%22name%22%3A%22abc%22%7D%7D';
function getQueryObject(url) {
    var search = url.substring(url.lastIndexOf("?") + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, function (rs, $1, $2) {
        var name = decodeURIComponent($1);
        var val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        // return rs;
        // console.log(rs);
    });
    // return obj;
    // console.log(obj);
    return obj
}

function getDecodeUrlParam(url){
   let t1= decodeURIComponent(url)
    return getQueryObject(t1)
}
console.log(decodeURIComponent(str))