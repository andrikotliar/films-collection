const PageTitle = ({ category, children }) => {
  return (
    <h1 className="page-title">
      {category} <span>{children}</span>
    </h1>
  );
};

export default PageTitle;
