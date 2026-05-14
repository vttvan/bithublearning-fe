export interface User {
    id: string;
    username: string;
    fullName: string;
    email: string;
    role: "customer" | "admin";
    avatar?: string;
}

const CUSTOMER_MOCK_USER: User = {
    id: "u1",
    username: "customer",
    fullName: "Alex Van",
    email: "alex.van@bithub.io",
    role: "customer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
};

const ADMIN_MOCK_USER: User = {
    id: "u2",
    username: "admin",
    fullName: "Alex Law",
    email: "admin@bithub.io",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
};

export const authService = {
    login: async (username: string, password: string): Promise<User | null> => {
        // Artificial delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (username === "customer" && password === "123") {
            localStorage.setItem("bithub_user", JSON.stringify(CUSTOMER_MOCK_USER));
            return CUSTOMER_MOCK_USER;
        }

        if (username === "admin" && password === "123") {
            localStorage.setItem("bithub_user", JSON.stringify(ADMIN_MOCK_USER));
            return ADMIN_MOCK_USER;
        }
        return null;
    },

    logout: () => {
        localStorage.removeItem("bithub_user");
    },

    getCurrentUser: (): User | null => {
        const saved = localStorage.getItem("bithub_user");
        return saved ? JSON.parse(saved) : null;
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem("bithub_user");
    },
};
