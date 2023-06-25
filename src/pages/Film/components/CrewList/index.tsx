import { FC } from "react";
import { Crew } from "@/types";
import CrewItem from "./components/CrewItem";

const CrewList: FC<{ crew: Crew[] }> = ({ crew }) => {
  return (
    <div className="crew">
      {crew.map((crewItem) => (
        <CrewItem crewItem={crewItem} key={crewItem.role} />
      ))}
    </div>
  );
};

export default CrewList;