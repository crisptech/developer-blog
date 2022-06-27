import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Chip } from "@mui/material";
import { Project } from "../lib/types/projects";
import Image from "next/image";
import Link from "next/link";

type ProjectCardType = {
  projectData: Project;
};

const ProjectCardAlt: React.FC<ProjectCardType> = ({ projectData }) => {
  return (
    <Link href={`/projects/${projectData.id}`}>
      <Card
        sx={{
          textAlign: "center",
        }}
      >
        <CardActionArea>
          <CardContent sx={{ height: "100px" }}>
            <Image
              objectFit="cover"
              src={`/${projectData.image}`}
              layout="fill"
              priority
            />
          </CardContent>
        </CardActionArea>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {projectData.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {projectData.description}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          {projectData.tags.map((tag) => {
            return <Chip label={tag} size="small" />;
          })}
        </CardActions>
      </Card>
    </Link>
  );
};

export default ProjectCardAlt;
