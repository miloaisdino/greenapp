// LandingPage.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import LandingPage from "@/app/page";

// Mock components if necessary (you can skip this if you don't need to mock MainHeader and MainFooter)
jest.mock("@/app/component/mainHeader", () => () => <div>Main Header</div>);
jest.mock("@/app/component/mainFooter", () => () => <div>Main Footer</div>);

describe("LandingPage", () => {
  test("renders LandingPage with main sections and elements", () => {
    render(<LandingPage />);

    // Check for the main header
    expect(screen.getByText(/Main Header/i)).toBeInTheDocument();

    // Check for the hero section heading
    expect(
      screen.getByText(
        /GreenApp is the best way to earn rewards while saving the planet./i
      )
    ).toBeInTheDocument();

    // Check for the hero section paragraph
    expect(
      screen.getByText(
        /We’re dedicated to helping you earn rewards while saving the planet./i
      )
    ).toBeInTheDocument();

    // Check for the 'Get started' button
    const getStartedButton = screen.getByRole("link", { name: /Get started/i });
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton).toHaveAttribute("href", "/login");

    // Check for the 'Learn more' link
    const learnMoreLink = screen.getByRole("link", { name: /Learn more/i });
    expect(learnMoreLink).toBeInTheDocument();
    expect(learnMoreLink).toHaveAttribute("href", "/features");

    // Check for the newsletter section
    expect(
      screen.getByText(/Get the latest updates in your inbox./i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter your email/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Notify me/i })
    ).toBeInTheDocument();

    // Check for the main footer
    expect(screen.getByText(/Main Footer/i)).toBeInTheDocument();
  });

  test("renders SVG elements correctly", () => {
    render(<LandingPage />);

    // Check for the presence of SVG in the hero section
    const heroSvg = screen.getAllByRole("img", { hidden: true });
    expect(heroSvg.length).toBeGreaterThan(0);

    // Check for the presence of the background SVG in the newsletter section
    const newsletterSvg = screen.getByLabelText("App screenshot");
    expect(newsletterSvg).toBeInTheDocument();
  });

  // Add more tests as needed for additional functionality and UI elements.
});
