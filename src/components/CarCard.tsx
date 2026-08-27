import { imageFor, priceFor } from "../data/cars";
import type { Car } from "../types";

type CarCardProps = { car: Car; onSelect: (car: Car) => void };

export function CarCard({ car, onSelect }: CarCardProps) {
  const { Make_Name: make, Model_Name: model, Model_Year: year = 2025, listingIndex } = car;

  return (
    <article className="car-card" style={{ animationDelay: `${listingIndex * 70}ms` }}>
      <div className="car-image" style={{ backgroundImage: `url("${imageFor(listingIndex)}")` }} role="img" aria-label={`${make} ${model}`} />
      <div className="car-info">
        <span className="car-year">{year} / {make}</span>
        <h3 className="car-name">{model}</h3>
        <div className="car-meta">
          <span>Available to explore</span>
          <span className="car-price">${priceFor(listingIndex).toLocaleString()}</span>
        </div>
        <button className="details-button" type="button" onClick={() => onSelect(car)}>View details</button>
      </div>
    </article>
  );
}
