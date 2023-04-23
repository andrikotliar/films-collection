import './styles.css';
import { awardIcons } from '@/configs';
import { useState } from 'react';
import classNames from 'classnames';

const Awards = ({ awards }) => {
  const [ openNominations, setOpenNominations ] = useState();

  const awardIcon = (awardTitle) => {
    return `/images/awards/${awardIcons[awardTitle]}`;
  }

  const handleOpenNominations = (awardTitle) => {
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
              <img src={awardIcon(award.title)} alt="" />
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