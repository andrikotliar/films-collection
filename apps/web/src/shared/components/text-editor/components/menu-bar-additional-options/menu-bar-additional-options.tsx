import type { Editor } from '@tiptap/react';
import { EllipsisVerticalIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '~/shared/components/button/button';
import { PopupMenu } from '~/shared/components/popup-menu/popup-menu';
import styles from './menu-bar-additional-options.module.css';

export type EditorMenuOption = {
  title: string;
  action: (editor: Editor) => void;
};

type MenuBarAdditionalOptionsProps = {
  editor: Editor;
  options: EditorMenuOption[];
};

export const MenuBarAdditionalOptions = ({ editor, options }: MenuBarAdditionalOptionsProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <Button
        icon={<EllipsisVerticalIcon />}
        onClick={toggleMenu}
        variant="ghost"
        ref={menuButtonRef}
      />
      <PopupMenu
        isOpen={isMenuOpen}
        triggerRef={menuButtonRef}
        onClose={() => setIsMenuOpen(false)}
      >
        <div className={styles.wrapper}>
          {options.map((option) => (
            <button
              onClick={() => {
                option.action(editor);
                setIsMenuOpen(false);
              }}
              className={styles.menu_option}
              key={option.title}
            >
              {option.title}
            </button>
          ))}
        </div>
      </PopupMenu>
    </>
  );
};
