import styles from './menu-bar.module.css';
import { ReactNode } from 'react';
import { Editor } from '@tiptap/react';
import {
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ItalicIcon,
  ListIcon,
  ListOrdered,
  QuoteIcon,
  Redo2Icon,
  Undo2Icon,
} from 'lucide-react';
import { ToolButton } from '../tool-button/tool-button';

type MenuBarProps = {
  editor: Editor | null;
};

type ToolsConfigItem = {
  key: string;
  icon: ReactNode;
  action: (editor: Editor) => boolean;
  attributes?: Record<string, unknown>;
};

const toolsConfig: ToolsConfigItem[] = [
  {
    key: 'undo',
    icon: <Undo2Icon />,
    action: (editor) => editor.chain().focus().undo().run(),
  },
  {
    key: 'redo',
    icon: <Redo2Icon />,
    action: (editor) => editor.chain().focus().redo().run(),
  },
  {
    key: 'bold',
    icon: <BoldIcon />,
    action: (editor) => editor.chain().focus().toggleBold().run(),
  },
  {
    key: 'italic',
    icon: <ItalicIcon />,
    action: (editor) => editor.chain().focus().toggleItalic().run(),
  },
  {
    key: 'heading',
    icon: <Heading1Icon />,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    attributes: { level: 1 },
  },
  {
    key: 'heading',
    icon: <Heading2Icon />,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    attributes: { level: 2 },
  },
  {
    key: 'heading',
    icon: <Heading3Icon />,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
    attributes: { level: 3 },
  },
  {
    key: 'heading',
    icon: <Heading4Icon />,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 4 }).run(),
    attributes: { level: 4 },
  },
  {
    key: 'heading',
    icon: <Heading5Icon />,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 5 }).run(),
    attributes: { level: 5 },
  },
  {
    key: 'heading',
    icon: <Heading6Icon />,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 6 }).run(),
    attributes: { level: 6 },
  },
  {
    key: 'bulletList',
    icon: <ListIcon />,
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    key: 'orderedList',
    icon: <ListOrdered />,
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    key: 'blockquote',
    icon: <QuoteIcon />,
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
  },
];

export const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className={styles.menu}>
      {toolsConfig.map((tool, index) => (
        <ToolButton
          onClick={() => tool.action(editor)}
          isActive={editor.isActive(tool.key, tool.attributes)}
          icon={tool.icon}
          key={index}
        />
      ))}
    </div>
  );
};
