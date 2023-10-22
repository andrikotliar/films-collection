import { useEffect, useState } from 'react';
import { LinkProps, useLocation } from 'react-router-dom';

const useHomeUrl = () => {
  const [url, setUrl] = useState<LinkProps['to']>({
    pathname: '/',
  });
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setUrl({
        pathname: '/',
        search: location.search,
      });
    } else {
      setUrl({
        pathname: '/',
      });
    }
  }, [location]);

  return url;
};

export { useHomeUrl };
