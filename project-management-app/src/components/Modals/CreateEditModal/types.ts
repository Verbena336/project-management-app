export type CreateEditModalProps = {
  title: string;
  description: boolean;
  isEdit: false | editValues;
  handler: (data: Record<string, string>) => Promise<void>;
  closeHandler: () => void;
};

export type editValues = {
  name: string;
  description?: string;
};

export type formValues = {
  title: string;
  description: string;
};
