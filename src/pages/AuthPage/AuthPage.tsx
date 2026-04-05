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
  const [credentials, setCredentials] = useState<Credentials>(() => {
    const saved = localStorage.getItem("rememberCredentials");
    if (saved) {
      try {
        return JSON.parse(saved) as Credentials;
      } catch {
        return { login: "", password: "" };
      }
    }
    return { login: "", password: "" };
  });

  const [rememberMe, setRememberMe] = useState<boolean>(() => {
    return localStorage.getItem("rememberMe") === "true";
  });

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

  const navigate = useNavigate();

  const handleClick = (credentials: Credentials) => {
    loginByCredentials({
      username: credentials.login,
      password: credentials.password,
      expiresInMins: 1,
    })
      .unwrap()
      .then((res) => {
        console.log(res);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);

        if (rememberMe) {
          localStorage.setItem(
            "rememberCredentials",
            JSON.stringify(credentials),
          );
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberCredentials");
          localStorage.removeItem("rememberMe");
        }

        setTimeout(() => {
          navigate("/");
        }, 300);
      })
      .catch((err) => {
        console.log({ err });
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
