/*global console:true, require:true, process:true  */
/**
 * 依赖
 */
var fs = require('fs');
var util = require('util');
var path = require('path');
var crypto = require('crypto');

/**
 * 读取文件内容
 * @param  {string} path
 * @return {string}
 */
function readfile(path) {
  try {
    return fs.readFileSync(path).toString();
  }
  catch (e) {
    return 'not found';
  }
}

/**
 * 覆盖写文件
 * @param  {string} path
 * @return null
 */
function writefile(path, text) {
  try {
    fs.writeFileSync(path, text);
    return 'write success';
  }
  catch (e) {
    return 'not found';
  }
}

/**
 * 计算给定字符的MD5
 * @param  {[string]} text
 * @return {[string]} 32位MD5结果
 */
function md5(text) {
  return crypto.createHash('md5').update(text).digest('hex');
}

/**
 * 计算给定字符的版本，只去8位即可，重复概率可以忽略
 * @param  {string} text
 * @return {string} MD5的前8位大写数字
 */
function version(text) {
  return md5(text).substring(0, 8).toUpperCase();
}

/**
 * 根据URL解析出文件地址
 * @param  {string} 可以识别的url格式如下: ${host}/server/app.min.js?{{version}}
 *                        <%=staticHost%>/server/app.min.js?{{version}}
 *                        http://www.abc.com/server/app.min.js?{{version}}
 * @return {string} path
 */
function resolve(url) {
  var reg = /(^\$\{\w+\}\/)|(<%=\s*\w+\s*%>\/)|(^https?\:\/\/([a-z-]+\.)+[a-z]+\/)/i;
  // if (url)
  var filepath = path.resolve(__dirname, '../', url.substring(0, url.indexOf('?')).replace(reg, ''));

  // 可能不存在 加上dist目录
  if (!fs.existsSync(filepath)) {
    filepath = path.resolve(__dirname, '../', url.substring(0, url.indexOf('?')).replace(reg, '').replace(/\/?([\w-]+)\/(.+)/, '$1/dist/$2'));
  }
  return filepath;
}

/**
 * 方式一：负责将给定url重写 这个方法是在url后面追加后缀参数
 * PS: <%=staticHost%>/server/app.min.js?{{version}}
 *     <%=staticHost%>/server/app.min.js?$CD61B138.js
 * @param  {string} url
 * @return {string} suffix
 *
 * 注意：目前正则不支持此方式做二次替换
 */
function suffix(url) {
  var path = resolve(url);
  var text = readfile(path);
  var vers = version(text);
  var suff = url.substring(url.lastIndexOf('.', url.lastIndexOf('?')) + 1, url.lastIndexOf('?'));
  var real = url.substring(0, url.lastIndexOf('?'));
  return util.format('%s?$%s.%s', real, vers, suff);
}

/**
 * 方式二：负责将给定url重写 这个方法是将文件名重写，生成的url在前端nginx上面需要做rewrite处理
 * PS: <%=staticHost%>/server/app.min.js?{{version}}
 *     <%=staticHost%>/server/app.min.$CD61B138.js
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
function rewrite(url) {
  var path = resolve(url);
  var text = readfile(path);
  var vers = version(text);
  var name = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.', url.lastIndexOf('?')));
  var suff = url.substring(url.lastIndexOf('.', url.lastIndexOf('?')) + 1, url.lastIndexOf('?'));
  var real = url.substring(0, url.lastIndexOf('/'));
  return util.format('%s/%s.$%s.%s', real, name, vers, suff);
}

/**
 * 解析文件，复写预先占位的参数
 * @param  {string} path
 */
function translate(p) {
  console.log('\nRunning translate:', p);
  var text = readfile(p);
  var jsReg = /<script\s*.*?src=(['"])(.*?\?({#\s*version\s*#}|\$.+?))\1\s*.*><\/script>/g;
  var cssReg = /<link\s*.*?href=(['"])(.*?\?({#\s*version\s*#}|\$.+?))\1\s*.*\/?>/g;

  var html = text.replace(jsReg, function (match, quotes, url) {
    return match.replace(url, suffix(url));
  }).replace(cssReg, function (match, quotes, url) {
    return match.replace(url, suffix(url));
  });

  writefile(p, html);
  console.log('File ', p, ' has been translated...\n');
}

/*!
 * 核心处理逻辑
 * @{string} p 路径或路径数组
 * @{boolean} r 是否递归查询
 */
var deep = 0;

function handler(p, r) {

  var list = p instanceof Array ? p : [p];

  list.forEach(function (file) {
    // 忽略隐藏文件
    if (file !== '.' && /^\./.test(path.basename(file))) {
      return;
    }

    var stats = fs.statSync(file);
    // 处理文件
    if (stats.isFile() && /\.jsp$/.test(file)) {
      translate(file);
    }
    else if (stats.isDirectory(file) && (r || deep === 0)) {
      deep += 1;
      fs.readdirSync(file).sort(function (a, b) {
        return a.length < b.length;
      }).forEach(function (name) {
        handler(path.join(file, name), r);
      });
    }
  });
}

// 解析参数执行
(function () {
  var paths = [];
  var recursive = false;

  // 解析参数
  process.argv.forEach(function (arg, index) {
    // 忽略node和deploy.js
    if (index >= 2) {
      if (arg === '-r') {
        recursive = true;
      }
      else if (fs.existsSync(arg)) {
        paths.push(arg);
      }
      else {
        console.log('文件不存在:', arg);
      }
    }
  });

  handler(paths, recursive);
})();