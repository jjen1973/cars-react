import { CarCard } from "./CarCard";
import { DISPLAY_CAR_COUNT } from "../data/cars";
import type { Car } from "../types";

type CarGridProps = { cars: Car[]; isLoading: boolean; onSelect: (car: Car) => void };

export function CarGrid({ cars, isLoading, onSelect }: CarGridProps) {
  if (isLoading) {
    return (
      <div className="car-grid" aria-busy="true" aria-label="Loading vehicles">
        {Array.from({ length: DISPLAY_CAR_COUNT }, (_, index) => (
          <article className="car-card skeleton-card" key={index} style={{ animationDelay: `${index * 70}ms` }}>
            <div className="skeleton-block skeleton-image" />
            <div className="car-info">
              <div className="skeleton-block skeleton-year" />
              <div className="skeleton-block skeleton-title" />
              <div className="skeleton-block skeleton-meta" />
              <div className="skeleton-block skeleton-button" />
            </div>
          </article>
        ))}
      </div>
    );
  }

  return cars.length > 0 ? (
    <div className="car-grid" aria-live="polite">
      {cars.map((car) => <CarCard key={car.listingKey} car={car} onSelect={onSelect} />)}
    </div>
  ) : (
    <p className="empty-state">No cars match that search.</p>
  );
}
