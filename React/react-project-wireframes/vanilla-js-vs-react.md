# Vanilla JavaScript vs React

## What is Vanilla JS?

Plain JavaScript with no libraries or frameworks. You write everything yourself — finding elements, creating elements, updating the page manually.

## What is React?

A JavaScript **library** made by Facebook. It helps you build user interfaces by breaking everything into **components** (reusable pieces).

---

## Key Differences

| | Vanilla JS | React |
|---|---|---|
| **Setup** | Just an `.html` file — nothing to install | Needs a setup (or CDN links) |
| **Finding elements** | `document.getElementById('myDiv')` | Not needed — React tracks elements for you |
| **Creating elements** | `document.createElement('li')` then `appendChild()` | Just write JSX: `<li>Hello</li>` |
| **Updating the page** | You manually change the DOM after every data change | Change the data → React updates the page automatically |
| **Organizing code** | Functions and files — no rules | **Components** — each piece of UI is its own function |
| **Reusing UI pieces** | Copy-paste HTML or build with JS | Create a component once, use it anywhere: `<Card />` |
| **Storing data** | Regular variables: `let count = 0` | State: `const [count, setCount] = useState(0)` |
| **Handling events** | `element.addEventListener('click', fn)` | Directly on the element: `onClick={fn}` |
| **HTML** | Written in `.html` files | Written inside JavaScript as **JSX** |

---

## Side-by-Side Code Examples

### Displaying a list of items

**Vanilla JS:**
```js
const list = document.getElementById('myList');

items.forEach(function(item) {
  const li = document.createElement('li');
  li.textContent = item;
  list.appendChild(li);
});
```

**React:**
```jsx
function MyList({ items }) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
```

---

### Updating a counter

**Vanilla JS:**
```js
let count = 0;
const display = document.getElementById('count');
const btn = document.getElementById('addBtn');

btn.addEventListener('click', function() {
  count++;
  display.textContent = count;  // manually update the page
});
```

**React:**
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  );
  // page updates automatically when count changes!
}
```

---

### Removing an item from a list

**Vanilla JS:**
```js
function removeItem(index) {
  items.splice(index, 1);     // change the data
  renderList();                // manually rebuild the whole list
}
```

**React:**
```jsx
function removeItem(index) {
  setItems(items.filter((_, i) => i !== index));
  // that's it — React re-renders automatically
}
```

---

## When to Use What?

| Use Vanilla JS when... | Use React when... |
|---|---|
| Building something small and simple | Building something with many interactive parts |
| Learning how JavaScript actually works | Building a real web app (dashboard, social media, etc.) |
| You want zero dependencies | You want to reuse UI components easily |
| It's a quick script or experiment | The page has lots of data that changes often |

---

## The Big Idea

> **Vanilla JS** = You are the boss of the page. You tell the browser exactly what to change, when, and how.
>
> **React** = You describe what the page should look like. React figures out what changed and updates it for you.

Think of it like this:
- **Vanilla JS** is like cooking from scratch — you control every step
- **React** is like having a smart kitchen assistant — you say what dish you want, and it handles the details

---

## New Words in React

| Word | What it means |
|---|---|
| **Component** | A reusable piece of UI (like a custom HTML tag) |
| **JSX** | HTML-like code written inside JavaScript |
| **State** | Data that, when changed, automatically updates the page |
| **Props** | Data passed from a parent component to a child component |
| **useState** | A React function that creates a piece of state |
| **Render** | When React draws (or redraws) your component on the screen |
