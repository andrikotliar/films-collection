import { FC } from "react";
import SimpleValue from "@/pages/Info/components/SimpleValue";
import { isObject } from "@/pages/Info/helpers";
import SchemaBlockLayout from "@/pages/Info/components/SchemaBlockLayout";
import ArrayStringValue from "@/pages/Info/components/ArrayStringValue";

type ValueProps = {
  property: string;
  data: any;
};

const SchemaBlock: FC<ValueProps> = ({ property, data }) => {
  if(isObject(data)) {
    return (
      <SchemaBlockLayout label={property}>
        {Object.keys(data).map((key) => (
          <SchemaBlock property={key} data={data[key]} key={key} />
        ))}
      </SchemaBlockLayout>
    );
  };

  if(Array.isArray(data)) {
    return <ArrayStringValue label={property} value={data} />
  };

  return <SimpleValue property={property} value={data} />
};

export default SchemaBlock;