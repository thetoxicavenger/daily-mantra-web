import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

interface Mantra {
  _id: string;
  text: string;
}
const Home: NextPage<{ mantras: Mantra[] }> = ({ mantras }) => {
  console.log(mantras);
  return (
    <div className={styles.container}>
      <Head>
        <title>Daily Mantras</title>
        <meta name="description" content="Pick a daily mantra" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section>
          <h1>Choose A Mantra For Today ☀️</h1>
          <ul>
            {mantras.map(({ _id, text }) => (
              <li key={_id}>{text}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:8081/api/mantras");
  const { data } = await res.json();

  return {
    props: {
      mantras: data,
    },
  };
}

export default Home;
