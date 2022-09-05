import { useRoutes } from "react-router-dom";
import {routes} from "./router/routes"


function App() {
  const content = useRoutes(routes)
  return (
    <section>
      {content}
    </section>
  );
}

export default App;
