import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { act } from "react-dom/test-utils";
import { buildCharacterMap } from "./utils/appUtils";

const addCharacters = async (count) => {
  for (let i = 1; i <= count; i++) {
    act(() => {
      userEvent.click(
        screen.getByRole("button", { name: "Add New Character" })
      );
    });

    await waitFor(() => {
      expect(screen.getByText(`Character: ${i}`)).toBeInTheDocument();
    });
  }
};

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ body: {} }),
    });
  });

  it("should render app properly", async () => {
    await act(async () => {
      render(<App />);
    });

    expect(
      screen.getByRole("button", { name: "Add New Character" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reset All Characters" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save All Characters" })
    ).toBeInTheDocument();
    expect(screen.getByText("Skill Section (PARTY MODE)")).toBeInTheDocument();
  });

  it("should add multiple characters", async () => {
    await act(async () => {
      render(<App />);
    });

    await addCharacters(3);
  });

  it("should reset all characters", async () => {
    await act(async () => {
      render(<App />);
    });

    await addCharacters(2);

    const increaseButtons = screen.getAllByRole("button", { name: "+" });

    act(() => {
      userEvent.click(increaseButtons[0]);
    });

    await waitFor(() => {
      expect(screen.getByText("Strength: 11(Modifier: 0)")).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(increaseButtons[0]);
    });

    await waitFor(() => {
      expect(screen.getByText("Strength: 12(Modifier: 1)")).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(
        screen.getByRole("button", { name: "Reset All Characters" })
      );
    });

    await waitFor(() => {
      expect(screen.getAllByText("Strength: 10(Modifier: 0)")).toHaveLength(2);
    });
  });

  it("should use character with highest points for Dexterirty in Skill Check Party MODE", async () => {
    await act(async () => {
      render(<App />);
    });

    await addCharacters(2);

    const increaseButtons = screen.getAllByRole("button", { name: "+" });

    act(() => {
      userEvent.click(increaseButtons[1]);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Dexterity: 11(Modifier: 0)")
      ).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(increaseButtons[1]);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Dexterity: 12(Modifier: 1)")
      ).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getAllByRole("button", { name: "Roll" })[0]);
    });

    await waitFor(() => {
      expect(screen.getByText("Skill: Acrobatics: 1")).toBeInTheDocument();
    });

    expect(screen.getAllByText("Character: 1")).toHaveLength(2);
  });

  it("should load saved characters", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ body: { 1: buildCharacterMap(1) } }),
    });

    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      expect(screen.getByText("Character: 1")).toBeInTheDocument();
    });
  });
});
