import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom";

test("Test Header to render left and right props", () => {
  render(
    <Header
      type="two"
      left={<div>Left Side</div>}
      right={<div>Right Side</div>}
    ></Header>
  );
  expect(screen.getByText("Left Side")).toBeDefined();
  expect(screen.getByText("Right Side")).toBeDefined();
});

test("Test Header to render left and right and center props", () => {
  render(
    <Header
      type="three"
      center={<div>Center</div>}
      left={<div>Left Side</div>}
      right={<div>Right Side</div>}
    ></Header>
  );
  expect(screen.getByText("Left Side")).toBeDefined();
  expect(screen.getByText("Right Side")).toBeDefined();
  expect(screen.getByText("Center")).toBeDefined();
});
