# User Management System

An Apple Human Interface Guidelines–styled User Management System built with
**React + TypeScript**, **Redux Toolkit** for global state, and **React Router**
for navigation.

Initial data is fetched once from
`https://jsonplaceholder.typicode.com/users`. All **add / edit / delete**
operations are handled locally in Redux — no `POST`, `PUT`, or `DELETE`
requests are sent to the API.

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Routes

| Path             | Screen                          |
| ---------------- | ------------------------------- |
| `/users`         | List of all users               |
| `/users/:id`     | Single user details             |
| `/add-user`      | Form to add a new user          |
| `/edit-user/:id` | Form to edit an existing user   |

## Project structure

```
src/
├── store/
│   ├── store.ts          # configureStore + RootState / AppDispatch types
│   ├── userSlice.ts      # state, async thunks, reducers, selectors
│   └── hooks.ts          # typed useAppDispatch / useAppSelector
├── types/
│   └── user.ts           # User / Address / Company domain types
├── components/
│   ├── Layout.tsx        # translucent nav bar + <Outlet/>
│   ├── UserCard.tsx      # name, email, address + edit/delete actions
│   ├── UserForm.tsx      # shared add/edit form with validation
│   ├── Toast.tsx         # lightweight confirmation toasts
│   └── Icons.tsx         # SF-Symbols-style inline icons
├── pages/
│   ├── UserList.tsx      # fetchUsers() on mount, search, loading state
│   ├── UserDetails.tsx   # full profile view
│   ├── AddUser.tsx       # wraps UserForm (add mode)
│   └── EditUser.tsx      # wraps UserForm (prefilled edit mode)
├── utils/
│   └── avatar.ts         # deterministic initials + colors
├── App.tsx               # route definitions
├── main.tsx              # Provider + Router + ToastProvider
└── index.css             # Apple HIG design system (light + dark)
```

## Redux state

```ts
interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
```

### Async thunks

- `fetchUsers()` — GET the initial list from the API.
- `addUser(newUser)` — generates an id from current state, adds locally.
- `updateUser(user)` — replaces the matching user locally.
- `deleteUser(id)` — removes the matching user locally.

## Design notes

- System font stack (SF Pro), system colors, and translucent "material"
  navigation bar with `backdrop-filter`.
- Continuous-corner cards, inset grouped form lists, and SF-style typography.
- Full **light and dark mode** support via `prefers-color-scheme`.
- Respects `prefers-reduced-motion`.
```
