# Date Range Picker

A robust, accessible Date Range Picker component built with React, TypeScript, and Tailwind CSS.

## Features

- **Range Selection**: Click a start date, then an end date. Supports standard ranges and "blackout" dates.
- **Timezone Support**: Select a timezone from the dropdown. The start date text updates to reflect the selected timezone using `Intl.DateTimeFormat`.
- **DST Safe**: Uses zero-dependency logic (`year`, `month`, `day` tuples) and `toZonedDate` to respect local time without shifting due to UTC conversions.
- **Keyboard Navigation**:
  - `Arrow Keys`: Navigate the grid.
  - `Enter`: Select a date.
  - `Escape`: Blur the grid.
- **Accessibility**: Built with `role="grid"`, `aria-selected`, and proper focus management.

## Usage

```bash
npm install
npm run storybook
```

## Implementation Details

- **No Date Libraries**: All logic uses native `Date` and `Intl` APIs.
- **Validation**: Supports min/max dates, max range length, and unavailable dates.
- **Component Architecture**: Split into `DateRangePicker`, `CalendarGrid`, `Presets`, and `TimeSelector`.
    tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
