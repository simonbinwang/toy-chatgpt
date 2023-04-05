interface UserMessageProps {
  message: string;
}

export const UserMessage = ({ message }: UserMessageProps) => {
  return <div>{message}</div>;
};
