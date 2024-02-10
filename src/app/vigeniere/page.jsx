"use client"

import { Box, Divider, Stack, Switch, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const ALPHABET_ES = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
const ALPHABET_US = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function Page() {

  const [textoCifrar, setTextoCifrar] = useState('')
  const [textoCifrado, setTextoCifrado] = useState('')
  const [textoDecifrar, setTextoDecifrar] = useState('')
  const [textoDecifrado, setTextoDecifrado] = useState('')
  const [clave, setClave] = useState('')
  const [clave2, setClave2] = useState('')
  const [isUS, setIsUS] = useState(false)

  const removerEspacios = (texto) => {

    return texto.split('').filter(char => char !== ' ').join('')

  }

  const cifrar = (texto, clave) => {
    const alphabet = isUS ? ALPHABET_US : ALPHABET_ES
    const alphabetLenght = alphabet.length
    const claveArray = clave.toUpperCase().split('')
    const textoCorregido = removerEspacios(texto)

    const newText = textoCorregido.toUpperCase().split('').map((char, index) => {

      const charIndex = alphabet.indexOf(char)
      const claveLetter = claveArray[index % claveArray.length]
      const claveIndex = alphabet.indexOf(claveLetter)
      const newCharIndex = (((charIndex + claveIndex) % alphabetLenght) + alphabetLenght) % alphabetLenght
      return alphabet[newCharIndex]

    })
    setTextoCifrado(newText.join(''))
  }

  const decifrar = (texto, clave) => {
    const alphabet = isUS ? ALPHABET_US : ALPHABET_ES
    const alphabetLenght = alphabet.length
    const claveArray = clave2.toUpperCase().split('')
    const textoCorregido = removerEspacios(texto)

    const newText = textoCorregido.toUpperCase().split('').map((char, index) => {

      const charIndex = alphabet.indexOf(char)
      const claveLetter = claveArray[index % claveArray.length]
      const claveIndex = alphabet.indexOf(claveLetter)
      const newCharIndex = (((charIndex - claveIndex) % alphabetLenght) + alphabetLenght) % alphabetLenght
      return alphabet[newCharIndex]

    })
    setTextoDecifrado(newText.join(''))
  }

  useEffect(() => {
    cifrar(textoCifrar, clave)
  }, [isUS, clave, textoCifrar])

  useEffect(() => {
    decifrar(textoDecifrar, clave)
  }, [isUS, clave2, textoDecifrar])

  return (
    <Box component={'section'}>
      <Stack direction={'row'} alignItems={'center'}>
        <Typography variant='h2' flexGrow={1}>Vigenère</Typography>
        <Box>
          <Typography variant='body1' textAlign={'center'}>{isUS ? 'US' : 'ES'}</Typography>
          <Switch onChange={e => setIsUS(!isUS)} />
        </Box>
      </Stack>
      <Divider />
      <Typography variant='h4' textAlign={'end'}>Cifrado</Typography>
      <Typography variant='body1'>
        El cifrado Vigenère es una técnica de cifrado muy simple y probablemente una de las primeras técnicas de cifrado.
        Es un tipo de cifrado por sustitución en el que una letra en el texto original es reemplazada por una letra que se encuentra un número fijo de posiciones más adelante en el alfabeto.
        Por ejemplo, con un desplazamiento de 1, la A sería sustituida por la B, la B se convertiría en C, y así sucesivamente.
      </Typography>
      <TextField label='Texto a cifrar' variant='outlined' margin='normal' fullWidth multiline rows={5} onChange={e => setTextoCifrar(e.target.value)} value={textoCifrar} />
      <TextField label='Clave' variant='outlined' margin='normal' fullWidth onChange={e => setClave(e.target.value)} value={clave} />
      <TextField label='El texto cifrado saldrá aquí' variant='outlined' margin='normal' fullWidth multiline rows={5} value={textoCifrado} disabled />
      <Divider />
      <Typography variant='h4' textAlign={'end'}>Decifrado</Typography>

      <TextField label='Texto a decifrar' variant='outlined' margin='normal' fullWidth multiline rows={5} onChange={e => setTextoDecifrar(e.target.value)}/>
      <TextField label='Clave' variant='outlined' margin='normal' fullWidth onChange={e => setClave2(e.target.value)}/>
      <TextField label='El texto decifrado saldrá aquí' variant='outlined' margin='normal' fullWidth multiline rows={5} value={textoDecifrado} disabled/>
    </Box>
  )
}

export default Page