import { type SyntheticEvent, useState } from "react";
import { Input } from "antd";
import { Checkbox } from "antd";
import { Icon } from "@/shared/ui/Icon/Icon.tsx";
import { Button } from "antd";
import type { AuthCredentials } from "@/shared/api/types.ts";
import styles from "./AuthForm.module.css";

type AuthFormProps = {
  loading: boolean;
  error: string;
  onSubmit: (data: AuthCredentials, rememberMe: boolean) => void;
};

export const AuthForm = ({
  onSubmit,
  loading = false,
  error,
}: AuthFormProps) => {
  const [credentials, setCredentials] = useState<AuthCredentials>({
    username: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const isDisabled =
    !credentials.username.trim() || !credentials.password.trim();

  const handleLoginChange = (value: string) => {
    setCredentials({ ...credentials, username: value });
  };

  const handlePasswordChange = (value: string) => {
    setCredentials({ ...credentials, password: value });
  };

  const handleClearLogin = () => {
    setCredentials({ ...credentials, username: "" });
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isDisabled && !loading) {
      onSubmit(credentials, rememberMe);
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
              credentials.username ? (
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
            value={credentials.username}
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
                // TODO использовать иконку из ant
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
        onChange={(e) => setRememberMe(e.target.checked)}
      >
        Запомнить данные
      </Checkbox>

      <Button
        htmlType="submit"
        type="primary"
        size={"large"}
        className={styles.submitButton}
        disabled={isDisabled}
        loading={loading}
      >
        Войти
      </Button>

      <div className={styles.formDivider}>
        <span>или</span>
      </div>
    </form>
  );
};
