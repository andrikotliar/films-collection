import { FC, PropsWithChildren } from "react";

type SchemaBlockLayoutProps = {
  label?: string;
}

const SchemaBlockLayout: FC<PropsWithChildren<SchemaBlockLayoutProps>> = ({
  label,
  children
}) => {
  return (
    <div className="schema-block">
      <div className="schema-block__start-line">
        {label && <span className="schema-block__label">{label}:</span>}
        <span>&#123;</span>
      </div>
      {children}
      <div>&#125;,</div>
    </div>
  );
};

export default SchemaBlockLayout;