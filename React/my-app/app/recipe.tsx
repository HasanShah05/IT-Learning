function App({ drinkers }) {
  return (
    <>
      <ol>
        <li>Boil {drinkers} cups of water.</li>
        <li>
          Add {drinkers} supoons of tea and {0.5 * drinkers} spoons of spice.
        </li>
        <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
      </ol>
    </>
  );
}

export default function Reacipe() {
  return (
    <section>
      <h1>spiced chai recipe</h1>
      <h2>for two</h2>
      <App drinkers={2} />
      <h2>for a gathering</h2>
      <App drinkers={4} />
    </section>
  );
}
