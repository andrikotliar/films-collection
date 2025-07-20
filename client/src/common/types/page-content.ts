export type PageContent = {
  id: number;
  title: string;
  content: string;
  pageKey: string;
};

export type PageContentListItem = Omit<PageContent, 'content'> & {
  shortContent: string;
};
