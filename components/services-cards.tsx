
import { HoverEffect } from "./ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Pre-Construction Advisory",
    description: `Feasibility Studies
Comparative Design Economies
Contractual Arrangements & Tender Procedures
Life Cycle Costing (Costs-in-Use)`,
    link: "/",
  },
  {
    title: "Design Stage",
    description: `Cost Analyses & Estimates
Budgeting & Cost Planning`,
    link: "/",
  },
  {
    title: "Documentation Phase",
    description: `Specifications & Schedules of Rates
Bills of Quantities
Dilapidation Reports`,
    link: "/",
  },
  {
    title: "Tender Process Support",
    description: `Tender Documentation & Procedures
Tender Evaluation & Recommendations`,
    link: "/",
  },
  {
    title: "Construction Phase",
    description: `Progress Measurements
Interim Valuations
Cash Flow Projections
Contractual Claims Advisory
Final Account Settlement`,
    link: "/",
  },
  {
    title: "Specialised Services",
    description: `Project Management
Value Engineering
Management Consulting
Training of Emerging Contractors`,
    link: "/",
  },
];
