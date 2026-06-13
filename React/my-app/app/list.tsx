import { people } from "./data";

export default function List() {
  const chemists = people.filter((person) => person.profession === "chemist");
  const everyoneElse = people.filter(
    (person) => person.profession !== "chemist",
  );

  return (
    <>
      <article>
        <h1>Scientists</h1>
        <h2>Chemists</h2>
        <ul>
          {chemists.map((person) => (
            <>
              <li key={person.id}>
                <p>
                  <b>{person.name}</b>
                  {" " + person.profession + " "}
                </p>
              </li>
            </>
          ))}
        </ul>

        <h2>Everyone Else</h2>
        <ul>
          {everyoneElse.map((person) => (
            <>
              <li key={person.id}>
                <p>
                  <b>{person.name}</b>
                  {" " + person.profession + " "}
                </p>
              </li>
            </>
          ))}
        </ul>
      </article>
    </>
  );
}
