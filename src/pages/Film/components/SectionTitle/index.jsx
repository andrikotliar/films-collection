import './styles.css';

const SectionTitle = ({ children, variant = 'main' }) => {
  return (
    <h2
      className={`section-title section-title-${variant}`}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;