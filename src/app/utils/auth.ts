import { useRouter } from "next/navigation";

export const useCheckLogin = (): boolean => {
    const router = useRouter();
    const token = localStorage.getItem("token");
    const tokenTime = localStorage.getItem("token_time");

    if (!token || !tokenTime) {
        router.push("/login");
        return false;
    }

    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - parseInt(tokenTime ?? "0", 10);

    const TOKEN_EXPIRY_TIME = 2 * 60 * 60 * 1000; // 2 jam dalam milidetik

    if (elapsedTime > TOKEN_EXPIRY_TIME) {
        localStorage.removeItem("token");
        localStorage.removeItem("token_time");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        router.push("/login");
        return false;
    }

    return true;
};
