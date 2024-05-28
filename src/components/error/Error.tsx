import styles from "./error.module.scss";
interface isErrorProps {
  errorMessage: string;
}
const Error = ({ errorMessage }: isErrorProps) => {
  return (
    <div>
      <p className={styles.error}>Error: {errorMessage}</p>
    </div>
  );
};
export default Error;
