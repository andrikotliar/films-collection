import './styles.css';
import { FC } from "react";
import { UnknownObject } from "@/types";
import SchemaBlockLayout from '@/pages/Info/components/SchemaBlockLayout';
import SchemaBlock from '@/pages/Info/components/SchemaBlock';

const SchemaViewer: FC<{ schema: UnknownObject }> = ({ schema }) => {
  return (
    <SchemaBlockLayout>
      {Object.keys(schema).map((key) => (
        <SchemaBlock property={key} data={schema[key]} key={key} />
      ))}
    </SchemaBlockLayout>
  );
};

export default SchemaViewer;