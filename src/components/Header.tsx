import { useState, type FormEvent } from "react";

const links: ReadonlyArray<{ label: string; href: string; className?: string }> = [
  { label: "Home", href: "#top" },
  { label: "Find your car", href: "#search-form", className: "active" },
];

type HeaderProps = {
  onContact: () => void;
  onSearch: () => void;
  query: string;
  setQuery: (value: string) => void;
};

export function Header({ onContact, onSearch, query, setQuery }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <header className="hero">
      <nav className={`nav shell${menuOpen ? " menu-open" : ""}`} aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="bus home" onClick={closeMenu}>
          <img className="brand-mark" src="/bus.png" alt="" />
        </a>
        <div className={`nav-links${menuOpen ? " is-open" : ""}`}>
          {links.map((link) => (
            <a key={link.href} className={link.className} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
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
