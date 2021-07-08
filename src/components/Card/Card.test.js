import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card";
import "@testing-library/jest-dom";

test("Test Card to render children passed in", () => {
  render(
    <Card>
      <div>Hello</div>
    </Card>
  );
  expect(screen.getByText("Hello")).toBeDefined();
});

test("Test Card to have custom border radius", () => {
  render(<Card borderRadius="5px">Hello</Card>);
  expect(screen.getByText("Hello")).toHaveStyle("borderRadius: 5px");
});

test("Test Card to have a className of hover", () => {
  render(<Card hoverAnim>Hello</Card>);
  expect(screen.getByText("Hello")).toHaveClass("hover");
});
