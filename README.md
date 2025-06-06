# 🧼 @andrmhndr/cleankit

A beautifully structured utility kit for React & Next.js projects. Includes global dialogs, query param management, debouncing, date formatting, and object/list cleaning helpers.

> Made for developers who care about **clean code**, **efficiency**, and a little bit of magic ✨

---

## 📦 Installation

```bash
npm install @andrmhndr/cleankit
# or
yarn add @andrmhndr/cleankit
```

---

## 📚 Features

- 🧠 **DialogProvider** — Promise-based global modals.
- 🔍 **useQueryParams** — Easy query param management.
- 🕒 **debounce** — Lightweight function throttling.
- 📅 **formatDate** — Date formatting with locale support.
- 🧹 **cleanObject & cleanList** — Remove noise from objects and arrays.

---

## 🔘 DialogProvider

### Setup

```tsx
import { DialogProvider } from "@andrmhndr/cleankit";

export default function App({ Component, pageProps }) {
  return (
    <DialogProvider>
      <Component {...pageProps} />
    </DialogProvider>
  );
}
```

### Usage

```tsx
import { useContext } from "react";
import { DialogContext } from "@andrmhndr/cleankit";

const MyComponent = () => {
  const dialog = useContext(DialogContext);

  const handleClick = async () => {
    const result = await dialog?.openDialog({
      content: (close) => (
        <div>
          <p>Are you sure?</p>
          <button onClick={() => close(true)}>Yes</button>
          <button onClick={() => close(false)}>No</button>
        </div>
      ),
    });

    console.log("Dialog result:", result);
  };

  return <button onClick={handleClick}>Show Dialog</button>;
};
```

---

## 🔗 useQueryParams

Manage URL query params with ease (works with Next.js and React Router).

```tsx
import { useQueryParams } from "@andrmhndr/cleankit/react";

const { getOne, setQuery, removeQuery, clearQuery } = useQueryParams();

getOne("search");
setQuery({ search: "Next.js" });
removeQuery("search");
clearQuery();

// With debounce
setQuery({ search: "react" }, { debounce: 300 });
```

> ⚠️ For Next.js, make sure your `useQueryParams` imports from `@andrmhndr/cleankit/next` instead of base package.

---

## 🕒 debounce

```ts
import { debounce } from "@andrmhndr/cleankit";

const log = debounce((val: string) => console.log(val), 500);

log("Hello world");
```

---

## 📅 formatDate

```ts
import { formatDate } from "@andrmhndr/cleankit/server";


dateFormatter("2023-12-25T14:30:00", { format: "dd MMMM yyyy HH:mm" })
dateFormatter(new Date(), {
  format: "EEEE, d MMM yyyy hh:mm a",
  dayNamesFull: ["Minggu", "Senin", ...],
  monthNames: ["Januari", "Februari", ...],
  amPmLabels: ["pagi", "malam"]
})
```

---

## 🧹 cleanObject & cleanList

Clean out unwanted values from data objects and arrays.

### 🧼 `cleanObject`

Removes `null`, `undefined`, and empty string `""` values from an object.

```ts
import { cleanObject } from "@andrmhndr/cleankit/server";

const cleaned = cleanObject({
  name: "Felicia",
  age: null,
  email: "",
  location: undefined,
});
// => { name: "Felicia" }
```

### 🧼 `cleanList`

Removes `null`, `undefined`, empty strings `""`, and empty arrays `[]`. Optionally inserts a spacer between items.

```ts
import { cleanList } from "@andrmhndr/cleankit/server";

const cleaned = cleanList([null, "React", "", [], "Next.js", undefined]);
// => ["React", "Next.js"]

const spaced = cleanList(["A", "B", "C"], (i) => <hr key={i} />);
// => ["A", <hr />, "B", <hr />, "C"]
```

---

## 📖 License

MIT — Use it, love it, and make something beautiful.  
And remember... **Keep pushin' your self up!**
