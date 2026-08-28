import type { Car } from "../types";
import { formatPrice } from "../utils/formatters";
import { Modal } from "./Modal";

type Props = { car: Car; onClose: () => void; onContact: () => void };

export function CarDetailsModal({ car, onClose, onContact }: Props) {
  const details: Array<[string, string]> = [
    ["Make", car.brand],
    ["Price", formatPrice(car.price)],
    ["Rating", `${car.rating.toFixed(1)} / 5`],
    ["Availability", car.availabilityStatus],
    ["Units in stock", car.stock.toString()],
    ["Warranty", car.warrantyInformation],
    ["Shipping", car.shippingInformation],
    ["Return policy", car.returnPolicy],
    ["SKU", car.sku],
    ["Weight", car.weight.toString()],
  ];

  return (
    <Modal ariaLabelledBy="details-title" className="details-card" onClose={onClose}>
      <div className="details-image" style={{ backgroundImage: `url("${car.displayImage}")` }} role="img" aria-label={`${car.brand} ${car.title}`} />
      <div className="details-content">
        <p className="eyebrow dark">Vehicle details</p>
        <h2 id="details-title">{car.title}</h2>
        <p className="details-description">{car.description}</p>
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
