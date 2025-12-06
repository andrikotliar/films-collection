import styles from './menu-bar.module.css';
import { type Editor } from '@tiptap/react';
import { ToolButton } from '../tool-button/tool-button';
import { toolsConfig } from '~/shared/components/text-editor/configs';

type MenuBarProps = {
  editor: Editor | null;
};

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
