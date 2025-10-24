/**
 * Các hàm tiện ích cho việc quản lý cache trong localStorage
 */

/**
 * Kiểm tra xem cache có còn hạn không dựa trên thời gian hết hạn (tính bằng giờ)
 * @param key - Khóa của cache trong localStorage
 * @param expireHours - Số giờ cache còn hạn
 * @returns true nếu cache còn hạn, false nếu không
 */
export const isCacheValid = (key: string, expireHours: number): boolean => {
    if (typeof window === 'undefined') return false; // Không có localStorage trên server
    if (!expireHours || expireHours <= 0) return true; // Không hết hạn nếu expireHours <= 0

    const cache = localStorage.getItem(key);
    if (!cache) return false;

    try {
        const { timestamp } = JSON.parse(cache);
        // Tính thời gian đã trôi qua kể từ khi lưu cache
        const elapsed = Date.now() - timestamp;
        // Chuyển expireHours thành milliseconds
        const expireMs = expireHours * 60 * 60 * 1000;
        return elapsed < expireMs;
    } catch {
        // Nếu parse JSON thất bại, coi như cache không hợp lệ
        return false;
    }
};

/**
 * Lưu dữ liệu vào cache localStorage với timestamp hiện tại
 * @param key - Khóa để lưu cache
 * @param data - Dữ liệu cần lưu
 */
export const saveCache = (key: string, data: any) => {
    if (typeof window === 'undefined') return; // Không lưu cache trên server
    try {
        const cacheData = {
            timestamp: Date.now(),
            data
        };
        localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
        console.warn('Failed to save cache:', error);
    }
};

/**
 * Lấy dữ liệu từ cache nếu còn hạn
 * @param key - Khóa của cache
 * @param expireHours - Số giờ cache còn hạn
 * @returns Dữ liệu cache nếu hợp lệ, null nếu không
 */
export const getCache = (key: string, expireHours: number): any | null => {
    if (typeof window === 'undefined') return null; // Không có cache trên server
    try {
        if (isCacheValid(key, expireHours)) {
            const cache = localStorage.getItem(key);
            if (cache) {
                return JSON.parse(cache).data;
            }
        }
    } catch (error) {
        console.warn('Failed to get cache:', error);
    }
    return null;
};
