import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import { useData } from "../context"
import styles from "./Home.module.less"

const Home: React.FC = () => {
  const [data, setData] = useState(useData() as any);
  return <div className={styles.container}>
    <Helmet>
      <title>{data?.title}</title>
      <meta name="description" content={data?.description} />
    </Helmet>
    <h1>Hello World</h1>
    <Link to="/about">About Us</Link>
    <p>url: {data?.url}</p>
    <p>{JSON.stringify(data)}</p>
  </div>
}

export default Home;