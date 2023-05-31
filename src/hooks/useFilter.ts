import { getFilterParams } from "@/heplers";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilter = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ filterParams, setFilterParams ] = useState({});

  useEffect(() => {
    const filterParams = getFilterParams(searchParams);
    setFilterParams(filterParams);
  }, [searchParams]);

  return [ filterParams, setSearchParams ];
};