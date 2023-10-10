import React from "react"
import { Link } from "react-router-dom"
import styles from "./Home.module.less"

const Home:React.FC = () => {
  return <div className={styles.container}>
    <h1>Hello World</h1>
    <Link to="/about">About Us</Link>
  </div>
}

export default Home;