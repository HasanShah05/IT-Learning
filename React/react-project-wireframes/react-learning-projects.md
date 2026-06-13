# React Learning Projects - Teaching Guide

## Phase 0: Prerequisites

### Install Node.js

1. Go to **https://nodejs.org**
2. Download the **LTS** version (not Current)
3. Run the installer - click Next through everything (keep defaults)
4. Restart your terminal / VS Code after installing

### Verify Installation

Open a terminal and run:

```bash
node --version     # should show something like v22.x.x
npm --version      # should show something like 10.x.x
```

If both commands show version numbers, you're ready.

### Install VS Code (if not already installed)

1. Go to **https://code.visualstudio.com**
2. Download and install
3. Open VS Code → open Terminal (Ctrl + `)

---

## Phase 1: Project Setup

### Create a New React Project (using Vite)

> **Note:** `create-react-app` is deprecated. Use **Vite** instead.
> You do NOT need to install Vite separately - the command below downloads it automatically.

```bash
# Create new React project (this downloads Vite automatically)
npm create vite@latest my-app -- --template react

# Enter project and install dependencies
cd my-app
npm install

# Add Mantine UI library
npm install @mantine/core @mantine/hooks @mantine/dates @mantine/notifications

# Run dev server
npm run dev
```

### Set Up Mantine in `main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>
)
```

That's it - you're ready to use any Mantine component.

---

## Phase 2: localStorage Basics (Teach This First)

A custom hook that all 3 students will use in their projects:

```jsx
// src/hooks/useLocalStorage.js
import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  const setStored = (newValue) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, setStored]
}
```

### Usage

```jsx
const [students, setStudents] = useLocalStorage('students', [])
```

This works exactly like `useState` but the data survives page refresh.

---

## Phase 3: Project Assignments

All three projects follow the **same pattern** so students can help each other:

1. **Master data** - add/edit/delete items
2. **Transaction data** - enter records against master data
3. **Report generation** - display/print a formatted report

---

### Project 1: Marksheet Generator

**Assigned to:** Student with IT background (most complex)

**Scenario:** A school teacher manages student marks and generates marksheets.

| Screen | What it does |
|--------|-------------|
| Subjects | Add subjects (Math, Science, English...) with max marks |
| Students | Add students (name, roll number, class) |
| Enter Marks | Select student → enter marks for each subject |
| Marksheet | Select student → view marksheet with total, percentage, grade, pass/fail |

**localStorage keys:** `subjects`, `students`, `marks`

**Grade Logic:**

| Percentage | Grade |
|-----------|-------|
| 90 and above | A+ |
| 80 - 89 | A |
| 70 - 79 | B |
| 60 - 69 | C |
| 50 - 59 | D |
| Below 50 | F |
| Below 40 in any subject | FAIL |

**Sample Data Structure:**

```json
// subjects
[
  { "id": 1, "name": "Mathematics", "maxMarks": 100 },
  { "id": 2, "name": "Science", "maxMarks": 100 }
]

// students
[
  { "id": 1, "name": "Rahul Kumar", "rollNumber": "001", "class": "10th" }
]

// marks
[
  { "studentId": 1, "subjectId": 1, "marks": 85 },
  { "studentId": 1, "subjectId": 2, "marks": 72 }
]
```

---

### Project 2: Invoice / Bill Generator

**Assigned to:** Second student

**Scenario:** A small shop owner creates bills for customers.

| Screen | What it does |
|--------|-------------|
| Products | Add products (name, price, unit like kg/piece/litre) |
| Customers | Add customers (name, phone, address) |
| Create Invoice | Select customer → add products with quantity → auto-calculate totals |
| Invoice Report | View/print invoice with items, subtotal, tax (GST 18%), grand total |

**localStorage keys:** `products`, `customers`, `invoices`

**Calculation Logic:**

```
Line Total  = price × quantity
Subtotal    = sum of all line totals
Tax (GST)   = 18% of subtotal
Grand Total = subtotal + tax
```

**Sample Data Structure:**

```json
// products
[
  { "id": 1, "name": "Rice", "price": 60, "unit": "kg" },
  { "id": 2, "name": "Sugar", "price": 45, "unit": "kg" }
]

// customers
[
  { "id": 1, "name": "Amit Shah", "phone": "9876543210", "address": "123 Main St" }
]

// invoices
[
  {
    "id": 1,
    "customerId": 1,
    "date": "2026-04-03",
    "items": [
      { "productId": 1, "quantity": 5, "price": 60 },
      { "productId": 2, "quantity": 2, "price": 45 }
    ]
  }
]
```

---

### Project 3: Library Book Tracker

**Assigned to:** Slow learner (simplest workflow)

**Scenario:** A small library tracks who borrowed which book.

| Screen | What it does |
|--------|-------------|
| Books | Add books (title, author, category) |
| Members | Add members (name, phone) |
| Issue / Return | Issue a book to a member, mark it as returned |
| Report | Select member → show all books borrowed, returned, and pending |

**localStorage keys:** `books`, `members`, `transactions`

**Simple Logic:** A book can only be issued if it's not currently with someone. Show "Available" / "Issued" status on the books list.

**Sample Data Structure:**

```json
// books
[
  { "id": 1, "title": "Harry Potter", "author": "J.K. Rowling", "category": "Fiction" }
]

// members
[
  { "id": 1, "name": "Sana Khan", "phone": "9876543210" }
]

// transactions
[
  {
    "id": 1,
    "bookId": 1,
    "memberId": 1,
    "issueDate": "2026-04-01",
    "returnDate": null
  }
]
```

---

## Shared Project Structure

All three projects use the **exact same folder structure:**

```
src/
├── hooks/
│   └── useLocalStorage.js      ← same for all 3
├── pages/
│   ├── MasterPage1.jsx         ← Subjects / Products / Books
│   ├── MasterPage2.jsx         ← Students / Customers / Members
│   ├── TransactionPage.jsx     ← Enter Marks / Create Invoice / Issue Book
│   └── ReportPage.jsx          ← Marksheet / Invoice / Library Report
├── App.jsx                     ← Navigation between pages
└── main.jsx
```

---

## Mantine Components to Use

| Need | Component |
|------|-----------|
| Text input | `TextInput` |
| Number input | `NumberInput` |
| Dropdown | `Select` |
| Buttons | `Button` |
| Data display | `Table` |
| Layout | `AppShell`, `Container`, `Group`, `Stack` |
| Navigation | `NavLink` or `Tabs` |
| Alerts | `Notifications` |
| Print report | Use `window.print()` with a clean layout |

### Example: A Simple Form

```jsx
import { TextInput, NumberInput, Button, Stack } from '@mantine/core'
import { useState } from 'react'

function AddProduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)

  return (
    <Stack>
      <TextInput
        label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <NumberInput
        label="Price"
        value={price}
        onChange={setPrice}
      />
      <Button onClick={() => { /* save logic */ }}>
        Add Product
      </Button>
    </Stack>
  )
}
```

### Example: A Simple Table

```jsx
import { Table } from '@mantine/core'

function ProductList({ products }) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Unit</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {products.map((p) => (
          <Table.Tr key={p.id}>
            <Table.Td>{p.name}</Table.Td>
            <Table.Td>{p.price}</Table.Td>
            <Table.Td>{p.unit}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
```

---

## Teaching Schedule

| Day | Activity |
|-----|----------|
| Day 1 | Create project together, set up Mantine, build one form that saves to localStorage |
| Day 2 | Build the two master screens (add/edit/delete with a table) |
| Day 3 | Build the transaction screen (the main feature of each project) |
| Day 4 | Build the report screen with print functionality |
| Day 5 | Polish - error handling, validation, nice UI |

---

## Tips for the Teacher

- **Let them struggle** - don't give answers immediately. Guide them to the Mantine docs.
- **Code review together** - at the end of each day, have all 3 show their code to each other.
- **Same pattern, different data** - when one student is stuck, show them how another student solved the same pattern with different data.
- **localStorage DevTools** - teach them to open browser DevTools → Application → Local Storage to see their data.
- **Git from day 1** - have them commit at the end of each day so they learn version control naturally.
