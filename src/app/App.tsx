import { Outlet } from "react-router-dom";
import { ConfigProvider } from "antd";
import { theme } from "@/styles/theme.ts";

function App() {
  return (
    <ConfigProvider theme={theme}>
      <div>
        <Outlet />
      </div>
    </ConfigProvider>
  );
}

export default App;
