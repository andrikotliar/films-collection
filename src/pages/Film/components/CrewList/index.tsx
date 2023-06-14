import { FC } from "react";
import CrewItem from "@/pages/Film/components/CrewItem";
import { Crew } from "@/types";

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