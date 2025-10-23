"use client"

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import Modal, { type ModalProps } from '../components/Modal/Modal';

/**
 * Mô tả một modal trong stack.
 * ModalDescriptor định nghĩa nội dung và thuộc tính của một modal.
 */
export type ModalDescriptor = {
    /** ID duy nhất của modal. Nếu không cung cấp, sẽ tự động tạo. */
    id?: string;
    /** Nội dung React element của modal. Có thể là ReactNode hoặc hàm trả về ReactNode. */
    element?: ReactNode | (() => ReactNode);
    /** Các props bổ sung cho Modal component. */
    props?: Partial<ModalProps>;
};

/**
 * Kiểu dữ liệu cho ModalContext.
 * Cung cấp các hàm để quản lý stack modal.
 */
type ModalContextType = {
    /** Mở một modal mới và trả về ID và hàm update của nó. */
    openModal: (m: ModalDescriptor) => { id: string; update: (updates: Partial<ModalDescriptor>) => void };
    /** Đóng modal trên cùng của stack. */
    closeTopModal: () => void;
    /** Đóng modal theo ID. */
    closeModalById: (id: string) => void;
    /** Xóa tất cả modal trong stack. */
    clearModals: () => void;
    /** Cập nhật nội dung modal theo ID. */
    updateModal: (id: string, updates: Partial<ModalDescriptor>) => void;
    /** Stack hiện tại của các modal. */
    modalStack: ModalDescriptor[];
};

/**
 * Context để quản lý trạng thái modal trên toàn ứng dụng.
 * Sử dụng React Context để cung cấp các hàm quản lý modal cho các component con.
 */
const ModalContext = createContext<ModalContextType | undefined>(undefined);

/**
 * ModalProvider component.
 * Bọc các component con để cung cấp khả năng quản lý modal.
 * Sử dụng stack để hỗ trợ nhiều modal cùng lúc, với modal trên cùng là active.
 */
export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [stack, setStack] = useState<ModalDescriptor[]>([]);

    /**
     * Mở một modal mới.
     * Thêm modal vào stack và trả về ID và hàm update của nó.
     * @param m - Mô tả modal cần mở.
     * @returns Object chứa ID và hàm update của modal vừa mở.
     */
    const openModal = useCallback((m: ModalDescriptor): { id: string; update: (updates: Partial<ModalDescriptor>) => void } => {
        const id = m.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        setStack(prev => [...prev, { ...m, id }]);
        const update = (updates: Partial<ModalDescriptor>) => updateModal(id, updates);
        return { id, update };
    }, []);

    /**
     * Đóng modal trên cùng của stack.
     * Nếu stack rỗng, không làm gì.
     */
    const closeTopModal = useCallback((): void => {
        setStack(prev => prev.length > 0 ? prev.slice(0, -1) : prev);
    }, []);

    /**
     * Đóng modal theo ID.
     * Nếu ID không tồn tại, ghi log cảnh báo nhưng không throw error.
     * @param id - ID của modal cần đóng.
     */
    const closeModalById = useCallback((id: string): void => {
        setStack(prev => {
            const exists = prev.some(m => m.id === id);
            if (!exists) {
                console.warn(`Modal with id "${id}" not found in stack.`);
                return prev;
            }
            return prev.filter(m => m.id !== id);
        });
    }, []);

    /**
     * Xóa tất cả modal trong stack.
     */
    const clearModals = useCallback((): void => {
        setStack([]);
    }, []);

    /**
     * Cập nhật nội dung modal theo ID.
     * Nếu ID không tồn tại, ghi log cảnh báo nhưng không throw error.
     * @param id - ID của modal cần cập nhật.
     * @param updates - Các thuộc tính cần cập nhật.
     */
    const updateModal = useCallback((id: string, updates: Partial<ModalDescriptor>): void => {
        setStack(prev => {
            const exists = prev.some(m => m.id === id);
            if (!exists) {
                console.warn(`Modal with id "${id}" not found in stack. Cannot update.`);
                return prev;
            }
            return prev.map(m => m.id === id ? { ...m, ...updates } : m);
        });
    }, []);

    return (
        <ModalContext.Provider value={{ openModal, closeTopModal, closeModalById, clearModals, updateModal, modalStack: stack }}>
            {children}
            {/* ModalHost: Render các modal từ stack, modal trên cùng là active */}
            {stack.map((m, idx) => (
                <Modal
                    key={`${m.id}-${idx}`}
                    open
                    onClose={() => closeModalById(m.id!)}
                    isTop={idx === stack.length - 1}
                    {...m.props}
                >
                    {typeof m.element === 'function' ? m.element() : m.element}
                </Modal>
            ))}
        </ModalContext.Provider>
    );
};

/**
 * Hook để sử dụng ModalContext.
 * Phải được sử dụng trong ModalProvider.
 * @returns ModalContextType chứa các hàm quản lý modal.
 */
export const useModal = (): ModalContextType => {
    const ctx = useContext(ModalContext);
    if (!ctx) {
        throw new Error('useModal must be used inside ModalProvider. Wrap your app with <ModalProvider>');
    }
    return ctx;
};
