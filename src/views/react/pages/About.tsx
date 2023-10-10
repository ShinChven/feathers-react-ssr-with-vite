import { Link } from "react-router-dom";
import './About.css';
import { useData } from "../context";

const About = () => {
  const data = useData();
  return (
    <div>
      <h1>About Me</h1>
      <Link to="/">home</Link>
      <button className="button" onClick={() => {
        console.log('click me')
      }}>
        click me
      </button>

      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default About;