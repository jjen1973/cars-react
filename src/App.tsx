import { useMemo, useState } from "react";
import { CarDetailsModal } from "./components/CarDetailsModal";
import { CarGrid } from "./components/CarGrid";
import { ContactModal } from "./components/ContactModal";
import { Header } from "./components/Header";
import { useCars } from "./hooks/useCars";
import type { Car } from "./types";

export default function App() {
  const { cars, isLoading, status, setStatus } = useCars();
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(100_000);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  const filteredCars = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const priceQuery = normalizedQuery.replace(/[$,\s]/g, "");

    return cars.filter((car) => {
      const nameMatches = `${car.brand} ${car.title} ${car.description}`
        .toLowerCase()
        .includes(normalizedQuery);
      const priceMatches = priceQuery.length > 0 && String(car.price).includes(priceQuery);
      return (nameMatches || priceMatches) && car.price <= maxPrice;
    });
  }, [cars, maxPrice, query]);

  const updateQuery = (value: string) => {
    setQuery(value);
    const trimmed = value.trim();
    setStatus(trimmed
      ? `Showing matching results for "${trimmed}".`
      : "Showing vehicle results from the DummyJSON API.");
  };

  const openContact = () => {
    setSelectedCar(null);
    setContactOpen(true);
  };

  return (
    <>
      <Header query={query} setQuery={updateQuery} onContact={openContact} onSearch={() => document.querySelector("#cars")?.scrollIntoView({ behavior: "smooth" })} />
      <main id="cars">
        <section className="results shell">
          <div className="results-heading">
            <div>
              <p className="eyebrow dark">Live vehicle data</p>
              <h2>Search results <span className="result-count">({isLoading ? 6 : filteredCars.length})</span></h2>
            </div>
            <div className="price-filter">
              <div className="filter-label"><span>Price range</span><strong>$20,000 to ${maxPrice.toLocaleString()}</strong></div>
              <input type="range" min="20000" max="100000" value={maxPrice} step="5000" aria-label="Maximum price" onChange={(event) => setMaxPrice(Number(event.target.value))} />
              <div className="range-labels"><span>$20k</span><span>$100k</span></div>
            </div>
          </div>
          <p className="api-status" aria-live="polite">{status}</p>
          <CarGrid cars={filteredCars} isLoading={isLoading} onSelect={setSelectedCar} />
        </section>
      </main>
      <footer className="footer">
        <div className="shell footer-inner">
          <div><img className="brand-mark" src="/bus.png" alt="" /><p>Find something worth driving.</p></div>
        </div>
      </footer>
      {selectedCar ? <CarDetailsModal car={selectedCar} onClose={() => setSelectedCar(null)} onContact={openContact} /> : null}
      {contactOpen ? <ContactModal onClose={() => setContactOpen(false)} /> : null}
    </>
  );
}
