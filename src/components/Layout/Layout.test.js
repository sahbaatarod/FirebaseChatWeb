import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import Header from "../Header/Header";
import { Provider } from "react-redux";
import store from "../../redux/store";
import "@testing-library/jest-dom";

test("Test Layout have Logo with text", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Layout title="Title"></Layout>
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText("Firebase Chat")).toBeInTheDocument();
});
