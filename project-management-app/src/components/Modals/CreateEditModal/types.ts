export type dataValues = {
  title: string;
  description: string;
};

export type CreateEditModalProps = {
  title: string;
  handler: (data: dataValues) => Promise<void>;
  closeHandler: () => void;
  description?: boolean;
  editValues?: editValues;
  user?: string;
};

export type editValues = {
  name: string;
  description?: string;
};

export type formValues = {
  title: string;
  description: string;
};
