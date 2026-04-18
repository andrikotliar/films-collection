import styles from './text-editor.module.css';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { type FormError } from '~/shared';
import { FieldLabel } from '../field-label/field-label';
import { FieldError } from '../field-error/field-error';
import { MenuBar } from './components';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import type { EditorMenuOption } from '~/shared/components/text-editor/components/menu-bar-additional-options/menu-bar-additional-options';

const extensions = [StarterKit];

export type TextEditorProps = {
  label?: string;
  error?: FormError;
  content?: string;
  onChange: (content: string) => void;
  menuOptions?: EditorMenuOption[];
};

export type EditorRef = {
  setContent: (content: string) => boolean | undefined;
};

export const TextEditor = forwardRef<EditorRef, TextEditorProps>(
  ({ label, error, content = '', onChange, menuOptions }, ref) => {
    const editor = useEditor({
      extensions,
      content,
      editorProps: {
        attributes: {
          class: styles.editor,
        },
      },
      onUpdate: (props) => onChange(props.editor.getHTML()),
    });

    useEffect(() => {
      if (editor && content?.length && !editor.getText().length) {
        editor.commands.setContent(content);
      }
    }, [content, editor]);

    useImperativeHandle(ref, () => ({
      setContent: (content: string) => editor?.commands.setContent(content),
    }));

    return (
      <div className={styles.editor_wrapper}>
        {label && <FieldLabel>{label}</FieldLabel>}
        <div>
          <MenuBar editor={editor} menuOptions={menuOptions} />
          <EditorContent editor={editor} />
        </div>
        <FieldError error={error} />
      </div>
    );
  },
);
