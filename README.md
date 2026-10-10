# bag-of-tasks

A small web app holding a "bag" of tasks. You can:

- **Add a task** — opens a pop-up form; a confirmation appears once the task is added.
- **Give me a task** — draws a random task, optionally limited to a min–max time (in minutes). A task qualifies if its own time range overlaps the one you enter; tasks without times always qualify. Non-persistent tasks can be marked **Done** (removed) or **Put back**; persistent tasks always stay in the bag.
- **Inspect all tasks** — list, edit and delete tasks.

Each task has a title, an `isPersistent` flag, and optional min/max time in minutes.
All data is stored in the browser's `localStorage` (key `bag-of-tasks:v1`) — no database.

## Running

```sh
npm install
npm run dev     # dev server
npm run build   # type-check + production build into dist/
```
