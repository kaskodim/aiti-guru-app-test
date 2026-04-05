// pages/AuthPage.tsx

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLoginByCredentialsMutation } from "@/shared/api/authApi.ts";

import { AuthLogo } from "@/pages/AuthPage/AuthLogo/AuthLogo.tsx";

import styles from "./AuthPage.module.css";
import { AuthTitle } from "@/pages/AuthPage/AuthTitle/AuthTitle.tsx";
import { AuthForm } from "@/pages/AuthPage/AuthForm/AuthForm.tsx";

type Credentials = {
  login: string;
  password: string;
};

export const AuthPage = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    login: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  // const [credentials, setCredentials] = useState<Credentials>(
  //   //   {
  //   //   // login: "emily",
  //   //   login: "emilys",
  //   //   password: "emilyspass",
  //   // }
  //   {
  //     login: "",
  //     password: "",
  //   },
  // );

  const [loginByCredentials, { isLoading }] = useLoginByCredentialsMutation();

  // console.log(error);

  const navigate = useNavigate();

  const handleClick = (credentials: Credentials) => {
    setError("");

    loginByCredentials({
      username: credentials.login,
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
        setTimeout(() => {
          navigate("/");
        }, 300);
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
            {/*================= Иконка =================================*/}
            <AuthLogo />
            {/*================== Приветствие ===============================*/}
            <AuthTitle />
            {/*=================== Форма ==================================*/}
            <AuthForm
              credentials={credentials}
              onChange={setCredentials}
              onSubmit={() => handleClick(credentials)}
              rememberMe={rememberMe}
              onToggleRemember={setRememberMe}
              loading={isLoading}
              error={error}
            />

            {/*==================== Подвал ==============================*/}

            <div style={{ display: "flex", gap: 3 }}>
              <div>Нет аккаунта?</div>
              <a href={""}>Создать</a>
            </div>

            {/*  =============================================================*/}
          </div>
        </div>
      </div>
    </div>
  );
};
