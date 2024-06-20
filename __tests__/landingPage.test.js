import React from "react";
import { render, screen } from "@testing-library/react";
import LandingPage from "@/app/page";
import renderer from "react-test-renderer";

describe("LandingPage Component", () => {
  test("renders the LandingPage correctly", () => {
    render(<LandingPage />);

    // Check if the header component is rendered
    expect(screen.getByRole("banner")).toBeInTheDocument();

    // Check if the main content is rendered
    expect(screen.getByRole("main")).toBeInTheDocument();

    // Verify the hero section content
    expect(
      screen.getByText(
        /GreenApp is the best way to earn rewards while saving the planet/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /We’re dedicated to helping you earn rewards while saving the planet/i
      )
    ).toBeInTheDocument();

    // Check for "Get started" button
    const getStartedButton = screen.getByRole("link", { name: /Get started/i });
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton).toHaveAttribute("href", "/login");

    // Check for "Learn more" link
    const learnMoreLink = screen.getByRole("link", { name: /Learn more/i });
    expect(learnMoreLink).toBeInTheDocument();
    expect(learnMoreLink).toHaveAttribute("href", "/features");

    // Check if the footer component is rendered
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();

    // Verify newsletter section
    expect(
      screen.getByText(/Get the latest updates in your inbox/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter your email/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Notify me/i })
    ).toBeInTheDocument();
  });

  test("matches the snapshot", () => {
    const component = renderer.create(<LandingPage />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
