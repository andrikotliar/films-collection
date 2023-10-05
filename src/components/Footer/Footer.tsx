import { GithubIcon } from '@/assets/icons';
import './footer.css';
import { FooterLogo, TmdbLogo } from "@/assets/logos";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <FooterLogo className="footer__fc-logo" />
        <div className="footer__source">
          <GithubIcon className="footer__source-icon" />
          <span>Source code</span>
        </div>
        <div className="footer__column">
          <span>Actor photos provided by</span>
          <TmdbLogo className="footer__tmdb-logo" />
        </div>
      </div>
    </footer>
  );
};

export { Footer };