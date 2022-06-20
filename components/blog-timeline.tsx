import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Typography } from "@mui/material";
import { format } from "date-fns";
import { Post } from "../lib/types/posts";
import Link from "next/link";

type BlogTimeLineProps = {
  posts: Post[];
};

const BlogTimeline: React.FC<BlogTimeLineProps> = ({ posts }) => {
  return (
    <>
      <Timeline position="alternate">
        {posts.map((post, index) => {
          const date = post.date;
          const formattedDate = format(new Date(date), "do MMM yyyy");

          return (
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                {`${formattedDate}`}{" "}
                {post.duration ? `,   ${post.duration}` : ""}
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
              <TimelineContent
                sx={{ paddingTop: "0.1em", paddingBottom: "5rem" }}
              >
                <Link href={`/posts/${post.id}`}>
                  <Typography variant="h6">{post.title}</Typography>
                </Link>
                <Typography>{post.description}</Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </>
  );
};

export default BlogTimeline;
