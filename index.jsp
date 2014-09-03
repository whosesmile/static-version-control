<%@ page contentType="text/html;charset=UTF-8" language="java" trimDirectiveWhitespaces="true"%>
<%
  String staticHost = "http://static.qdingnet.com";
%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <title>千丁互联（龙湖地产）</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <link rel="shortcut icon" href="<%=staticHost %>/public/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="<%=staticHost %>/public/bootstrap/dist/css/bootstrap.min.css?{{version}}" />
    <link rel="stylesheet" href="<%=staticHost %>/public/angular-bootstrap-datetimepicker/src/css/datetimepicker.css?{{version}}"/>
    <link rel="stylesheet" href="<%=staticHost %>/public/fontawesome/css/font-awesome.min.css?{{version}}" />
    <link rel="stylesheet" href="<%=staticHost %>/public/angular-growl/build/angular-growl.min.css?{{version}}" />
    <link rel="stylesheet" href="<%=staticHost %>/public/animate-css/animate.min.css?{{version}}" />
    <link rel="stylesheet" href="<%=staticHost %>/server/app.min.css?{{version}}" />

    <script src="<%=staticHost %>/public/ng-file-upload/angular-file-upload-shim.min.js?{{version}}"></script>
    <script src="<%=staticHost %>/public/jquery/dist/jquery.min.js?{{version}}"></script>
    <script src="<%=staticHost %>/public/angular/angular.min.js?{{version}}"></script>
    <script src="<%=staticHost %>/public/ng-file-upload/angular-file-upload.min.js?{{version}}"></script>
    <script src="<%=staticHost %>/public/angular-ui-router/release/angular-ui-router.min.js?{{version}}"></script>
    <script src="<%=staticHost %>/public/angular-bootstrap/ui-bootstrap-tpls.min.js?{{version}}"></script>
    <script src="<%=staticHost %>/public/angular-growl/build/angular-growl.min.js?{{version}}"></script>
    <script src="<%=staticHost %>/public/angular-locale/angular-locale_zh-cn.js?{{version}}"></script>
    <script src="<%=staticHost %>/public/tinymce/tinymce.min.js?{{version}}"></script>
    <script src="<%=staticHost %>/public/angular-ui-tinymce/src/tinymce.js?{{version}}"></script>
    <script src="<%=staticHost %>/public/moment/moment.js?{{version}}"></script>
    <script src="<%=staticHost %>/public/moment/locale/zh-cn.js?{{version}}"></script>
    <script src="<%=staticHost %>/public/angular-bootstrap-datetimepicker/src/js/datetimepicker.js?{{version}}"></script>
    <!--[if lt IE 9]>
    <script src="<%=staticHost %>/public/json2/json2.js?{{version}}"></script>
    <script src="<%=staticHost %>/public/html5shiv/dist/html5shiv.min.js?{{version}}"></script>
    <script src="<%=staticHost %>/public/respond/dest/respond.min.js?{{version}}"></script>
    <link href="<%=staticHost %>/public/cross-domain/respond-proxy.html" id="respond-proxy" rel="respond-proxy" />
    <link href="<%=staticHost %>/public/cross-domain/respond.proxy.gif" id="respond-redirect" rel="respond-redirect" />
    <script src="<%=staticHost %>/public/cross-domain/respond.proxy.js?{{version}}"></script>
    <![endif]-->
    <!--[if lt IE 8]>
    <script src="<%=staticHost %>/public/chromium/cfinstall.min.js?{{version}}"></script>
    <script src="<%=staticHost %>/public/chromium/chromeframe.js?{{version}}"></script>
    <![endif]-->
    <script src="<%=staticHost %>/server/app.min.js?{{version}}"></script>
  </head>
  <body cs-layout></body>
</html>