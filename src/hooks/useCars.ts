import { useEffect, useState } from "react";
import { API_URL, fallbackCars } from "../data/cars";
import type { Car } from "../types";

type ApiCar = Omit<Car, "listingIndex">;

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [status, setStatus] = useState("Loading live models from NHTSA...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCars() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error("API request failed");

        const data = (await response.json()) as { Results: ApiCar[] };
        setCars(
          data.Results.slice(0, 6).map((car, listingIndex) => ({
            ...car,
            listingIndex,
          })),
        );
        setStatus("Showing 6 models pulled live from the NHTSA vehicle API.");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setCars(fallbackCars);
        setStatus("Showing six sample models while the vehicle API is unavailable.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadCars();
    return () => controller.abort();
  }, []);

  return { cars, isLoading, status, setStatus };
}
