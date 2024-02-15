import bigInt from "big-integer";
import { NextResponse } from "next/server";

export async function POST(req, res) {

    let { textoDecifrar, d, n } = await req.json()

    console.log('Decifrando:')
    console.log(textoDecifrar)

    textoDecifrar = textoDecifrar.split(' ')
    let textoDecifrado = ''
    textoDecifrar.forEach(e => {
        let c = bigInt(e)
        let m = c.modPow(d, n)
        textoDecifrado += String.fromCharCode(m)
    })

    console.log('Texto decifrado:')
    console.log(textoDecifrado)

    return NextResponse.json({ textoDecifrado });

}