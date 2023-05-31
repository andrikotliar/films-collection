import { getFilterParams } from "@/heplers";
import { UnknwonObject } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilter = (): [UnknwonObject, any] => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ filterParams, setFilterParams ] = useState<UnknwonObject>({});

  useEffect(() => {
    const filterParams = getFilterParams(searchParams);
    setFilterParams(filterParams);
  }, [searchParams]);

  return [ filterParams, setSearchParams ];
};