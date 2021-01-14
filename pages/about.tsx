import Container from "../components/container";
import Layout from "../components/layout";
import Head from "next/head";
import Header from "../components/header";
import { CMS_NAME } from "../lib/constants";
import Whoami from "../components/whoami";
import Timeline from "../components/timeline";

const About = () => {
  return (
    <>
      <Layout>
        <Container>
          <Header />
          <Whoami />
          <Timeline />
        </Container>
      </Layout>
    </>
  );
};

export default About;
