export const slugify = (text: string): string => {
    return text
        .toLowerCase()
        .normalize("NFD")                     // tách dấu
        .replace(/[\u0300-\u036f]/g, "")      // xoá dấu
        .replace(/[^a-z0-9]+/g, "-")          // thay ký tự lạ bằng "-"
        .replace(/^-+|-+$/g, "");             // xoá "-" đầu/cuối
};