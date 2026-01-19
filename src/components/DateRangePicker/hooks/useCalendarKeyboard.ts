import React from "react";
import { moveDate, addMonths, startOfWeek, endOfWeek } from "../utils/date";

export function useCalendarKeyboard(
    focused: Date,
    setFocused: (d: Date) => void,
    onSelect: (d: Date) => void
) {
    function onKeyDown(e: React.KeyboardEvent) {
        switch (e.key) {
            case "ArrowLeft":
                e.preventDefault();
                setFocused(moveDate(focused, -1));
                break;
            case "ArrowRight":
                e.preventDefault();
                setFocused(moveDate(focused, 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                setFocused(moveDate(focused, -7));
                break;
            case "ArrowDown":
                e.preventDefault();
                setFocused(moveDate(focused, 7));
                break;
            case "PageUp":
                e.preventDefault();
                setFocused(addMonths(focused, -1));
                break;
            case "PageDown":
                e.preventDefault();
                setFocused(addMonths(focused, 1));
                break;
            case "Home":
                e.preventDefault();
                setFocused(startOfWeek(focused));
                break;
            case "End":
                e.preventDefault();
                setFocused(endOfWeek(focused));
                break;
            case "Enter":
                e.preventDefault();
                onSelect(focused);
                break;
            case "Escape":
                // If focus is on the container (aria-activedescendant), blur might be useful
                // but usually we just close a popup. Here we just blur.
                (e.target as HTMLElement).blur();
                break;
        }
    }

    return { onKeyDown };
}
