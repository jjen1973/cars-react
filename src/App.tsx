import { useMemo, useState } from "react";
import { CarDetailsModal } from "./components/CarDetailsModal";
import { CarGrid } from "./components/CarGrid";
import { ContactModal } from "./components/ContactModal";
import { Header } from "./components/Header";
import { LandingPage } from "./components/LandingPage";
import { CAR_PRICE_STEP, DISPLAY_CAR_COUNT, MAX_CAR_PRICE, MIN_CAR_PRICE } from "./data/cars";
import { useCars } from "./hooks/useCars";
import type { Car } from "./types";
import { formatPrice } from "./utils/formatters";

type Page = "landing" | "catalog";

function getCatalogStatus(isLoading: boolean, errorMessage: string | null, query: string) {
  if (isLoading) return "Loading vehicles from DummyJSON...";
  if (errorMessage) return errorMessage;
  if (query) return `Showing matching results for "${query}".`;
  return `Showing exactly ${DISPLAY_CAR_COUNT} vehicle cards fetched from DummyJSON.`;
}

export default function App() {
  const { cars, errorMessage, isLoading } = useCars();
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(MAX_CAR_PRICE);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [page, setPage] = useState<Page>("landing");

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

  const trimmedQuery = query.trim();
  const status = getCatalogStatus(isLoading, errorMessage, trimmedQuery);

  const openContact = () => {
    setSelectedCar(null);
    setContactOpen(true);
  };

  const browseCars = (landingQuery: string) => {
    setQuery(landingQuery);
    setPage("catalog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {page === "landing" ? (
        <LandingPage onBrowse={browseCars} onContact={openContact} />
      ) : (
        <>
          <Header
            query={query}
            setQuery={setQuery}
            onContact={openContact}
            onHome={() => setPage("landing")}
            onSearch={() => document.querySelector("#cars")?.scrollIntoView({ behavior: "smooth" })}
          />
          <main id="cars">
            <section className="results shell">
              <div className="results-heading">
                <div>
                  <p className="eyebrow dark">Live vehicle data</p>
                  <h2>
                    Search results <span className="result-count">({isLoading ? DISPLAY_CAR_COUNT : filteredCars.length})</span>
                  </h2>
                </div>
                <div className="price-filter">
                  <div className="filter-label">
                    <span>Price range</span>
                    <strong>{formatPrice(MIN_CAR_PRICE)} to {formatPrice(maxPrice)}</strong>
                  </div>
                  <input
                    type="range"
                    min={MIN_CAR_PRICE}
                    max={MAX_CAR_PRICE}
                    value={maxPrice}
                    step={CAR_PRICE_STEP}
                    aria-label="Maximum price"
                    onChange={(event) => setMaxPrice(Number(event.target.value))}
                  />
                  <div className="range-labels">
                    <span>$20k</span>
                    <span>$100k</span>
                  </div>
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
        </>
      )}
      {selectedCar ? <CarDetailsModal car={selectedCar} onClose={() => setSelectedCar(null)} onContact={openContact} /> : null}
      {contactOpen ? <ContactModal onClose={() => setContactOpen(false)} /> : null}
    </>
  );
}
