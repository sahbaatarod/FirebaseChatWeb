import React from "react";
import { render, screen } from "@testing-library/react";
import Ads from "./Ads";
import "@testing-library/jest-dom";

test("Render Google Ads", () => {
  render(<Ads></Ads>);
  expect(screen.getByText("Ads by Google")).toBeInTheDocument();
});

test("Google ads color to be grey", () => {
  render(<Ads></Ads>);
  expect(screen.getByText("Ads by Google")).toHaveStyle("color: grey");
});
