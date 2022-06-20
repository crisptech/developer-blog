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
import { Post } from "../types/posts";
import { map } from "ramda";
import Link from "next/link";

type BlogTimeLineProps = {
  posts: Pick<Record<string, Post>, string>[];
};

map((post) => {
  const date = post.date;
  const formattedDate = format(new Date(date), "do MMM yyyy");

  return (
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                {formattedDate}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ paddingTop: "0.1em" }}>
                <Link href={`/posts/${post.id}`}>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography>{post.description}</Typography>
                </Link>
              </TimelineContent>
            </TimelineItem>
          );
        })}
        {/* <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            {formattedDate}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ paddingTop: "0.1em" }}>
            <Typography variant="h6">Title 1</Typography>
            <Typography>Lorem ipsu lala land</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            10:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Code</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            12:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Sleep</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            9:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Repeat</TimelineContent>
        </TimelineItem> */}
      </Timeline>
    </>
, posts)
  )
});

const BlogTimeline: React.FC<BlogTimeLineProps> = ({ posts }) => {
  return (
    <>
      <Timeline position="alternate">
        {posts.map((post) => {
          const date = post.date;
          const formattedDate = format(new Date(date), "do MMM yyyy");

          return (
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                {formattedDate}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ paddingTop: "0.1em" }}>
                <Link href={`/posts/${post.id}`}>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography>{post.description}</Typography>
                </Link>
              </TimelineContent>
            </TimelineItem>
          );
        })}
        {/* <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            {formattedDate}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ paddingTop: "0.1em" }}>
            <Typography variant="h6">Title 1</Typography>
            <Typography>Lorem ipsu lala land</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            10:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Code</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            12:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Sleep</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            9:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Repeat</TimelineContent>
        </TimelineItem> */}
      </Timeline>
    </>
  );
};

export default BlogTimeline;
