import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Test123 from "@/app/component/test123";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Test123 />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
