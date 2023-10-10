import classes from './ExpandButton.module.css';
import { FC } from 'react';
import classNames from 'classnames';
import { ExpandIcon } from '@/assets/icons';

type ExpandButtonProps = {
  isExpanded: boolean;
  episodesCount: number;
  onClick: VoidFunction;
};

const ExpandButton: FC<ExpandButtonProps> = ({
  isExpanded,
  episodesCount,
  onClick,
}) => {
  return (
    <button
      className={classes.expandButton}
      onClick={onClick}
    >
      <span>Show {episodesCount} episodes</span>
      <ExpandIcon
        color="currentcolor"
        className={classNames(classes.icon, {
          [classes.expanded]: isExpanded,
        })}
      />
    </button>
  );
};

export { ExpandButton };
