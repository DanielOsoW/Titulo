<template>
  <div id="app">
    <h1>Vue Prism Editor - v1</h1>
    <pre>{{ code }}</pre>
    <input type="checkbox" v-model="lineNumbers" /> Linenumbers
    <prism-editor
      class="my-editor height-300"
      v-model="code"
      :highlight="highlighter"
      :line-numbers="lineNumbers"
    ></prism-editor>

    <h1>Autosize</h1>
    <p>
      don't use
      <b>min-height</b> or <b>height</b> you could still define
      <b>max-height</b>
    </p>
    <prism-editor
      class="my-editor"
      v-model="code"
      :highlight="highlighter"
    ></prism-editor>

    <div style="margin-top: 25px; font-size: 25px">
      Documantation on
      <a target="_blank" href="https://github.com/koca/vue-prism-editor"
        >Github</a
      >
    </div>
  </div>
</template>

<script>
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  components: {
    PrismEditor,
  },
  data: () => ({
    code: 'console.log("Hello World")',
    lineNumbers: true,
  }),
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); //returns html
    },
  },
};
</script>

<style lang="scss">
// required class
.my-editor {
  background: #2d2d2d;
  color: #ccc;

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

// optional
.prism-editor__textarea:focus {
  outline: none;
}

// not required:
.height-300 {
  height: 300px;
}
</style>
