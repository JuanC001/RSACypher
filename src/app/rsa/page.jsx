"use client"
import { Box, Button, Divider, Grid, Table, TableCell, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import bigInt from 'big-integer';

function Page() {

    const [textoCifrar, settextoCifrar] = useState('')
    const [textoCifrado, settextoCifrado] = useState('')

    const [p, setP] = useState(0)
    const [q, setQ] = useState(0)
    const [e, setE] = useState(0)
    const [n, setn] = useState(0)

    const [phi_n, setphi_n] = useState(0)

    const [usingCypher, setUsingCypher] = useState(false)

    const cifradoRsa = async () => {


        setUsingCypher(true)
        const res = await fetch('/api/rsa/cypher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ textoCifrar }),
        }).then(res => res.json())

        const { p, q, n, phi_n, e } = res
        setP(p)
        setQ(q)
        setphi_n(phi_n)
        setE(e)
        setn(n)
        setUsingCypher(false)

    }
    return (
        <Box>
            <Typography variant='h1'>RSA</Typography>
            <Divider />

            <Box>
                <Typography variant='h3' textAlign={'end'}>Cifrado</Typography>

                <TextField label='Texto a cifrar' variant='outlined' margin='normal' fullWidth multiline rows={5} onChange={e => settextoCifrar(e.target.value)} />
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <TextField label='P' variant='outlined' margin='normal' value={p} disabled multiline rows={3} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField label='Q' variant='outlined' margin='normal' value={q} disabled multiline rows={3} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField label='E' variant='outlined' margin='normal' value={e} disabled multiline rows={3} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField label='Phi' variant='outlined' margin='normal' value={phi_n} disabled multiline rows={3} />
                    </Grid>
                </Grid>

                <TextField label='n' variant='outlined' margin='normal' value={n} fullWidth disabled />

                <TextField label='Texto Cifrado' variant='outlined' margin='normal' fullWidth multiline rows={5} />
                <Button onClick={cifradoRsa} disabled={usingCypher} variant='outlined'>
                    {usingCypher ? 'Cifrando...' : 'Cifrar'}
                </Button>
            </Box>

            <Divider />
            <Typography variant='h3' textAlign={'end'}>Decifrado</Typography>


        </Box>
    )
}

export default Page