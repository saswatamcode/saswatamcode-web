import Container from "../components/container";
import Layout from "../components/layout";
import Header from "../components/header";
import PostTitle from "../components/post-title";
import ProjectGrid from "../components/project-grid";

const Projects = () => {
  return (
    <>
      <Layout>
        <Container>
          <Header />
          <PostTitle>Projects I'm Working On</PostTitle>
          <ProjectGrid />
        </Container>
      </Layout>
    </>
  );
};

export default Projects;
