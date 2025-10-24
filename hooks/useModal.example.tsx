"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useModal } from './useModal';
import Button from '../components/Button/Button';
import type { ModalDescriptor } from './useModal';

/**
 * Ví dụ sử dụng useModal hook.
 * Component này minh họa cách mở và quản lý nhiều modal độc lập với nội dung động.
 */
const ModalExample: React.FC = () => {
    const { openModal, closeTopModal, modalStack } = useModal();
    const [count, setCount] = useState<number>(1);
    const modalUpdateRef = useRef<((updates: Partial<ModalDescriptor>) => void) | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startCount = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setCount(c => {
                console.log(c + 1);
                return c + 1;
            });
        }, 500);
    }, []);

    const stopCount = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (modalUpdateRef.current) {
            modalUpdateRef.current({
                element: () => (
                    <div>
                        <p>Count: {count}</p>
                        <Button label='+c' onClick={startCount} />
                        <Button label='Stop' onClick={stopCount} />
                    </div>
                )
            });
        }
    }, [count, startCount, stopCount]);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Hàm mở modal đơn giản
    const handleOpenSimpleModal = useCallback(() => {
        openModal({
            props: {
                title: 'Modal Đơn Giản',
                sizeMode: 'fit',
                primaryAction: <Button label='close top' onClick={() => closeTopModal()} />,
                bgDark: true
            },
        });
    }, [openModal, closeTopModal]);

    const handleOpenCustomModal = useCallback(() => {
        const { update } = openModal({
            element: () => (
                <div>
                    <p>Count: {count}</p>
                    <Button label='+c' onClick={startCount} />
                    <Button label='Stop' onClick={stopCount} />
                </div>
            ),
            props: {
                title: 'Modal động theo state',
                sizeMode: 600,
            },
        });
        modalUpdateRef.current = update;
    }, [openModal, count, startCount, stopCount]);

    return (
        <div style={{ padding: '20px' }}>
            <h1> {count}</h1>
            <h2>Ví dụ sử dụng useModal</h2>
            <p>Số modal đang mở: {modalStack.length}</p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Button label="Mở Modal Đơn Giản" onClick={handleOpenSimpleModal} />
                <Button label="Mở Modal Tùy Chỉnh" onClick={handleOpenCustomModal} />
                <Button label='+c' onClick={startCount} />
                <Button label='Stop' onClick={stopCount} />
            </div>
        </div>
    );
};

export default ModalExample;
