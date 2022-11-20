type dataValues = {
  title: string;
  description: string;
};

export type NewBoardOrColumnProps = {
  modalTitle: string;
  iconClass: string;
  handleNewItem: (data: dataValues) => Promise<void>;
};
