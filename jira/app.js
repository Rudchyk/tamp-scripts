(function (window) {
  window.tmpScript = {
    el: 'js-tmp-vue-app',
    isReady(cb) {
      jq(document).ready(cb);
    },
    addStyle(appStyle) {
      jq('head').append(`<style type="text/css">${appStyle}</style>`);
    },
    startApp(domCb, vueCb) {
      domCb();
      setTimeout(vueCb, 0);
    }
  };
})(window);