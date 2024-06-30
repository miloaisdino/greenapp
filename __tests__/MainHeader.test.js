import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import MainHeader from "@/app/component/mainHeader";

describe("MainHeader Component", () => {
  it("renders the MainHeader component correctly", () => {
    render(<MainHeader />);

    // Check if the SVG element (logo) is present in the document using data-testid
    const logo = screen.getByTestId("GreenAppIcon");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass("h-16 w-32");

    // Check if navigation links are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Rewards")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();

    // Check if the login link is rendered
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  it("opens and closes the mobile menu", () => {
    render(<MainHeader />);

    // Open mobile menu
    const openMenuButton = screen.getByRole("button", {
      name: "Open main menu",
    });
    fireEvent.click(openMenuButton);

    // Check if the menu opens
    const closeMenuButton = screen.getByRole("button", { name: "Close menu" });
    expect(closeMenuButton).toBeInTheDocument();

    // Check if mobile menu navigation links are rendered
    const homeLinks = screen.getAllByText("Home");
    expect(homeLinks.length).toBeGreaterThan(1);
    homeLinks.forEach((link) => expect(link).toBeVisible());

    // Close mobile menu
    fireEvent.click(closeMenuButton);
  });
});
