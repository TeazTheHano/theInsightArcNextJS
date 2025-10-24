// src/hooks/useTheme.ts (Hook quản lý logic theme)
import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';

// Định nghĩa các loại theme có thể có, bao gồm 'system'
export type Theme = 'light' | 'dark' | 'light-medium-contrast' | 'light-high-contrast' | 'system';

// Định nghĩa kiểu cho Context Value
interface ThemeContextType {
    theme: Theme; // Lựa chọn theme của người dùng (có thể là 'system')
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    resolvedTheme: 'light' | 'dark' | 'light-medium-contrast' | 'light-high-contrast'; // Theme thực tế được áp dụng (không bao giờ là 'system')
}

// 1. Tạo Context Object
// Giá trị mặc định là undefined, và chúng ta sẽ kiểm tra nó trong hook sử dụng
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Custom Hook để quản lý logic theme của ứng dụng.
 * Nó sẽ áp dụng class theme lên body của document và lắng nghe thay đổi theme của hệ thống.
 * Theme được lưu vào localStorage để duy trì giữa các phiên.
 *
 * @returns [currentTheme, setThemeFunction] - Trạng thái theme hiện tại và hàm để cập nhật theme.
 */
function useThemeLogic(): [Theme, React.Dispatch<React.SetStateAction<Theme>>, ThemeContextType['resolvedTheme']] {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme: Theme = storedTheme && ['light', 'dark', 'light-medium-contrast', 'light-high-contrast', 'system'].includes(storedTheme)
        ? storedTheme
        : 'system';

    const [theme, setTheme] = useState<Theme>(initialTheme);
    // State để lưu trữ theme đã được giải quyết (resolved theme)
    const [resolvedTheme, setResolvedTheme] = useState<ThemeContextType['resolvedTheme']>(() => {
        // Tính toán resolvedTheme ban đầu
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        if (initialTheme === 'system') {
            return mediaQuery.matches ? 'dark' : 'light';
        }
        return initialTheme as ThemeContextType['resolvedTheme'];
    });


    useEffect(() => {
        // Lắng nghe sự thay đổi theme của hệ thống (dark/light mode)
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = (currentTheme: Theme) => {
            document.body.classList.remove('theme-light', 'theme-dark', 'theme-light-medium-contrast', 'theme-light-high-contrast');

            let classToApply: ThemeContextType['resolvedTheme']; // Kiểu của classToApply là resolvedTheme
            if (currentTheme === 'system') {
                classToApply = mediaQuery.matches ? 'dark' : 'light';
            } else {
                classToApply = currentTheme as ThemeContextType['resolvedTheme']; // Ép kiểu vì currentTheme có thể là 'system'
            }
            document.body.classList.add(`theme-${classToApply}`); // Thêm class đã giải quyết
            localStorage.setItem('theme', currentTheme); // Lưu lựa chọn của người dùng
            setResolvedTheme(classToApply); // Cập nhật resolvedTheme state
        };

        applyTheme(theme);

        const mediaQueryListener = (_e: MediaQueryListEvent) => {
            if (theme === 'system') {
                applyTheme('system');
            }
        };

        mediaQuery.addEventListener('change', mediaQueryListener);

        return () => {
            mediaQuery.removeEventListener('change', mediaQueryListener);
        };
    }, [theme]); // Effect chạy lại mỗi khi 'theme' state thay đổi

    return [theme, setTheme, resolvedTheme]; // Trả về cả resolvedTheme
}

// 2. Tạo ThemeProvider Component
interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme, resolvedTheme] = useThemeLogic(); // Sử dụng Hook logic theme

    // Cung cấp theme, setTheme, và resolvedTheme cho toàn bộ cây component con
    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// 3. Tạo Custom Hook để sử dụng Context
// Hook này sẽ được các component con gọi để lấy theme và setTheme
export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
