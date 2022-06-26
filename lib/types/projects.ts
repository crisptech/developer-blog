export type Project = {
  id: string;
  title: string;
  date: string;
  description: string;
  content: string;
  tags: string[];
  // image path
  image: string;
};

export type ProjectState = {
  globalProjects: Record<string, Project>;
  visibleProjectIds: string[];
};
