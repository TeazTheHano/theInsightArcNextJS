import { useTranslation } from "react-i18next";
import { useMemo } from "react";

// Memoized date formatter to avoid recreating Intl.DateTimeFormat instances
const getDateFormatter = (() => {
    const cache = new Map<string, Intl.DateTimeFormat>();
    return (language: string) => {
        const key = language;
        if (!cache.has(key)) {
            cache.set(key, new Intl.DateTimeFormat(language === 'vi' ? 'vi-VN' : 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }));
        }
        return cache.get(key)!;
    };
})();

// Optimized date parsing and validation
const parseAndValidateDate = (date: Date | string | undefined): Date | null => {
    if (!date) return null;

    let dateObj: Date;
    if (typeof date === 'string') {
        dateObj = new Date(date);
    } else {
        dateObj = date;
    }

    // Check if valid date
    return dateObj instanceof Date && !isNaN(dateObj.getTime()) ? dateObj : null;
};

const DateDisplay: React.FC<{ date?: Date | string }> = ({ date }) => {
    const { i18n } = useTranslation();

    const formatted = useMemo(() => {
        const validDate = parseAndValidateDate(date);
        return validDate ? getDateFormatter(i18n.language).format(validDate) : '';
    }, [date, i18n.language]);

    return <p children={formatted} color='currentColor' />;
};

export default DateDisplay;