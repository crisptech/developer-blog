import RssFeed from "@mui/icons-material/RssFeed";
import Code from "@mui/icons-material/Code";
import ContactPage from "@mui/icons-material/ContactPage";

export const navOptions: NavOptions = {
  blog: {
    slug: "/",
    icon: <RssFeed />,
  },
  projects: {
    slug: "/projects",
    icon: <Code />,
  },
  resume: {
    slug: "/resume",
    icon: <ContactPage />,
  },
};

export type NavOptions = {
  [name: string]: {
    slug: string;
    icon: JSX.Element;
  };
};
