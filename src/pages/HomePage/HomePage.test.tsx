import { HomePage } from "./HomePage";
import { BrowserRouter } from "react-router-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";

jest.mock("websocket");

describe("renders <HomePage/>", () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  describe("logs in", () => {
    const username = screen.getByPlaceholderText("Username");
    fireEvent.change(username, { target: { value: "test" } });
    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);
    const welcomeMessage = screen.getByText("Welcome test!");
    expect(welcomeMessage).toBeInTheDocument();

    it("displays resolve message on click of the resolve button", async () => {
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const resolveButton = screen.getByText("Resolve");
        fireEvent.click(resolveButton);
        const resolvedMessage = screen.getByText("Issue resolved");
        expect(resolvedMessage).toBeInTheDocument();
      });
    }, 6000);
  });
});
