"use client"

import {  DivFlexColumn  } from '@/packages/shared/ui/ARC_layout';
import TextField from '@/packages/shared/ui/ARC_text_input/TextField';
import ModalExample from "@/hooks/useModal.example";


export default function Test() {

    return (
        <DivFlexColumn style={{ margin: 'var(--PAGE-Prop-Body-margin)', gap: 'var(--Spacing-Spacing-M)' }}>
            <TextField 
                onChange={()=>{}}
                placeholder="Search"
                widthMode="number"
                widthModeNumber={600}
                leadingIcon="search"
                trailingIcon="search"
                trailingIconAction={()=>{}}
            />
        </DivFlexColumn>
    )
}
