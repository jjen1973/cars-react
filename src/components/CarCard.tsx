import type { KeyboardEvent } from "react";
import type { Car } from "../types";
import { formatPrice } from "../utils/formatters";

type CarCardProps = { car: Car; onSelect: (car: Car) => void };

export function CarCard({ car, onSelect }: CarCardProps) {
  const openWithKeyboard = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(car);
    }
  };

  return (
    <article
      className="car-card"
      style={{ animationDelay: `${car.listingIndex * 70}ms` }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${car.brand} ${car.title}`}
      onClick={() => onSelect(car)}
      onKeyDown={openWithKeyboard}
    >
      <div className="car-image" style={{ backgroundImage: `url("${car.displayImage}")` }} role="img" aria-label={`${car.brand} ${car.title}`}>
        <span className="car-details-cue" aria-hidden="true">More details <span>→</span></span>
      </div>
      <div className="car-info">
        <span className="car-year">{car.brand} / {car.availabilityStatus}</span>
        <h3 className="car-name">{car.title}</h3>
        <div className="car-meta">
          <span>{car.rating.toFixed(1)} / 5 rating</span>
          <span className="car-price">{formatPrice(car.price)}</span>
        </div>
        <span className="details-button">View details</span>
      </div>
    </article>
  );
}
