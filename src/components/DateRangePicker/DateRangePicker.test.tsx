import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DateRangePicker } from "./DateRangePicker";
import { expect, test } from "vitest";

test("allows keyboard-only date selection and navigation", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker />);

    // Focus the grid (container has tabindex=0)
    const grids = screen.getAllByRole("grid");
    const grid = grids[0];
    if (!grid) throw new Error("Grid not found");
    grid.focus();

    // Verify aria-activedescendant is present
    expect(grid.getAttribute("aria-activedescendant")).toBeTruthy();

    // Select Start (Enter)
    await user.keyboard("{Enter}");

    // Move 2 days right
    await user.keyboard("{ArrowRight}{ArrowRight}");

    // Select End
    await user.keyboard("{Enter}");

    // Check if TimeSelector appeared (implies selection made)
    const timeInputs = screen.getAllByRole("spinbutton");
    expect(timeInputs.length).toBeGreaterThan(0);
});

test.skip("PageUp/PageDown switches months", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker initialDate={new Date(2024, 0, 15)} />); // Jan 15 2024

    const grids = screen.getAllByRole("grid");
    const grid = grids[0];
    if (!grid) throw new Error("Grid not found");
    grid.focus();

    expect(screen.getAllByText(/January 2024/i).length).toBeGreaterThan(0);

    // Previous Month (Dec 2023)
    await user.keyboard("{PageUp}");
    await waitFor(() => {
        expect(screen.getAllByText(/December 2023/i).length).toBeGreaterThan(0);
    });

    // Next Month (Jan 2024)
    await user.keyboard("{PageDown}");
    await waitFor(() => {
        expect(screen.getAllByText(/January 2024/i).length).toBeGreaterThan(0);
    });
});

test("presets apply correctly", async () => {
    const user = userEvent.setup();
    render(<DateRangePicker />);

    const todayBtns = screen.getAllByRole("button", { name: "Today" });
    const todayBtn = todayBtns[0];
    if (!todayBtn) throw new Error("Today button not found");
    await user.click(todayBtn);

    // Should show time selector
    expect(screen.getAllByRole("spinbutton").length).toBeGreaterThan(0);
});
