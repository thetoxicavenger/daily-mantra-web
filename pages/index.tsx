import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Head from "next/head";
import type { NextPage } from "next";

import styles from "../styles/Home.module.css";

type Nullable<T> = null | T;

interface Mantra {
  _id: string;
  text: string;
}
const Home: NextPage<{ mantras: Mantra[] }> = ({ mantras = [] }) => {
  const [selectedMantraId, setSelectedMantraId] =
    useState<Nullable<Mantra["_id"]>>(null);

  const onMantraClick = (_id: Mantra["_id"]) => {
    setSelectedMantraId(_id);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Daily Mantras</title>
        <meta name="description" content="Pick a daily mantra" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <main className={styles.main}>
        <section>
          <h1>Choose A Mantra For Today ☀️</h1>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <List>
              {mantras.map(({ _id, text }) => (
                <ListItem disablePadding key={_id}>
                  <ListItemButton onClick={() => onMantraClick(_id)}>
                    <ListItemText primary={text} />
                    {_id === selectedMantraId && (
                      <ListItemIcon>
                        <CheckCircleIcon />
                      </ListItemIcon>
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
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
