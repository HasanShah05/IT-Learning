"use client";

import MyFirstComponent from "./myFirstComponent";
import Gallery from "./Gallery";
import { Profile } from "./Gallery";
import { ImageTest } from "./Gallery";
import Clock from "./props";
import PackingList from "./PackingList";
import List from "./list";
import Reacipe from "./recipe";
import Toolbar from "./button";
import {Tooledbar} from "./button";
import { Balcony } from "./userapp";
import { useState } from "react";

const today = new Date();

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
}

const person = {
  name: "hasan",
  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export function Hasan() {
  return (
    <div style={person.theme}>
      <h1>{person.name}</h1>
    </div>
  );
}

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      className="bg-amber-400 px-4 py-2"
      onClick={() => setCount(count + 1)}
    >
      Count: {count}
    </button>
  );
}

export default function Home() {
  return (
    <div>
      <MyFirstComponent />
      <Gallery />
      <Profile />
      <ImageTest />
      <h1>To Do List for {formatDate(today)}</h1>
      <Hasan />
      <Clock color="pink" time="12:00 PM" />
      <PackingList />
      <List />
      <Reacipe />
      <Toolbar/>
      <Tooledbar/>
      <Balcony/>
      <Counter/>
    </div>
  );
}
