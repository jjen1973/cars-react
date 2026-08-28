import { useState, type FormEvent } from "react";

type HeaderProps = {
  onContact: () => void;
  onHome: () => void;
  onSearch: () => void;
  query: string;
  setQuery: (value: string) => void;
};

export function Header({ onContact, onHome, onSearch, query, setQuery }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <header className="hero">
      <nav className={`nav shell${menuOpen ? " menu-open" : ""}`} aria-label="Main navigation">
        <button className="brand brand-button" type="button" aria-label="Better Used Cars home" onClick={() => { closeMenu(); onHome(); }}>
          <img className="brand-mark" src="/bus.png" alt="" />
        </button>
        <div className={`nav-links${menuOpen ? " is-open" : ""}`}>
          <button type="button" onClick={() => { closeMenu(); onHome(); }}>Home</button>
          <a className="active" href="#search-form" onClick={closeMenu}>Find your car</a>
          <button className="contact" type="button" onClick={() => { closeMenu(); onContact(); }}>
            Contact
          </button>
        </div>
        <button
          className="menu-button"
          type="button"
          aria-label={`${menuOpen ? "Close" : "Open"} menu`}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>
      </nav>
      <div className="hero-content shell" id="top">
        <p className="eyebrow">A better way to find your drive</p>
        <h1>Browse our cars</h1>
        <p className="hero-copy">Explore standout models, all in one place.</p>
        <form className="search" id="search-form" onSubmit={submitSearch}>
          <label className="sr-only" htmlFor="search-input">Search by make or model</label>
          <input
            id="search-input"
            type="search"
            placeholder="Search by make, model or keyword"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" aria-label="Search">&#8594;</button>
        </form>
      </div>
    </header>
  );
}
