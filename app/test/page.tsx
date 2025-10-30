"use client"

import { DivFlexColumn } from "@/components/LayoutDiv/LayoutDiv";
import TextField from "@/components/TextInput/TextField";
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
