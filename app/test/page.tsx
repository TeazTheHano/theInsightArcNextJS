"use client"

import { DivFlexColumn } from '../../components/LayoutDiv/LayoutDiv';
import ModalExample from '../../hooks/useModal.example';

export default function Test() {

    return (
        <DivFlexColumn style={{ margin: 'var(--PAGE-Prop-Body-margin)', gap: 'var(--Spacing-Spacing-M)' }}>
            <ModalExample />
        </DivFlexColumn>
    )
}
