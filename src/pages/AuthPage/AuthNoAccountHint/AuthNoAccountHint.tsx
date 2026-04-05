import styles from "./AuthNoAccountHint.module.css";

export const AuthNoAccountHint = () => {
  return (
    <div className={styles.text}>
      Нет аккаунта? <a href="">Создать</a>
    </div>
  );
};
