Vue.component('mr-link', {
  template: /*html*/`
    <p>
      <a :href="href" target="_blank">Create MR into {{branch}}</a>
    </p>
  `,
  props: ['href', 'branch'],
});