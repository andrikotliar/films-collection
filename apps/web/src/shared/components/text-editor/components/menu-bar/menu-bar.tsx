import styles from './menu-bar.module.css';
import { type Editor } from '@tiptap/react';
import { ToolButton } from '../tool-button/tool-button';
import { toolsConfig } from '~/shared/components/text-editor/configs';
import {
  MenuBarAdditionalOptions,
  type EditorMenuOption,
} from '~/shared/components/text-editor/components/menu-bar-additional-options/menu-bar-additional-options';

type MenuBarProps = {
  editor: Editor | null;
  menuOptions?: EditorMenuOption[];
};

export const MenuBar = ({ editor, menuOptions }: MenuBarProps) => {
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
      {menuOptions && <MenuBarAdditionalOptions options={menuOptions} editor={editor} />}
    </div>
  );
};
