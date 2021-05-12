// ==UserScript==
// @name        JIRA issue helpers
// @description JIRA issue helpers
// @author      Sergii Rudchyk
// @namespace   https://kivutechnologies.atlassian.net/browse/
// @include     https://kivutechnologies.atlassian.net/browse/*
// @supportURL  https://raw.githubusercontent.com/Rudchyk/tamp-scripts
// @updateURL   https://raw.githubusercontent.com/Rudchyk/tamp-scripts/main/jira/examples/jira.js
// @downloadURL https://raw.githubusercontent.com/Rudchyk/tamp-scripts/main/jira/examples/jira.js
// @require     https://vuejs.org/js/vue.js
// @require     https://code.jquery.com/jquery-3.4.1.min.js
// @require     https://raw.githubusercontent.com/Rudchyk/tamp-scripts/main/jira/components/Field.js
// @require     https://raw.githubusercontent.com/Rudchyk/tamp-scripts/main/jira/components/copy-to-clipboard.js
// @require     https://raw.githubusercontent.com/Rudchyk/tamp-scripts/main/jira/components/mr-link.js
// @require     https://raw.githubusercontent.com/Rudchyk/tamp-scripts/main/jira/app.js
// @version     1
// @noframes
// ==/UserScript==

window.jq = $.noConflict(true);
Vue.config.devtools = true;

const appStyle = /*css */`
  .tmp-section .tuiTextField {
    width: 40%;
    border: 1px solid rgb(223, 225, 230);
    border-radius: 3px;
    height: 40px;
    padding: 0 20px;
  }
  .tmp-section .tmp-label {
    font-weight: 700;
    width: 40%;
    display: block;
    padding: 10px 0;
  }
`;
const elSel = 'js-tmp-vue-app';

Vue.component('App', {
  template: /*html*/`
    <div>
      <button @click="showAction">{{ showBtnMsg }} TMP helpers section</button>
      <section class="tmp-section" v-show="isShow">
        <Field label="Issue Number:" :value="key" :copyToClipboard="key" />
        <Field label="Additional name for branch name:" :isModel="true" clickAction="null" :isReadonly="false" v-model="issue.name">
          <span class="additional-name-box__btn-group">
            <button type="button" @click="refresh" class="aui-button aui-button-primary aui-style" style="background: #968b03">Refresh</button>
          </span>
        </Field>
        <Field :label="'Branch Name for ' + branch" :value="useBranchName(branch)" :copyToClipboard="useBranchName(branch)" v-for="branch in branches">
          <mr-link :href="mrHref(branch)" :branch="branch" />
        </Field>
        <Field label="Commit Name:" :value="commitName" :copyToClipboard="commitName" />
      </section>
    </div>
  `,
  data: function () {
    return {
      key: null,
      summary: null,
      isShow: true,
      issue: {
        name: null,
        key: null,
      },
      branchData:  {
        default: 'development',
        extra: [
          'ideamars',
        ]
      },
      gitHubLink: 'https://github.com/KIVU-Technologies/kivu-gui/compare/',
    }
  },
  computed: {
    branches() {
      return [this.branchData.default, ...this.branchData.extra];
    },
    commitName() {
      return `[${this.key}]: `;
    },
    branchName() {
      return `${this.key}_${this.snakeCase(this.issue.name)}`;
    },
    showBtnMsg() {
      return this.isShow ? 'Hide' : 'Show';
    }
  },
  mounted() {
    this.key = jq('[data-test-id="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"]').text();
    this.summary = this.changeStr(jq('h1[data-test-id="issue.views.issue-base.foundation.summary.heading"]').text());
    this.issue.name = this.summary;
  },
  methods: {
    mrHref(branch) {
      return `${this.gitHubLink}${branch}...${this.useBranchName(branch)}`;
    },
    useBranchName(branch) {
      return branch === this.branchData.default ? this.branchName : `${this.branchName}-${branch}`;
    },
    changeStr: (string) => string.replace(/\[/g, '').replace(/\]/g, ''),
    refresh() {
      this.issue.name = this.summary;
    },
    kebabCase(string) {
        return string
            .replace(/([a-z][A-Z])/g, function(match) {
                return match.substr(0, 1) + '-' + match.substr(1, 1).toLowerCase();
            })
            .toLowerCase()
            .replace(/[^-a-z0-9]+/g, '-')
            .replace(/^-+/, '').replace(/-$/, '');
    },
    snakeCase(str) {
      return str &&
        str
          .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
          .map(x => x.toLowerCase())
          .join('_');
    },
    showAction() {
      this.isShow = !this.isShow;
    },
  }
});

(function () {
  'use strict';
  tmpScript.isReady(function () {
    tmpScript.addStyle(appStyle);
    tmpScript.startApp(
      () => {
        jq('#jira-issue-header').append(`<div id="${elSel}"></div>`);
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