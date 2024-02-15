import bigInt from "big-integer";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req, res) {


    const { textoCifrar } = await req.json()

    console.log('Cifrando:')
    console.log(textoCifrar)

    const isPrime = (num) => {

        const r = bigInt(num).isPrime()
        return r

    }

    const min = "1000000000000000000000000000000000000000000000000"
    const max = "10000000000000000000000000000000000000000000000000"

    let p = 0;
    let q = 0;
    let n = 0;

    let phi_n = 0;
    let e = 0;

    let bool = true;

    while (bool) {

        p = bigInt.randBetween(min, max)
        q = bigInt.randBetween(min, max)

        if (isPrime(p) && isPrime(q)) {
            bool = false;
        }

    }

    n = bigInt(p).multiply(q);
    phi_n = bigInt(p - 1).multiply(q - 1);


    //Calculo de la llave Publica

    console.log('Calculando llave publica...')

    e = bigInt(0);
    while (bigInt.gcd(e, phi_n).notEquals(1)) {
        e = bigInt.randBetween(2, phi_n);
    }

    const clavePublica = { e, n }
    console.log('Llave publica:')
    console.log(clavePublica)

    console.log('Calculando llave privada...')
    //Calculo de la llave Privada
    // x * e mod (Phi(n)) = 1
    let d = bigInt(e).modInv(phi_n);

    const clavePrivada = { d, n }


    console.log('Cifrando?')
    const textoCifrado = textoCifrar.split('').map((c) => {
        console.log(c)
        const m = bigInt(c.charCodeAt(0));
        const r = m.modPow(e, n);
        return r;
    })

    console.log('Cifrado:')
    console.log(textoCifrado)


    return NextResponse.json({ p, q, n, phi_n, e, clavePublica, clavePrivada, });
}