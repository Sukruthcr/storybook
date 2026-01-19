export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "var(--bg)",
                fg: "var(--fg)",
                accent: "var(--accent)",
            },
            borderRadius: {
                md: "var(--radius)",
            },
        },
    },
};
