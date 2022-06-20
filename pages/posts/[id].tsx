import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GetStaticPaths, GetStaticPropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAllPostIds, getPostData } from "../../lib/posts";
import InferNextPropsType from "infer-next-props-type";

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
    <Box>
      <Typography>{postData.id}</Typography>
      <Typography>{postData.date}</Typography>
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};
