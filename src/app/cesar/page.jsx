"use client"

import { Box, Divider, TextField, Typography, Switch, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'

const ALPHABET_ES = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
const ALPHABET_US = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function Page() {

  const [textoCifrar, setTextoCifrar] = useState('')
  const [textoCifrado, setTextoCifrado] = useState('')
  const [textoDecifrar, setTextoDecifrar] = useState('')
  const [textoDecifrado, setTextoDecifrado] = useState('')
  const [desplazamiento, setDesplazamiento] = useState(0)
  const [desplazamiento2, setDesplazamiento2] = useState(0)

  const [isUS, setIsUS] = useState(false)

  const cifrar = (texto, desplazamiento) => {

    const alphabet = isUS ? ALPHABET_US : ALPHABET_ES

    const newText = texto.toUpperCase().split('').map((char, index) => {

      if (char === ' ') return ''
      const alphabetLenght = alphabet.length
      const charIndex = alphabet.indexOf(char) + parseInt(desplazamiento)
      const newCharIndex = ((charIndex % alphabetLenght) + alphabetLenght) % alphabetLenght
      const newChar = alphabet[newCharIndex]

      return newChar

    })

    setTextoCifrado(newText.join(''))

  }

  const modulo = (n, m) => {
    return ((n % m) + m) % m
  }

  const decifrar = (texto, dp) => {

    const alphabet = isUS ? ALPHABET_US : ALPHABET_ES

    const newText = texto.toUpperCase().split('').map((char, index) => {

      console.log(char, dp)

      if (char === ' ') return ''

      const alphabetLenght = alphabet.length
      const charIndex = alphabet.indexOf(char) - parseInt(dp)
      const newCharIndex = modulo(charIndex, alphabetLenght)
      const newChar = alphabet[newCharIndex]

      return newChar
    })

    setTextoDecifrado(newText.join(''))

  }

  useEffect(() => {

    cifrar(textoCifrar, desplazamiento)

  }, [textoCifrar, desplazamiento, isUS])

  useEffect(() => {

    decifrar(textoDecifrar, desplazamiento2)

  }, [textoDecifrar, desplazamiento2, isUS])


  return (
    <Box component={'section'}>
      <Stack direction={'row'} alignItems={'center'}>
        <Typography variant='h2' flexGrow={1}>César</Typography>
        <Box>
          <Typography variant='body1' textAlign={'center'}>{isUS ? 'US' : 'ES'}</Typography>
          <Switch onChange={e => setIsUS(!isUS)} />
        </Box>
      </Stack>
      <Divider />

      <Typography variant='h4' textAlign={'end'}>Cifrado</Typography>
      <Typography variant='body1'>
        El cifrado César es una técnica de cifrado muy simple y probablemente una de las primeras técnicas de cifrado.
        Es un tipo de cifrado por sustitución en el que una letra en el texto original es reemplazada por una letra que se encuentra un número fijo de posiciones más adelante en el alfabeto.
        Por ejemplo, con un desplazamiento de 1, la A sería sustituida por la B, la B se convertiría en C, y así sucesivamente.
      </Typography>
      <TextField label='Texto' variant='outlined' margin='normal' fullWidth multiline rows={5} onChange={e => setTextoCifrar(e.target.value)} value={textoCifrar} />
      <TextField label='Desplazamiento' variant='outlined' margin='normal' fullWidth type='number' onChange={e => { if (e.target.value >= 0) setDesplazamiento(e.target.value) }} value={desplazamiento} />
      <TextField label='El texto cifrado aparecerá aquí' variant='outlined' margin='normal' fullWidth multiline rows={5} onChange={e => setTextoCifrado(e.target.value)} value={textoCifrado} disabled />

      <Divider />

      <Typography variant='h4' textAlign={'end'}>Descifrado</Typography>

      <TextField label='Texto Cifrado' variant='outlined' margin='normal' fullWidth multiline rows={5} onChange={e => setTextoDecifrar(e.target.value)} value={textoDecifrar} />
      <TextField label='Desplazamiento' variant='outlined' margin='normal' fullWidth type='number' onChange={e => { if (e.target.value >= 0) setDesplazamiento2(e.target.value) }} value={desplazamiento2} />
      <TextField label='El texto decifrado aparecerá aquí' variant='outlined' margin='normal' fullWidth multiline rows={5} onChange={e => setTextoDecifrado(e.target.value)} value={textoDecifrado} disabled />


    </Box>
  )
}

export default Page