Vue.component('Field', {
  template: /*html*/`
    <div class="tmp-field-group">
      <label>
        <div class="tmp-label" v-if="label">{{ label }}</div>
        <input
          v-if="isModel"
          :readonly="isReadonly"
          :type="type"
          @click="onClick"
          :class="classNames"
          v-model="value"
          @input="onInput"
        >
        <input
          v-else
          :readonly="isReadonly"
          :type="type"
          @click="onClick"
          :class="classNames"
          :value="value"
        >
      </label>
      <copy-to-clipboard v-if="copyToClipboard" :text="copyToClipboard"></copy-to-clipboard>
      <slot>
    </div>
  `,
  model: {
    event: 'change',
  },
  data: function () {
    return {
      defaultClassName: 'tuiTextField',
    }
  },
  props: {
    label: String,
    className: {
      type: Array,
      default: () => [],
    },
    copyToClipboard: String,
    isDefaultClass: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
      default: '',
    },
    isModel: {
      type: Boolean,
      default: false,
    },
    isReadonly: {
      type: Boolean,
      default: true,
    },
    clickAction: {
      type: [String, Function],
      default: () => 'select',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  computed: {
    classNames() {
      const classes = [...this.className];
      if (this.isDefaultClass) {
        classes.push(this.defaultClassName);
      }
      return classes.join(' ');
    }
  },
  methods: {
    select: (e) => {
      e.target.select();
    },
    onInput() {
      this.$emit('change', this.value);
    },
    onClick(e) {
      if (!this.clickAction || this.clickAction === 'null') {
        return;
      } else if (this.clickAction === 'select') {
        this.select(e);
      } else {
        this.clickAction(e);
      }
    }
  }
});