"use client";

import { use, useState } from "react";

export function SharingState() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>Mumbai, Maharashtra</h2>
      <Panel
        title={"About"}
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        Mumbai is called to be city of dreams.
      </Panel>
      <Panel
        title={"Places to visit"}
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        1.Gateway of India. <br />
        2.Nariman Point.
      </Panel>
    </>
  );
}

function Panel({ title, children, isActive, onShow }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? <p>{children}</p> : <button onClick={onShow}>Show</button>}
    </section>
  );
}
