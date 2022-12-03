export type props = {
  selector?: string;
  title: string;
  error: boolean;
  submitHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
