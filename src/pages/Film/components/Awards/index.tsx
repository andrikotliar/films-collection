import './styles.css';
import { FC, useState } from 'react';
import classNames from 'classnames';
import { awardIcons } from '@/configs';
import { Award } from '@/types';

const Awards: FC<{ awards: Award[] }> = ({ awards }) => {
  const [ openNominations, setOpenNominations ] = useState<string | null>(null);

  const awardIcon = (awardTitle: keyof typeof awardIcons) => {
    return `/images/awards/${awardIcons[awardTitle]}`;
  }

  const handleOpenNominations = (awardTitle: string) => {
    setOpenNominations((prevValue) => {
      if(prevValue === awardTitle) {
        return null;
      }
      return awardTitle
    });
  }

  return (
    <div className="awards">
      {awards.map(award => (
        <div className="award" key={award.title}>
          <button
            className={classNames(
              'award__header',
              {
                'award__header--active': award.title === openNominations
              }
            )}
            onClick={() => handleOpenNominations(award.title)}
          >
            <div className="award__icon">
              <img src={awardIcon(award.title as keyof typeof awardIcons)} alt="" />
            </div>
            <div className="award__main">
              <h3 className="award__title">
                {award.title}
              </h3>
              <p>
                {award.nominations.length} nomination{award.nominations.length > 1 && 's'}
              </p>
            </div>
          </button>
          {award.title === openNominations && (
            <ul className="award__nominations">
              {award.nominations.map(nomination => (
                <li key={nomination}>
                  {nomination}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Awards;