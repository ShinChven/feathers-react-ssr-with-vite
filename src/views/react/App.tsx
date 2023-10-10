import { Route, Routes } from "react-router-dom";
import routes from "./routes";

const App = () => {
  return <>
    <Routes>
      {routes.map(({ path, element }) => {
        return <Route key={path} path={path} element={element}></Route>
      })}
    </Routes>
  </>
};

export default App;