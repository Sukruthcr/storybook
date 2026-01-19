import React from "react";

export function useKeyboardNavigation(
    onMove: (days: number) => void,
    onSelect: () => void
) {
    function handleKey(e: React.KeyboardEvent) {
        switch (e.key) {
            case "ArrowLeft":
                e.preventDefault();
                onMove(-1);
                break;
            case "ArrowRight":
                e.preventDefault();
                onMove(1);
                break;
            case "ArrowUp":
                e.preventDefault();
                onMove(-7);
                break;
            case "ArrowDown":
                e.preventDefault();
                onMove(7);
                break;
            case "Enter":
                e.preventDefault();
                onSelect();
                break;
        }
    }

    return { handleKey };
}
