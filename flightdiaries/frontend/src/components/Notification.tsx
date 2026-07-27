import type { ErrorType } from "../types";
interface NotificationProps {
  error: ErrorType[] | string;
}
const Notification = ({ error }: NotificationProps) => {
  if (!error || typeof error === "string") return null;
  return (
    <div className="error">
      {error.map((el) => (
        <p key={el.path[0]}>
          Error path: {el.path[0]}: {el.code}
        </p>
      ))}
    </div>
  );
};

export default Notification;
