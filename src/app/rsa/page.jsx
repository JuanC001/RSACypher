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

    const [clavePrivada, setClavePrivada] = useState('')
    const [clavePublica, setClavePublica] = useState('')

    const [usingCypher, setUsingCypher] = useState(false)

    const [textoDecifrar, settextoDecifrar] = useState('')
    const [textoDecifrado, settextoDecifrado] = useState('')
    const [d, setD] = useState(0)
    const [N, setN] = useState(0)

    const cifradoRsa = async () => {

        setUsingCypher(true)
        const res = await fetch('/api/rsa/cypher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ textoCifrar }),
        }).then(res => res.json())

        const { p, q, n, phi_n, e, textoCifrado: tC, clavePublica, clavePrivada } = res
        setP(p)
        setQ(q)
        setphi_n(phi_n)
        setE(e)
        setn(n)
        console.log('Cifrando...')
        console.log(tC)
        settextoCifrado(tC)
        setClavePublica(clavePublica)
        setClavePrivada(clavePrivada)
        setUsingCypher(false)

    }

    const decifradoRsa = async () => {
        setUsingCypher(true)
        const res = await fetch('/api/rsa/decypher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ textoDecifrar, d, n }),
        }).then(res => res.json())

        const { textoDecifrado: tD } = res
        console.log('Decifrando...')
        console.log(tD)
        settextoDecifrado(tD)
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
                <TextField label='Clave Privada (d)' variant='outlined' margin='normal' value={clavePrivada} fullWidth disabled multiline rows={2} />
                <TextField label='Clave Publica (e)' variant='outlined' margin='normal' value={clavePublica} fullWidth disabled multiline rows={2} />

                <TextField label='Texto Cifrado' variant='outlined' margin='normal' fullWidth multiline rows={5} disabled value={textoCifrado} />
                <Button onClick={cifradoRsa} disabled={usingCypher} variant='outlined' fullWidth>
                    {usingCypher ? 'Cifrando...' : 'Cifrar'}
                </Button>
            </Box>

            <Divider />
            <Typography variant='h3' textAlign={'end'}>Decifrado</Typography>

            <TextField label='Texto a decifrar' variant='outlined' margin='normal' fullWidth multiline rows={5} onChange={e => settextoDecifrar(e.target.value)} />
            <TextField label='D' variant='outlined' margin='normal' fullWidth multiline rows={5} onChange={e => setD(e.target.value)} />
            <TextField label='N' variant='outlined' margin='normal' fullWidth multiline rows={5} onChange={e => setN(e.target.value)} />
            <TextField label='Texto Decifrado' variant='outlined' margin='normal' fullWidth multiline rows={5} disabled value={textoDecifrado} />

            <Button variant='outlined' fullWidth disabled={usingCypher} onClick={decifradoRsa}>
                Decifrar
            </Button>

        </Box>
    )
}

export default Page