// pages/AuthPage.tsx

import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useLoginByCredentialsMutation } from "@/shared/api/authApi.ts";

import "./AuthPage.styles.css";
import { Icon } from "@/shared/ui/Icon/Icon.tsx";

type Credentials = {
  login: string;
  password: string;
};

export const AuthPage = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    // login: "emily",
    login: "emilys",
    password: "emilyspass",
  });

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
    <div className="container">
      <div className="form-outer">
        <div className="form-border">
          <div className="form">
            {/*================= Иконка =================================*/}
            <div>
              <Icon name={"logo"} size={30} />
            </div>
            {/*================== Приветствие ===============================*/}
            <div>
              <div>Добро пожаловать!</div>
              <div>Пожалуйста авторизуйтесь</div>
            </div>
            {/*=================== Форма ==================================*/}
            <div>
              <div>Логин</div>
              <input
                value={credentials.login}
                onChange={(e) =>
                  setCredentials((prev) => ({ ...prev, login: e.target.value }))
                }
              />
              <div>Пароль</div>
              <input
                value={credentials.password}
                type={"password"}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />

              <div style={{ display: "flex", gap: 3 }}>
                <div>чекбокс</div>
                <div>запомнить данные</div>
              </div>

              <button onClick={() => handleClick(credentials)}>Войти</button>
              <div>или</div>
            </div>

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
