export type NewBoardOrColumnProps = {
  modalTitle: string;
  iconClass: string;
  handleNewItem: (data: Record<string, string>) => Promise<void>;
};
