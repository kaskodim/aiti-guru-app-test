// pages/AuthPage/AuthForm/AuthForm.tsx
import styles from "./AuthForm.module.css";
import { Input } from "antd";
import { Checkbox } from "antd";
import { Icon } from "@/shared/ui/Icon/Icon.tsx";

type Credentials = {
  login: string;
  password: string;
};

type AuthFormProps = {
  credentials: Credentials;
  onChange: (next: Credentials) => void;
  onSubmit: () => void;
};

export const AuthForm = ({
  credentials,
  onChange,
  onSubmit,
}: AuthFormProps) => {
  return (
    <div>
      <div className={styles.containerInputs}>
        <div className={styles.containerInput}>
          <div className={styles.title}>Логин</div>

          <Input
            name="login"
            id="login"
            className={styles.loginInput}
            placeholder="Введите логин"
            prefix={
              <Icon
                name="userIcon"
                size={24}
                color={"var(--color-icon-input)"}
              />
            }
            suffix={
              credentials.login ? (
                <button
                  type="button"
                  className={styles.clearButton}
                  onClick={() => onChange({ ...credentials, login: "" })}
                >
                  <Icon
                    name="close"
                    size={14}
                    color={"var(--color-icon-input)"}
                  />
                </button>
              ) : null
            }
            value={credentials.login}
            onChange={(e) =>
              onChange({ ...credentials, login: e.target.value })
            }
          />
        </div>

        <div className={styles.containerInput}>
          <div className={styles.title}>Пароль</div>

          <Input.Password
            name="password"
            id="password"
            className={styles.passwordInput}
            size="large"
            placeholder="Введите пароль"
            prefix={
              <Icon name="lock" size={24} color={"var(--color-icon-input)"} />
            }
            iconRender={(visible) =>
              visible ? (
                <Icon name="eye" size={20} color={"var(--color-icon-input)"} />
              ) : (
                <Icon
                  name="eyeOff"
                  size={20}
                  color={"var(--color-icon-input)"}
                />
              )
            }
            value={credentials.password}
            onChange={(e) =>
              onChange({ ...credentials, password: e.target.value })
            }
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 3 }}>
        <Checkbox>Запомнить данные</Checkbox>
      </div>

      <button onClick={onSubmit}>Войти</button>
      <div>или</div>
    </div>
  );
};
