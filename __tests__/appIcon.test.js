import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GreenAppIcon from "../public/greenAppIcon.svg";

describe("GreenAppIcon Component", () => {
  it("renders the SVG component", () => {
    render(<GreenAppIcon />);

    // Check if the SVG element is in the document
    const svgElement = screen.getByTestId("svg-icon"); // Assuming you use data-testid="svg-icon" in the SVG
    expect(svgElement).toBeInTheDocument();
  });
});
