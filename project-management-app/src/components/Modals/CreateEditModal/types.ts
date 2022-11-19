export type CreateEditModalProps = {
  title: string;
  handler: (data: Record<string, string>) => Promise<void>;
  closeHandler: () => void;
  description?: boolean;
  editValues?: editValues;
};

export type editValues = {
  name: string;
  description?: string;
};

export type formValues = {
  title: string;
  description: string;
};
