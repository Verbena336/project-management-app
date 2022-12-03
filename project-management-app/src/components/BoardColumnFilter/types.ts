export type props = {
  title: string;
  error: boolean;
  submitHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
