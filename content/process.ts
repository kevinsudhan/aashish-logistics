export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Plan",
    description: "Cargo requirements and route planning",
  },
  {
    index: "02",
    title: "Consolidate",
    description: "Cargo preparation and consolidation",
  },
  {
    index: "03",
    title: "Move",
    description: "Ocean, air, road or multimodal transportation",
  },
  {
    index: "04",
    title: "Clear",
    description: "Customs and documentation",
  },
  {
    index: "05",
    title: "Deliver",
    description: "Final-mile delivery and destination handling",
  },
];
