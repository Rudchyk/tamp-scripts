// ==UserScript==
// @name        JIRA issue helpers
// @namespace   https://kivutechnologies.atlassian.net/browse/
// @include     https://kivutechnologies.atlassian.net/browse/*
// @require     https://vuejs.org/js/vue.min.js
// @require     https://code.jquery.com/jquery-3.4.1.min.js
// @require     https://github.com/Rudchyk/tamp-scripts/blob/main/jira/components/Field.js
// @require     https://github.com/Rudchyk/tamp-scripts/blob/main/jira/components/copy-to-clipboard.js
// @require     https://github.com/Rudchyk/tamp-scripts/blob/main/jira/components/mr-link.js
// @require     https://github.com/Rudchyk/tamp-scripts/blob/main/jira/app.js
// @version     1
// @grant       none
// ==/UserScript==

window.jq = $.noConflict(true);
Vue.config.devtools = true;

const appStyle = /*css */`
  body {
    color: red;
  }
`;
const elSel = 'js-tmp-vue-app';

Vue.component('App', {
  template: /*html*/`
    <div>
      {{ hello }}
    </div>
  `,
  data: function () {
    return {
      hello: 'Hello World!',
    }
  },
});

(function () {
  'use strict';
  tmpScript.isReady(function () {
    tmpScript.addStyle(appStyle);
    tmpScript.startApp(
      () => {
        jq('body').append(`<div id="${elSel}"></div>`);
      },
      () => {
        new Vue({
          el: `#${elSel}`,
          template: `<App/>`,
        })
      }
    );
  });
})();