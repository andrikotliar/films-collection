import styles from './styles.module.css';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { type FormError } from '~/common';
import { FieldLabel } from '../field-label/field-label';
import { FieldError } from '../field-error/field-error';
import { MenuBar } from './components';

const extensions = [StarterKit];

export type TextEditorProps = {
  label?: string;
  error?: FormError;
  content?: string;
  onChange: (content: string) => void;
};

export const TextEditor = ({ label, error, content = '', onChange }: TextEditorProps) => {
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

  return (
    <div className={styles.editor_wrapper}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <div>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      <FieldError error={error} />
    </div>
  );
};
