import { Input } from "antd";
import { Checkbox } from "antd";
import { Icon } from "@/shared/ui/Icon/Icon.tsx";
import { AppButton } from "@/shared/ui/Button/Button.tsx";
import styles from "./AuthForm.module.css";
import type { SyntheticEvent } from "react";

type AuthCredentials = {
  login: string;
  password: string;
};

type AuthFormProps = {
  credentials: AuthCredentials;
  onCredentialsChange: (next: AuthCredentials) => void;
  onSubmit: () => void;
  rememberMe: boolean;
  onRememberMeChange: (value: boolean) => void;
  loading?: boolean;
  error?: string;
};

export const AuthForm = ({
  credentials,
  onCredentialsChange,
  onSubmit,
  rememberMe,
  onRememberMeChange,
  loading = false,
  error,
}: AuthFormProps) => {
  const isDisabled = !credentials.login.trim() || !credentials.password.trim();

  const handleLoginChange = (value: string) => {
    onCredentialsChange({ ...credentials, login: value });
  };

  const handlePasswordChange = (value: string) => {
    onCredentialsChange({ ...credentials, password: value });
  };

  const handleClearLogin = () => {
    onCredentialsChange({ ...credentials, login: "" });
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isDisabled && !loading) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formFields}>
        <div className={styles.formField}>
          <label htmlFor="login" className={styles.label}>
            Логин
          </label>

          <Input
            name="login"
            id="login"
            className={styles.input}
            placeholder="Введите логин"
            status={error ? "error" : undefined}
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
                  className={styles.inputClearButton}
                  onClick={handleClearLogin}
                  aria-label="Очистить логин"
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
            onChange={(e) => handleLoginChange(e.target.value)}
          />
        </div>

        <div className={styles.formField}>
          <label htmlFor="password" className={styles.label}>
            Пароль
          </label>

          <Input.Password
            name="password"
            id="password"
            className={styles.input}
            status={error ? "error" : undefined}
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
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
        </div>

        {error && (
          <span role="alert" className={styles.formError}>
            {error}
          </span>
        )}
      </div>

      <Checkbox
        className={styles.formCheckbox}
        checked={rememberMe}
        onChange={(e) => onRememberMeChange(e.target.checked)}
      >
        Запомнить данные
      </Checkbox>

      <div className={styles.submitButton}>
        <AppButton
          htmlType="submit"
          type={isDisabled ? "default" : "primary"}
          fullWidth
          disabled={isDisabled}
          loading={loading}
        >
          Войти
        </AppButton>
      </div>

      <div className={styles.formDivider}>
        <span>или</span>
      </div>
    </form>
  );
};
