import styles from "./AuthForm.module.css";
import { Input } from "antd";
import { Checkbox } from "antd";
import { Icon } from "@/shared/ui/Icon/Icon.tsx";
import { AppButton } from "@/shared/ui/Button/Button.tsx";

type Credentials = {
  login: string;
  password: string;
};

type AuthFormProps = {
  credentials: Credentials;
  onChange: (next: Credentials) => void;
  onSubmit: () => void;
  rememberMe: boolean;
  onToggleRemember: (value: boolean) => void;
  loading: boolean;
  error: string;
};

export const AuthForm = ({
  credentials,
  onChange,
  onSubmit,
  rememberMe,
  onToggleRemember,
  loading,
  error,
}: AuthFormProps) => {
  const isDisabled = !credentials.login || !credentials.password;

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
            status={error ? "error" : ""}
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
            status={error ? "error" : ""}
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

        {error ? <span className={styles.error}> {error} </span> : ""}
      </div>

      <Checkbox
        className={styles.checkbox}
        checked={rememberMe}
        onChange={(e) => onToggleRemember(e.target.checked)}
      >
        Запомнить данные
      </Checkbox>

      <div className={styles.button}>
        <AppButton
          type={isDisabled ? "default" : "primary"}
          fullWidth
          onClick={onSubmit}
          disabled={isDisabled}
          loading={loading}
        >
          {loading ? "" : "Войти"}
        </AppButton>
      </div>

      <div className={styles.divider}>
        <span>или</span>
      </div>
    </div>
  );
};
