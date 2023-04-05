import { Box, TextField } from '@mui/material'
import React from 'react'

interface IUserInputProps {
    onChange: (value: string) => void
}

const UserInput = ({ onChange }: IUserInputProps) => {

    return <Box>
        <TextField
            onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                    onChange();
                }
            }}
            onChange={(ev) => {
                onChange(ev.target.value.toString())
            }}
        />
    </Box>
}