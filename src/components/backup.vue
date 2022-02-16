<template>
  <editor-content :editor="editor" />
</template>

<script>
import { Editor, EditorContent ,  EditorMenuBar ,EditorMenuBubble } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  ListItem,
  Strike,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Bold,
  Code,
  Italic,
  Image,
  History,
  Underline,
} from 'tiptap-extensions'
export default {
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
    Editor    

  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
      ],
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML())

        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>