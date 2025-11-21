'use client';

import { useReportWebVitals } from 'next/web-vitals';

const ReportWebVitals: React.FC = () => {
    useReportWebVitals((metric: any) => {
        console.log(metric); // In ra các chỉ số LCP, FID, CLS
    });

    return null;
};

export default ReportWebVitals;
