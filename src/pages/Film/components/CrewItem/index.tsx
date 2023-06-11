import './styles.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { buildLink } from '@/heplers';
import { Crew } from '@/types';

const CrewItem: FC<{ crewItem: Crew }> = ({
  crewItem
}) => {
  return (
    <div className="crew-item">
      <h3 className="crew-item__title">
        {crewItem.role}
      </h3>
      <div className="crew-item__list">
        {crewItem.people.map((person, idx) => (
          <Link
            to={buildLink('crew', JSON.stringify({ [crewItem.role]: person.name }))}
            key={person.name + idx}
            className="crew-item__link"
          >
            {person.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CrewItem;