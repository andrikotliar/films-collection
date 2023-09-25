import './legend.css';
import { FC } from "react";
import { SubClassNamesEnum } from "@/pages/Film/components/BoxOffice/helpers";
import { LegendItem } from "../LegendItem";

type LegendProps = {
  hasBudget: boolean;
  hasBoxOffice: boolean;
  subClassName?: SubClassNamesEnum;
}

const Legend: FC<LegendProps> = ({
  hasBudget,
  hasBoxOffice,
  subClassName,
}) => {
  return (
    <div className="box-office-legend">
      {hasBudget && (
        <LegendItem type="Budget" />
      )}
      {hasBoxOffice && (
        <LegendItem
          type="Box Office"
          subClassName={subClassName}
        />
      )}
    </div>
  );
};

export { Legend };