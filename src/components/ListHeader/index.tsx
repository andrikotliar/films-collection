import { useFilmsContext } from "@/context/FilmsContext";
import './styles.css';

const parametersToShow = ['actorName', 'directedBy'];

const ListHeader = () => {
  const { filterParams } = useFilmsContext();

  const getTitle = (param: string) => {
    switch(param) {
      case 'actorName':
        return 'Actor:';
      case 'directedBy':
        return 'Directed by';
      default:
        return '';
    }
  }

  return (
    <div className="list-header">
      {parametersToShow.map((param) => filterParams[param] && (
        <div className="list-header-data" key={param}>
          <b>{getTitle(param)}</b> {filterParams[param]}
        </div>
      ))}
    </div>
  );
};

export default ListHeader;