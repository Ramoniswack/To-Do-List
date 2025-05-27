# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

# React To-Do App with Authentication

A simple and efficient To-Do List application built using React, TypeScript, Zod, and React Hook Form. It features secure login and signup functionality, along with personalized task management. User data is managed securely using localStorage and cookies.

## Features

- User Authentication

  - Signup with schema-based validation using Zod
  - Login with encrypted password using `btoa()`
  - Session managed with `js-cookie` and 1-day expiry

- Task Management

  - Add, edit, delete, and toggle completion status of tasks
  - Inline task editing and real-time UI updates
  - Task statistics display: pending, completed, and total count

- Persistent Storage

  - Todos are stored in `localStorage` based on the logged-in user
  - Login session is stored in cookies

- Form Validation

  - Uses React Hook Form with Zod for client-side form validation

- UI
  - Responsive and modern interface built with Tailwind CSS

## Tech Stack

- Frontend: React with TypeScript
- Form Handling: React Hook Form, Zod
- Styling: Tailwind CSS
- State Management: useState, useEffect, localStorage, js-cookie

## Folder Structure

src/
├── components/
│ ├── Login.tsx
│ ├── Signup.tsx
│ └── Todo.tsx
├── schema/
│ └── authSchema.ts
├── types/
│ └── types.ts




## Author

R.a.mohan Tiwari

LinkedIn: https://www.linkedin.com/in/r-a-mohan/ 
GitHub: https://github.com/Ramoniswack


## License

This project is licensed under the xxx License.


```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```