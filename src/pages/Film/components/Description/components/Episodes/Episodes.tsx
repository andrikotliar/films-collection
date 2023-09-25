import './episodes.css';
import { FC } from 'react';
import { Episode } from '@/types';

const EpisodesTable: FC<{ episodes: Episode[] }> = ({ episodes }) => {
  return (
    <div className="episodes-table-wrapper">
      <table className="episodes-table">
        <thead className="episodes-table__header">
          <tr className="episodes-table__row">
            <th className="episodes-table__cell" colSpan={2}>Episode</th>
            <th className="episodes-table__cell">Title</th>
          </tr>
        </thead>
        <tbody className="episodes-table__body">
          {episodes.map((episode) => (
            <tr className="episodes-table__row" key={episode.episodeOverall}>
              <td className="episodes-table__cell episodes-table__cell--num">
                {episode.episodeOverall}
              </td>
              <td className="episodes-table__cell episodes-table__cell--num">
                {episode.episode}
              </td>
              <td className="episodes-table__cell">
                {episode.title}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { EpisodesTable };