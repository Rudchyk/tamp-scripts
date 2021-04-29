(function (window) {
  window.tmpScript = {
    el: 'js-tmp-vue-app',
    isReady(cb) {
      jq(document).ready(cb);
    },
    appendToBody(domCb) {
      domCb();
    },
    addStyle(appStyle) {
      jq('head').append(`<style type="text/css">${appStyle}</style>`);
    },
    startApp(domCb, vueCb) {
      this.appendToBody(domCb);
      setTimeout(vueCb, 0);
    }
  };
})(window);
