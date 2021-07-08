import React from "react";
import { render, screen } from "@testing-library/react";
import AddChat from "./AddChat";
import "@testing-library/jest-dom";

test("Render start a private chat", () => {
  render(<AddChat></AddChat>);
  expect(screen.getByText("+")).toBeInTheDocument();
});

test("Test start a private chat button to be fixed", () => {
  render(<AddChat></AddChat>);
  expect(screen.getByText("+")).toHaveStyle("position: fixed");
});
