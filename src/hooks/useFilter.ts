import { getFilterParams } from "@/heplers";
import { UnknownObject } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilter = (): [UnknownObject, any] => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ filterParams, setFilterParams ] = useState<UnknownObject>({});

  useEffect(() => {
    const filterParams = getFilterParams(searchParams);
    setFilterParams(filterParams);
  }, [searchParams]);

  return [ filterParams, setSearchParams ];
};