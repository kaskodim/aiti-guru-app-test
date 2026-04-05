import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  type AuthCredentials,
  useLoginByCredentialsMutation,
} from "@/shared/api/authApi.ts";
import { AuthLogo } from "@/pages/AuthPage/AuthLogo/AuthLogo.tsx";
import { AuthTitle } from "@/pages/AuthPage/AuthTitle/AuthTitle.tsx";
import { AuthForm } from "@/pages/AuthPage/AuthForm/AuthForm.tsx";
import { AuthNoAccountHint } from "@/pages/AuthPage/AuthNoAccountHint/AuthNoAccountHint.tsx";
import styles from "./AuthPage.module.css";

export const AuthPage = () => {
  const [credentials, setCredentials] = useState<AuthCredentials>({
    username: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [loginByCredentials, { isLoading }] = useLoginByCredentialsMutation();

  const navigate = useNavigate();

  const handleClick = (credentials: AuthCredentials) => {
    setError("");

    loginByCredentials({
      username: credentials.username,
      password: credentials.password,
      expiresInMins: 1,
    })
      .unwrap()
      .then((res) => {
        console.log(res);
        setError("");

        if (rememberMe) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
        } else {
          sessionStorage.setItem("accessToken", res.accessToken);
          sessionStorage.setItem("refreshToken", res.refreshToken);
        }
        navigate("/");
      })
      .catch((err: { status: number; data?: { message?: string } }) => {
        if (err.status === 400) {
          setError("Неверный логин или пароль");
        } else {
          console.log("Ошибка, попробуйте позже", err);
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
              credentials={credentials}
              onCredentialsChange={setCredentials}
              onSubmit={() => handleClick(credentials)}
              rememberMe={rememberMe}
              onRememberMeChange={setRememberMe}
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
