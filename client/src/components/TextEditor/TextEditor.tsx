import styles from './TextEditor.module.css';
import { FC } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FormError } from '@/types';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import { FieldError } from '../FieldError/FieldError';
import { MenuBar } from './components';

const extensions = [StarterKit];

export type TextEditorProps = {
  label?: string;
  error?: FormError;
  content?: string;
  onChange: (content: string) => void;
};

export const TextEditor: FC<TextEditorProps> = ({
  label,
  error,
  content = '',
  onChange,
}) => {
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
    <div className={styles.editorWrapper}>
      {label && <FieldLabel>{label}</FieldLabel>}
      <div>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      <FieldError error={error} />
    </div>
  );
};
