import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, model, year, fuel } = filters;

  const headers = {
    'X-RapidAPI-Key': '3dbf7308admsha8aa80cd8d747e1p1db607jsn96cb4d31c583',
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  // Construim URL-ul cu parametri dinamici
  const url = new URL("https://cars-by-api-ninjas.p.rapidapi.com/v1/cars");
  
  if (manufacturer) url.searchParams.append("make", manufacturer);
  if (model) url.searchParams.append("model", model);
  if (year) url.searchParams.append("year", year.toString());
  if (fuel) url.searchParams.append("fuel_type", fuel);

  const response = await fetch(url.toString(), {
    headers: headers,
  });

  console.log("URL FETCH:", response.url);
  console.log("RESPONSE STATUS:", response.status);
  const result = await response.json();
  console.log("RESULT:", result);

  return result;
}

export const calculateCarRent = (year: number, cylinders: number, displacement: number) => {
  const basePricePerDay = 50;
  const cylinderFactor = 2.5;
  const displacementFactor = 3.5;
  const ageFactor = 0.1; 

  const ageRate = (new Date().getFullYear() - year) * ageFactor;
  const cylinderRate = cylinders * cylinderFactor;
  const displacementRate = displacement * displacementFactor;

  const rentalRatePerDay = basePricePerDay + cylinderRate + displacementRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append("customer", "img");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  if (angle) url.searchParams.append("angle", angle);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  return `${window.location.pathname}?${searchParams.toString()}`;
}