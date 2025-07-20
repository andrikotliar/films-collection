export type PageContent = {
  id: number;
  title: string;
  content: string;
  pageUrl: string;
};

export type PageContentListItem = Omit<PageContent, 'content'> & {
  shortContent: string;
};
