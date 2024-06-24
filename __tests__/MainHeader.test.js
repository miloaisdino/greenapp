// MainHeader.test.js
import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MainHeader from "@/app/component/mainHeader";

// Mock the SVG and icon components to avoid rendering issues during tests
jest.mock("@/public/greenAppIcon.svg", () => () => <div>Mocked Icon</div>);
jest.mock("@heroicons/react/24/outline", () => ({
  Bars3Icon: () => <div>Bars3Icon</div>,
  XMarkIcon: () => <div>XMarkIcon</div>,
}));

describe("MainHeader", () => {
  test("renders the main header with navigation links", () => {
    render(<MainHeader />);

    // Check for navigation links
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Rewards")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  test("renders the mobile menu button and opens/closes the menu", () => {
    render(<MainHeader />);

    // Check that the mobile menu button is rendered
    const openButton = screen.getByRole("button", { name: /open main menu/i });
    expect(openButton).toBeInTheDocument();

    // Simulate clicking the mobile menu button to open the menu
    fireEvent.click(openButton);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Check that the menu items are present in the opened menu
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Rewards")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();

    // Simulate clicking the close button to close the menu
    const closeButton = screen.getByRole("button", { name: /close menu/i });
    fireEvent.click(closeButton);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("renders the desktop navigation when not in mobile view", () => {
    // Render the component
    render(<MainHeader />);

    // Check for desktop navigation links
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Rewards")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();

    // Check that the mobile menu button is not visible in the desktop view
    expect(
      screen.queryByRole("button", { name: /open main menu/i })
    ).not.toBeInTheDocument();
  });
});
