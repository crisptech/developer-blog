import { Container, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticPropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import InferNextPropsType from "infer-next-props-type";
import md from "markdown-it";
import Image from "next/image";
import { getAllProjectIds, getProjectData } from "../../lib/projects";

interface IParams extends ParsedUrlQuery {
  id: string;
}

type getStaticPropsContext = GetStaticPropsContext<ParsedUrlQuery, PreviewData>;

export const getStaticProps = async (context: getStaticPropsContext) => {
  const { id } = context.params as IParams;
  const projectData = getProjectData(id);
  return {
    props: {
      projectData,
    },
  };
};

export default function Project({
  projectData,
}: InferNextPropsType<typeof getStaticProps>) {
  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h1" align="center">
        {projectData.title}
      </Typography>
      {projectData.image !== "" && (
        <Image src={`/${projectData.image}`} width="250px" height="100px" />
      )}
      <div
        style={{ alignSelf: "flex-start" }}
        dangerouslySetInnerHTML={{ __html: md().render(projectData.content) }}
      />
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllProjectIds();
  return {
    paths,
    fallback: false,
  };
};
