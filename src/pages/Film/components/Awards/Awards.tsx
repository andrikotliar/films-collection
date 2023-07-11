import './awards.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { awardIcons } from '@/configs';
import { Award } from '@/types';
import { buildLink } from '@/heplers';

const Awards: FC<{ awards: Award[] }> = ({ awards }) => {
  const awardIcon = (awardTitle: keyof typeof awardIcons) => {
    return `/images/awards/${awardIcons[awardTitle]}`;
  }

  return (
    <div className="awards">
      {awards.map(award => (
        <div className="award" key={award.title}>
          <div className="award__header">
            <div className="award__icon">
              <img src={awardIcon(award.title as keyof typeof awardIcons)} alt="" />
            </div>
            <div className="award__main">
              <h3 className="award__title">
                <Link to={buildLink('awards', award.title)}>
                  {award.title}
                </Link>
              </h3>
              <p>
                {award.nominations.length} nomination{award.nominations.length > 1 && 's'}
              </p>
            </div>
          </div>
          <ul className="award__nominations custom-scroll">
            {award.nominations.map(nomination => (
              <li key={nomination}>
                {nomination}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Awards;