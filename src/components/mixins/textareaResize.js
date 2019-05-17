export const textareaResize = {
  methods: {
    resizeTextarea(event) {
      event.target.style.height = 'auto';
      event.target.style.height = event.target.scrollHeight + 'px';
    }
  },
  mounted() {
    this.$nextTick(() => {
      // console.log(this.$refs['memoTextarea']);
      this.$refs['memoTextarea'].setAttribute(
        'style',
        'height:' +
          this.$refs['memoTextarea'].scrollHeight +
          'px;overflow-y:hidden;'
      );
    });

    this.$refs['memoTextarea'].addEventListener('input', this.resizeTextarea);
  },
  beforeDestroy() {
    this.$refs['memoTextarea'].removeEventListener(
      'input',
      this.resizeTextarea
    );
  },
  render() {
    return this.$slots.default[0];
  }
};
