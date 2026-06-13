function Item({ name, isPacked }) {
  return <li className="item">{isPacked ? <del>{name + "✅"}</del> : name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Rides Packing List</h1>
      <ul>
        <Item isPacked={true} name="Space Suit" />
        <Item isPacked={true} name="Helmet with a golden leaf" />
        <Item isPacked={false} name="photos of tam" />
      </ul>
    </section> 
  );
}
