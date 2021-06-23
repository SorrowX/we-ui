/*  ajax 的封装, 含跨域 jsonp
   *
    *  参数         默认值              描述                  可选值
   *    url             “”                 请求的链接              string
   *    type         get             请求的方法              get,post
   *    data         null             请求的数据              object,string
   *    contentType     “”                 请求头                  string
   *    dataType     “”                 请求的类型              jsonp
   *    async         true             是否异步              blooean
   *    timeOut         undefined         超时时间              number
   *    before         function(){}     发送之前执行的函数      function
   *    error         function(){}     请求报错执行的函数      function
   *    success         function(){}     请求成功的回调函数      function
   *
   *    @use
   *    ajax({
   *        type:"post",
   *        dataType: 'jsonp',
   *        url:"http://wx.indoorun.com/wx/getUnitsOfFloor.html", //添加自己的接口链接
   *        data: {'regionId':'14428254382730015', 'floorId':'14428254382890016'},
   *        timeOut:5000,
   *        before:function(){
   *          console.log("before");
   *        },
   *        success:function(str){
   *            console.log(str);
   *        },
   *        error:function(){
   *            console.log("error");
   *        }
   *    });
    */
const ajax = function(options) {

  function setData() {
    let name, value;
    if (data) {
      if (typeof data === 'string') {
        data = data.split('&');
        for (let i = 0, len = data.length; i < len; i++) {
          name = data[i].split('=')[0];
          value = data[i].split('=')[1];
          data[i] = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        }
        data = data.replace('/%20/g', '+');
      } else if (typeof data === 'object') {
        let arr = [];
        for (let key in data) {
          if (typeof data[key] !== 'undefined') {
            let value = data[key].toString();
            key = encodeURIComponent(key);
            value = encodeURIComponent(value);
            arr.push(key + '=' + value);
          }
        }
        data = arr.join('&').replace('/%20/g', '+');
      }
      if (type === 'get' || dataType === 'jsonp') {
        url += url.indexOf('?') > -1 ? (url.indexOf('=') > -1 ? '&' + data : data) : '?' + data;
      }
    }
  }

  // JSONP
  function createJsonp() {
    const script = document.createElement('script');
    const timeName = new Date().getTime() + Math.round(Math.random() * 1000);
    const callback = 'JSONP_' + timeName;

    window[callback] = function(data) {
      clearTimeout(timeout_flag);
      document.body.removeChild(script);
      success(data);
    };
    script.src = url + (url.indexOf('?') > -1 ? '&' : '?') + 'callback=' + callback;
    script.type = 'text/javascript';
    document.body.appendChild(script);
    setTime(callback, script);
  }
  // 设置请求超时
  function setTime(callback, script) {
    if (timeOut !== undefined) {
      timeout_flag = setTimeout(function() {
        if (dataType === 'jsonp') {
          // delete window[callback];
          document.body.removeChild(script);

        } else {
          timeout_bool = true;
          xhr && xhr.abort();
        }
        callback && callback('timeout');
      }, timeOut);
    }
  }

  function createXHR() {
    function getXHR() {
      if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
      } else {
        const versions = ['Microsoft', 'msxm3', 'msxml2', 'msxml1'];
        for (let i = 0; i < versions.length; i++) {
          try {
            const version = versions[i] + '.XMLHTTP';
            return new window.ActiveXObject(version);
          } catch (e) {}
        }
      }
    }
    xhr = getXHR();
    xhr.open(type, url, async);
    if (type === 'post' && !contentType) {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    } else if (contentType) {
      xhr.setRequestHeader('Content-Type', contentType);
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (timeOut !== undefined) {
          if (timeout_bool) {
            return;
          }
          clearTimeout(timeout_flag);
        }
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          success(xhr.responseText);
        } else {
          error(xhr.status, xhr.statusText);
        }
      }
    };
    xhr.send(type === 'get' ? null : data);
    setTime(error);
  }

  let url = options.url || ''; // 请求的链接
  let type = (options.type || 'get').toLowerCase(); // 请求的方法,默认为get
  let data = options.data || null; // 请求的数据
  let contentType = options.contentType || ''; // 请求头
  let dataType = options.dataType || ''; // 请求的类型
  let async = options.async === undefined && true; // 是否异步，默认为true.
  let timeOut = options.timeOut; // 超时时间。
  let before = options.before || function() {}; // 发送之前执行的函数
  let error = options.error || function() {}; // 错误执行的函数
  let success = options.success || function() {}; // 请求成功的回调函数
  let timeout_bool = false; // 是否请求超时
  let timeout_flag = null; // 超时标识
  let xhr = null; // xhr对角

  setData();
  before();

  if (dataType === 'jsonp') {
    createJsonp();
  } else {
    createXHR();
  }
};

export default ajax;
