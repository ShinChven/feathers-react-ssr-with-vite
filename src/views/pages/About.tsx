import { Link } from "react-router-dom";
import './About.css';

const About = () => {
  return (
    <div>
      <h1>About Me</h1>
      <Link to="/">home</Link>
      <button className="button" onClick={() => {
        console.log('click me')
      }}>
        click me
      </button>
    </div>
  );
};

export default About;