Vue.component('mr-link', {
  template: /*html*/`
    <p>
      <a :href="hrefTo" target="_blank">Create MR into {{mainBranch}}</a>
    </p>
  `,
  data: function () {
    return {
      gitHubLink: 'https://github.com/KIVU-Technologies/kivu-gui/compare/',
    }
  },
  props: ['branch', 'mainBranch'],
  computed: {
    hrefTo() {
      return `${this.gitHubLink}${this.mainBranch}...${this.branch}`;
    }
  }
});
