export type NewBoardOrColumnProps = {
  iconClass: string;
  handleNewItem: (data: Record<string, string>) => Promise<void>;
};
