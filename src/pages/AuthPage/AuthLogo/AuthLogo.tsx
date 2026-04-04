import { Icon } from "@/shared/ui/Icon/Icon.tsx";
import styles from "./AuthLogo.module.css";

export const AuthLogo = () => {
  return (
    <div className={styles.logoShell}>
      <div className={styles.logoInner}>
        <Icon name="logo" size={35} />
      </div>
    </div>
  );
};
