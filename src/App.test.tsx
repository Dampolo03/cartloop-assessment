import App from "./App";
import { render, screen } from "@testing-library/react";

jest.mock("websocket");

test("renders <App/>", () => {
  render(<App />);

  const welcomeText = screen.getByText("Hi! Welcome to Cartloop.");
  expect(welcomeText).toBeInTheDocument();
});
