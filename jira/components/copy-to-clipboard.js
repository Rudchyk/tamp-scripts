Vue.component('copy-to-clipboard', {
  template: /*html*/`
    <span class="copy-to-clipboard__btn-group">
      <button type="button" @click="copy" class="aui-button aui-button-primary aui-style js-copy-to-clipboard-btn" style="background-color: grey">Copy</button>
      <span class="copy-to-clipboard__alert js-copy-to-clipboard-alert">
        {{ msg }}
      </span>
    </span>
  `,
  data: function () {
    return {
      timer: null,
      msg: null,
    }
  },
  props: ['text'],
  methods: {
    copy() {
      this.copyingToClipboard(this.text);
    },
    copyingToClipboard(text) {
      clearTimeout(this.timer);

      navigator.clipboard.writeText(text).then(() => {
        console.log('Async: Copying to clipboard was successful!');
        this.msg = 'Copying to clipboard was successful!';
      }, (err) => {
        console.error(`Async: Could not copy ${text}: `, err);
        this.msg = 'Copying to clipboard was not successful!';
      });

      this.timer = setTimeout(() => {
        this.msg = null;
      }, 500);
    },
  }
});