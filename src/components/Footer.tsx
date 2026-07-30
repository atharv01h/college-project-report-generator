import type { FC } from 'react';
import { Instagram, Github, Heart } from 'lucide-react';

const Footer: FC = () => (
  <footer className="footer" role="contentinfo">
    <div className="container footer-inner">
      <div className="footer-credit">
        <span>Made with</span>
        <Heart size={14} className="footer-heart" aria-hidden="true" />
        <span>by</span>
        <strong>Atharv Hatwar</strong>
      </div>
      <div className="footer-links">
        <a
          href="https://www.instagram.com/atharv_hatwar/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          aria-label="Follow on Instagram"
        >
          <Instagram size={16} aria-hidden="true" />
          <span>Instagram</span>
        </a>
        <a
          href="https://github.com/atharv01h"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          aria-label="View GitHub profile"
        >
          <Github size={16} aria-hidden="true" />
          <span>GitHub</span>
        </a>
      </div>
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} Atharv Hatwar &mdash; MIT License
      </p>
    </div>
  </footer>
);

export default Footer;
