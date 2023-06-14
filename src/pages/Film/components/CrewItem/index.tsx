import './styles.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { buildLink } from '@/heplers';
import { Crew } from '@/types';
import { InfoIcon } from '@/assets/icons';

const CrewItem: FC<{ crewItem: Crew }> = ({
  crewItem
}) => {
  return (
    <div className="crew-item">
      <h3 className="crew-item__title">
        {crewItem.role}
      </h3>
      <ul className="crew-item__list">
        {crewItem.people.map((person, idx) => (
          <li className="crew-item__person" key={idx}>
            <Link
              to={buildLink('crew', JSON.stringify({ [crewItem.role]: person.name }))}
              className="crew-item__link"
            >
              {person.name}
            </Link>
            {person.comment && (
              <span className="crew-item__person-comment">
                ({person.comment})
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrewItem;