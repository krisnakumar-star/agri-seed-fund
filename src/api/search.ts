// src/api/search.ts

export interface LandFilter {
  landType?: string;
  location?: string;
  investmentRange?: string;
}

export interface Land {
  id: number;
  name: string;
  location: string;
  type: string;
  investmentRange: string;
}

export const searchLands = async (filters: LandFilter): Promise<Land[]> => {
  const lands: Land[] = [
    { id: 1, name: "Farm 1", location: "Punjab", type: "Vegetable Farming", investmentRange: "1-5" },
    { id: 2, name: "Farm 2", location: "Maharashtra", type: "Fruit Orchard", investmentRange: "5-10" },
    { id: 3, name: "Farm 3", location: "Punjab", type: "Crop Farming", investmentRange: "1-5" },
  ];

  return lands.filter((land) => {
    return (
      (!filters.landType || land.type === filters.landType) &&
      (!filters.location || land.location === filters.location) &&
      (!filters.investmentRange || land.investmentRange === filters.investmentRange)
    );
  });
};
