import { imageFor, priceFor } from "../data/cars";
import type { Car } from "../types";
import { Modal } from "./Modal";

type Props = { car: Car; onClose: () => void; onContact: () => void };

export function CarDetailsModal({ car, onClose, onContact }: Props) {
  const details = [
    ["Make", car.Make_Name],
    ["Model year", String(car.Model_Year ?? 2025)],
    ["Estimated price", `$${priceFor(car.listingIndex).toLocaleString()}`],
    ["Availability", "Available to explore"],
  ];

  return (
    <Modal ariaLabelledBy="details-title" className="details-card" onClose={onClose}>
      <div className="details-image" style={{ backgroundImage: `url("${imageFor(car.listingIndex)}")` }} />
      <div className="details-content">
        <p className="eyebrow dark">Vehicle details</p>
        <h2 id="details-title">{car.Model_Name}</h2>
        <dl className="details-list">
          {details.map(([label, value]) => (
            <div className="detail-row" key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
        <button className="details-contact" type="button" onClick={onContact}>Ask about this car</button>
      </div>
    </Modal>
  );
}
