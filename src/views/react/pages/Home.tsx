import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useData } from "../DataContext"
import styles from "./Home.module.less"

const Home: React.FC = () => {
  const [data, setData] = useState(useData());
  return <div className={styles.container}>
    <h1>Hello World</h1>
    <Link to="/about">About Us</Link>
    <p>{JSON.stringify(data)}</p>
  </div>
}

export default Home;