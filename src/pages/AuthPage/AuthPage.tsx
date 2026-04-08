import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginByCredentialsMutation } from "@/shared/api/authApi.ts";
import { AuthLogo } from "@/pages/AuthPage/AuthLogo/AuthLogo.tsx";
import { AuthTitle } from "@/pages/AuthPage/AuthTitle/AuthTitle.tsx";
import { AuthForm } from "@/pages/AuthPage/AuthForm/AuthForm.tsx";
import { AuthNoAccountHint } from "@/pages/AuthPage/AuthNoAccountHint/AuthNoAccountHint.tsx";
import type { AuthCredentials } from "@/shared/api/types.ts";
import { STORAGE_KEYS } from "@/cosnt/const.ts";
import styles from "./AuthPage.module.css";

export const AuthPage = () => {
  const [error, setError] = useState<string>("");

  const [loginByCredentials, { isLoading }] = useLoginByCredentialsMutation();

  const navigate = useNavigate();

  const handleSubmit = (credentials: AuthCredentials, rememberMe: boolean) => {
    setError("");

    loginByCredentials({
      username: credentials.username,
      password: credentials.password,
    })
      .unwrap()
      .then((res) => {
        if (rememberMe) {
          localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, "true");

          localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, res.accessToken);
          localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, res.refreshToken);
        } else {
          localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, "false");

          localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);

          sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, res.accessToken);
          sessionStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, res.refreshToken);
        }
        navigate("/");
      })
      .catch((err: { status: number; data?: { message?: string } }) => {
        if (err.status === 400) {
          setError("Неверный логин или пароль");
        } else {
          setError(`Ошибка, попробуйте позже: ${err.data?.message}`);
        }
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formOuter}>
        <div className={styles.formBorder}>
          <div className={styles.form}>
            <div className={styles.logoWrapper}>
              <AuthLogo />
            </div>
            <div className={styles.titleWrapper}>
              <AuthTitle />
            </div>
            <AuthForm
              onSubmit={handleSubmit}
              loading={isLoading}
              error={error}
            />
            <div className={styles.footerWrapper}>
              <AuthNoAccountHint />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
