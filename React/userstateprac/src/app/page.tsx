import { Age } from "@/componenets/usered";
import { App } from "./01counter";
import { Player } from "@/componenets/vedioplayer";

export default function Home() {
  return (
    <div>
      <App/>
      <Age/>
      <Player/>
    </div>
  );
}
