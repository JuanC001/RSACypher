"use client"
import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function Page() {

    const [textoCifrado, setTextoCifrado] = useState('')
    const [num, setNum] = useState(3)
    const [textoDecifrado, setTextoDecifrado] = useState('')

    const breakVigeniere = async () => {

        const res = await fetch('/api/vigeniere', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                textoCifrado: textoCifrado,
                num
            })
        })

        const rex = await res.json()

    }

    return (
        <Box gap={2}>
            <Typography variant='h3' margin={'normal'}>Breaking Vigeniere</Typography>
            <Divider />
            <TextField label='Ciphertext' variant='outlined' fullWidth multiline minRows={5} margin='normal' onChange={e => setTextoCifrado(e.target.value)} />
            <TextField label='Split' variant='outlined' type='number' fullWidth margin='normal' onChange={e => setNum(e.target.value)}/>
            <Button variant='contained' color='primary' fullWidth onClick={breakVigeniere}>Break</Button>

            <Divider />
            <TextField label='Plaintext' variant='outlined' fullWidth multiline minRows={5} margin='normal' value={textoDecifrado} />

        </Box>
    )
}

export default Page