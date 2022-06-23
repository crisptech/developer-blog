import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent, {
  TimelineContentProps,
} from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { alpha } from "@mui/system";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Button, Chip, styled, Typography } from "@mui/material";
import { format } from "date-fns";
import { Post } from "../lib/types/posts";
import Link from "next/link";
import { selectFilteredTags } from "../lib/selectors/selectFilteredTags";
import { Box } from "@mui/system";
import Image from "next/image";

type BlogTimeLineProps = {
  posts: Post[];
};

interface ITimelineContentProps extends TimelineContentProps {
  index?: number;
}

const StyledTimelineContent = styled(TimelineContent)<ITimelineContentProps>(
  ({ theme, index = 0 }) => ({
    paddingTop: "0.1em",
    paddingBottom: "5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: index % 2 === 0 ? "flex-start" : "flex-end",
    gap: "0.5em",
  })
);

const StyledTimelineItem = styled(TimelineItem)(({ theme }) => ({
  /* The fast way */
  boxShadow: `0 0px 0px ${alpha(theme.palette.primary.main, 0.1)}`,
  transition:
    "box-shadow 0.75s ease-in-out, background-color 0.75s ease-in-out",
  borderRadius: "2rem",
  "&:hover": {
    // backgroundColor: "red",
    boxShadow: `20px 0px 10px -4px ${alpha(
      theme.palette.primary.main,
      0.1
    )}, -20px 0px 6px -4px ${alpha(theme.palette.primary.main, 0.1)}`,
    // backgroundColor: `linear-gradient(to right bottom, white, ${theme.palette.primary.main} `,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const BlogTimeline: React.FC<BlogTimeLineProps> = ({ posts }) => {
  return (
    <>
      <Timeline position="alternate">
        {posts.map((post, index) => {
          const date = post.date;
          const formattedDate = format(new Date(date), "do MMM yyyy");

          return (
            <StyledTimelineItem>
              <TimelineOppositeContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="caption" marginBottom="3rem">
                  {`${formattedDate}`}
                  {post.duration ? `,   ${post.duration}` : ""}
                </Typography>
                {post.image !== "" && (
                  <Image
                    src={`/${post.image}`}
                    width="50"
                    height="75"
                    priority
                  />
                )}
              </TimelineOppositeContent>
              {index < posts.length - 1 ? (
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
              ) : (
                <TimelineSeparator>
                  <TimelineDot />
                </TimelineSeparator>
              )}
              <StyledTimelineContent index={index}>
                <Typography variant="h6">{post.title}</Typography>
                <Typography maxWidth="15rem" variant="body2">
                  {post.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "1em",
                  }}
                >
                  {post.tags.map((tag) => {
                    return <Chip label={tag} />;
                  })}
                </Box>
                <Link href={`/posts/${post.id}`}>
                  <Button variant="outlined" size="small">
                    READ MORE
                  </Button>
                </Link>
              </StyledTimelineContent>
            </StyledTimelineItem>
          );
        })}
      </Timeline>
    </>
  );
};

export default BlogTimeline;
