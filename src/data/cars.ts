import type { Car } from "../types";

export const API_URL =
  "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/toyota?format=json";

export const fallbackCars: Car[] = [
  "Camry",
  "Corolla",
  "RAV4",
  "Tacoma",
  "Prius",
  "Highlander",
].map((model, listingIndex) => ({
  Make_Name: "Toyota",
  Model_Name: model,
  Model_Year: 2025,
  listingIndex,
}));

export const imageUrls = [
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80",
] as const;

export const priceFor = (index: number) => 28_900 + index * 9_200;

export const imageFor = (index: number) => imageUrls[index % imageUrls.length];
