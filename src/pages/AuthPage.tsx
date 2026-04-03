// pages/AuthPage.tsx

import { useState } from "react";

type Credentials = {
  login: string;
  password: string;
};

export const AuthPage = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    login: "emilys",
    password: "emilyspass",
  });

  const handleClick = (credentials: Credentials) => {
    // хук авторизации

    console.log({ credentials });
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 3,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>иконка</div>
      <div>Добро пожаловать!</div>
      <div>Пожалуйста авторизуйтесь</div>
      {/*==================================================*/}
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
          setCredentials((prev) => ({ ...prev, password: e.target.value }))
        }
      />

      {/*====================================================*/}
      <div style={{ display: "flex", gap: 3 }}>
        <div>чекбокс</div>
        <div>запомнить данные</div>
      </div>

      <button onClick={() => handleClick(credentials)}>Войти</button>
      <div>или</div>
      <div style={{ display: "flex", gap: 3 }}>
        <div>Нет аккаунта?</div>
        <a href={""}>Создать</a>
      </div>
    </div>
  );
};
