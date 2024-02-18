import bigInt from "big-integer";
import { NextResponse } from "next/server";

export async function POST(req, res) {

    let { textoDecifrar, d, n } = await req.json()

    console.log('Decifrando:')
    console.log(textoDecifrar)
    console.log('d:', d)
    console.log('n:', n)

    textoDecifrar = textoDecifrar.split(' ')
    let textoDecifrado = ''

    console.log('Empieza decifrado:')
    textoDecifrar.forEach(e => {
        let c = bigInt(e)
        let m = c.modPow(d, n)
        //console.log('MODULO + 65:', m.mod(26).add(65), 'CHAR', String.fromCharCode(m.mod(26).add(65)))
        textoDecifrado += String.fromCharCode(m)
        //console.log('CHAR', String.fromCharCode(m), 'M', m)
        //console.log('E:', e, '--> M:', m)
    })

    console.log('Texto decifrado:')
    console.log(textoDecifrado)
    return NextResponse.json({ textoDecifrado });

}