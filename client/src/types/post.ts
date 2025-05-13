export type Post = {
  id: number;
  title: string;
  content: string;
  pageKey: string | null;
};

export type PostsListItem = Omit<Post, 'content'> & {
  shortContent: string;
};
