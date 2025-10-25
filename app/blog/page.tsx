"use client"

import { useTranslation } from "react-i18next";

export default function BlogPage() {
  const { t } = useTranslation('common');
  return (
    <div>

      <p>Blogpage</p>
      <p>{t('footer-item-1')}</p>

    </div>
  )
}
