import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Chip } from "@mui/material";
import { Project } from "../lib/types/projects";
import Image from "next/image";
import Link from "next/link";
import { animated, useSpring } from "react-spring";

type ProjectCardType = {
  projectData: Project;
};

const ProjectCardAlt: React.FC<ProjectCardType> = ({ projectData }) => {
  const [state, toggle] = React.useState(false);

  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 200 },
  });

  return (
    <animated.div
      onMouseOver={() => toggle(true)}
      onMouseLeave={() => toggle(false)}
      style={{
        opacity: x.to({ output: [0.8, 1.2] }),
        transform: x
          .to({
            range: [0, 1],
            output: [1, 1.1],
          })
          .to((x) => `scale(${x})`),
      }}
    >
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
    </animated.div>
  );
};

export default ProjectCardAlt;
