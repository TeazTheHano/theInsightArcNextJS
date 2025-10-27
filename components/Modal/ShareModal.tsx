"use client"

import React, { useState } from "react";
import Button from "../Button/Button";
import { useModal } from "../../hooks/useModal";
import { DivFlexRow } from "../LayoutDiv/LayoutDiv";

interface ShareModalProps {
    title?: string;
    url?: string; // nếu không truyền, sẽ lấy window.location.href
}

const ShareModal: React.FC<ShareModalProps> = ({ title, url }) => {
    const { closeTopModal } = useModal();
    const [copied, setCopied] = useState(false);

    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    const openWindow = (shareLink: string) => {
        window.open(shareLink, "_blank", "noopener,noreferrer,width=600,height=600");
    };

    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title || "Xem bài viết này!");

    const shareOptions = [

        {
            name: "Facebook",
            onClick: () => openWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`),
            icon: "facebook_color",
        },
        {
            name: "Threads",
            onClick: () => openWindow(`https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`),
            icon: "threads_logo",
        },
        {
            name: "X (Twitter)",
            onClick: () => openWindow(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`),
            icon: "x_logo",
        },
        {
            name: "LinkedIn",
            onClick: () => openWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`),
            icon: "linkedin_color",
        },
        {
            name: copied ? "Copied!" : "Copy Link",
            onClick: handleCopy,
            icon: copied ? "check" : "copy_filled",
        },
        {
            name: "Email",
            onClick: () => (window.location.href = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`),
            icon: "mail_filled",
        },
    ];

    return (
        <DivFlexRow style={{ flexWrap: 'wrap', gap: 'var(--Spacing-Spacing-XS, 8px)', margin: 'var(--Spacing-Spacing-S, 16px) 0' }}>

            {shareOptions.map((opt) => (
                <Button
                    styleMode="Outlined"
                    colorMode="Tertiary"
                    key={opt.name}
                    label={opt.name}
                    onClick={opt.onClick}
                    leadingIcon={opt.icon}
                />
            ))}

        </DivFlexRow>
    );
};

export default ShareModal;