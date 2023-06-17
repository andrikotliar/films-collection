import './styles.css';
import { useFilmsContext } from "@/context/FilmsContext";
import { UnknownObject } from "@/types";

const parametersToHide = ['actorId', 'page'];

const ListHeader = () => {
  const { filterParams } = useFilmsContext();

  const keys = Object.keys(filterParams);

  const filteredParams = (keys: string[]) => {
    return keys.filter((key) => !parametersToHide.includes(key))
  }

  if(filteredParams(keys).length === 0) return null;

  const getValue = (filterParams: UnknownObject, param: string) => {
    if(param === 'crew') {
      const parsedData = JSON.parse(filterParams[param]);
      return Object.values(parsedData).join(', ');
    }

    if(Array.isArray(filterParams[param])) {
      return filterParams[param].join(', ');
    }

    return filterParams[param];
  }

  const getTitle = (param: string) => {
    switch(param) {
      case 'actorName':
        return 'Actor';
      case 'crew':
        const parsedData = JSON.parse(filterParams[param]);
        const keys = Object.keys(parsedData);
        return keys[0];
      case 'search':
        return 'Search string'
      default:
        return param[0].toUpperCase() + param.slice(1);
    }
  }

  return (
    <div className="selected-filters">
      {filteredParams(keys).map((param) =>  (
        <div className="selected-filters__item" key={param}>
          <b>{getTitle(param)}:</b>
          <span>
            {getValue(filterParams, param)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ListHeader;