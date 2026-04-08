import styles from "./AuthTitle.module.css";

export const AuthTitle = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добро пожаловать!</h1>
      <p className={styles.subTitle}>Пожалуйста, авторизуйтесь</p>
    </div>
  );
};
