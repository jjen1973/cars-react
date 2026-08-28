import { useEffect, useState } from "react";
import { API_PRODUCT_COUNT, API_URL } from "../data/cars";
import type { Car } from "../types";

type ApiCar = Omit<Car, "listingIndex" | "listingKey" | "displayImage">;
type ApiResponse = { products: ApiCar[] };

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCars() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error("API request failed");

        const { products } = (await response.json()) as ApiResponse;
        if (products.length !== API_PRODUCT_COUNT || !products[0]?.images[1]) {
          throw new Error("Unexpected vehicle response");
        }

        const displayCars = [
          ...products.map((car) => ({ ...car, displayImage: car.thumbnail })),
          { ...products[0], displayImage: products[0].images[1] },
        ].map((car, listingIndex) => ({
          ...car,
          listingIndex,
          listingKey: `${car.id}-${listingIndex}`,
        }));

        setCars(displayCars);
        setErrorMessage(null);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setCars([]);
        setErrorMessage("Vehicle data is temporarily unavailable. Please try again.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadCars();
    return () => controller.abort();
  }, []);

  return { cars, errorMessage, isLoading };
}
