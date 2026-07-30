import type { FC } from 'react';
import { BookOpen, Github } from 'lucide-react';

const Navbar: FC = () => (
  <nav className="navbar" role="banner">
    <div className="container navbar-inner">
      <div className="navbar-brand">
        <div className="navbar-logo">
          <BookOpen size={22} aria-hidden="true" />
        </div>
        <div>
          <h1 className="navbar-title">Project Report Generator</h1>
          <p className="navbar-subtitle">AI-Powered Academic Report Writing</p>
        </div>
      </div>
      <a
        href="https://github.com/atharv01h/college-project-report-generator"
        target="_blank"
        rel="noopener noreferrer"
        className="navbar-link"
        aria-label="View source code on GitHub"
      >
        <Github size={18} aria-hidden="true" />
        <span>GitHub</span>
      </a>
    </div>
  </nav>
);

export default Navbar;
