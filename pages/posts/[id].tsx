import { Container, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticPropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAllPostIds, getPostData } from "../../lib/posts";
import InferNextPropsType from "infer-next-props-type";
import md from "markdown-it";
import Image from "next/image";

interface IParams extends ParsedUrlQuery {
  id: string;
}

type getStaticPropsContext = GetStaticPropsContext<ParsedUrlQuery, PreviewData>;

export const getStaticProps = async (context: getStaticPropsContext) => {
  const { id } = context.params as IParams;
  const postData = getPostData(id);
  return {
    props: {
      postData,
    },
  };
};

export default function Post({
  postData,
}: InferNextPropsType<typeof getStaticProps>) {
  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h1" align="center">
        {postData.title}
      </Typography>
      {postData.image !== "" && (
        <Image src={`/${postData.image}`} width="250px" height="100px" />
      )}
      <div
        style={{ alignSelf: "flex-start" }}
        dangerouslySetInnerHTML={{ __html: md().render(postData.content) }}
      />
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};
