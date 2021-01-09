import './styles.css';
import { ReactComponent as GithubIcon } from './github.svg';
import { ReactComponent as FacebookIcon } from './facebook.svg';
import { ReactComponent as InstagramIcon } from './instagram.svg';

function Footer() {
  return (
    <footer className="main-footer">
      App desenvolvido durante a 2ª ed. do evento Semana DevSuperior
      <div className="footer-icons">

        <a href="https://github.com/beatrizalvesfel" target="_new">
          <GithubIcon />
        </a>

        <a href="https://www.facebook.com/ouroborosdesign.uno" target="_new">
          <FacebookIcon />
        </a>

        <a href="https://www.instagram.com/ouroborosdesign_/" target="_new">
          <InstagramIcon />
        </a>

      </div>
    </footer>
  );
}

export default Footer;
