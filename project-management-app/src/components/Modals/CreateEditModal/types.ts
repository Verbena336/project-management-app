export type CreateEditModalProps = {
  title: string;
  description: boolean;
  handler: (values: Record<string, string>) => void;
};

export type formValues = {
  title: string;
  description: string;
};
