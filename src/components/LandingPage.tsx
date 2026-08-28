import { useState, type FormEvent } from "react";

type LandingPageProps = {
  onBrowse: (query: string) => void;
  onContact: () => void;
};

const highlights = [
  { value: "6", label: "Featured vehicles" },
  { value: "100%", label: "API-powered details" },
  { value: "Simple", label: "Search and compare" },
] as const;

export function LandingPage({ onBrowse, onContact }: LandingPageProps) {
  const [query, setQuery] = useState("");

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onBrowse(query.trim());
  };

  return (
    <main className="landing-page">
      <nav className="landing-nav shell" aria-label="Landing page navigation">
        <button className="landing-brand" type="button" aria-label="Better Used Cars home">
          <img src="/bus.png" alt="BUC Better Used Cars" />
        </button>
        <div className="landing-nav-actions">
          <button type="button" onClick={() => onBrowse("")}>Browse cars</button>
          <button className="landing-contact" type="button" onClick={onContact}>Contact</button>
        </div>
      </nav>

      <section className="landing-hero shell">
        <div className="landing-copy">
          <p className="landing-kicker">Better Used Cars · Drive smarter</p>
          <h1>Buy your next car with confidence.</h1>
          <p className="landing-intro">
            Search a focused collection of vehicles, compare prices, and open every card for the details that matter.
          </p>

          <form className="landing-search" role="search" onSubmit={submitSearch}>
            <label className="sr-only" htmlFor="landing-search-input">Search cars by make or model</label>
            <input
              id="landing-search-input"
              type="search"
              placeholder="Try Chrysler, Dodge, Charger..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <p className="landing-search-note">Press Enter or select Search to view matching cars.</p>

          <dl className="landing-highlights">
            {highlights.map(({ value, label }) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="landing-logo-stage" aria-hidden="true">
          <div className="logo-glow" />
          <img src="/bus.png" alt="" />
          <img className="dangle-keys" src="/buc-keys.png" alt="" />
        </div>
      </section>
    </main>
  );
}
