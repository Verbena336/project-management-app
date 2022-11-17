export type CreateEditModalProps = {
  title: string;
  description: boolean;
  handler: (data: Record<string, string>) => Promise<void>;
  closeHandler: () => void;
};

export type formValues = {
  title: string;
  description: string;
};
