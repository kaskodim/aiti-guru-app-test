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
  const [credentials, setCredentials] = useState<Credentials>(
    //   {
    //   // login: "emily",
    //   login: "emilys",
    //   password: "emilyspass",
    // }
    {
      login: "",
      password: "",
    },
  );

  const [loginByCredentials] = useLoginByCredentialsMutation();

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
