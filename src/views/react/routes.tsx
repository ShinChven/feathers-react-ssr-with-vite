import { Link, RouteObject } from "react-router-dom";
import About from "./pages/About";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="/about">About Us</Link>
      </div>
    ),
  },
  {
    path: "/about",
    element: <About />,
  },
];

export default routes;