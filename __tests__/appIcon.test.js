import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GreenAppIconWrapper from "@/app/component/GreenAppIconWrapper";

describe("GreenAppIcon Component", () => {
  it("renders the SVG component", () => {
    // Render the wrapped SVG component
    render(<GreenAppIconWrapper />);

    // Check if the SVG element is in the document
    const svgElement = screen.getByTestId("GreenAppIcon");
    expect(svgElement).toBeInTheDocument();
  });
});
