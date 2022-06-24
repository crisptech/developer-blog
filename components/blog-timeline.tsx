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
import {
  Button,
  Chip,
  Container,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { Post } from "../lib/types/posts";
import Link from "next/link";
import { selectFilteredTags } from "../lib/selectors/selectFilteredTags";
import { Box } from "@mui/system";
import Image from "next/image";
import { grey } from "@mui/material/colors";

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
  // boxShadow: `0 0px 0px ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: "background-color 0.75s ease-in-out",
  borderRadius: "2rem",
  "&:hover": {
    // backgroundColor: "red",
    // boxShadow: `20px 0px 10px -4px ${alpha(
    //   theme.palette.primary.main,
    //   0.1
    // )}, -20px 0px 6px -4px ${alpha(theme.palette.primary.main, 0.1)}`,
    // backgroundColor: `linear-gradient(to right bottom, white, ${theme.palette.primary.main} `,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const BlogTimeline: React.FC<BlogTimeLineProps> = ({ posts }) => {
  return (
    <div>
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
                <Typography variant="caption" marginBottom="1rem">
                  {`${formattedDate}`}
                  {post.duration ? `,   ${post.duration}` : ""}
                </Typography>
                {post.image !== "" && (
                  <Paper
                    sx={{
                      position: "relative",
                      width: "300px",
                      height: "150px",
                      display: {
                        xs: "none",
                        lg: "flex",
                      },
                    }}
                  >
                    <Image
                      style={{ borderRadius: "25px" }}
                      src={`/${post.image}`}
                      layout="fill"
                      priority
                    />
                  </Paper>
                )}
              </TimelineOppositeContent>
              {index < posts.length - 1 ? (
                <TimelineSeparator>
                  <TimelineDot variant="outlined" />
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
                    gap: "0.3rem",
                    marginBottom: "1em",
                  }}
                >
                  {post.tags.map((tag) => {
                    return (
                      <Chip
                        sx={{ color: grey[400] }}
                        size="small"
                        variant="outlined"
                        color="primary"
                        label={tag}
                      />
                    );
                  })}
                </Box>
                <Link href={`/posts/${post.id}`}>
                  <Button variant="contained" color="divider" size="small">
                    READ MORE
                  </Button>
                </Link>
              </StyledTimelineContent>
            </StyledTimelineItem>
          );
        })}
      </Timeline>
    </div>
  );
};

export default BlogTimeline;
