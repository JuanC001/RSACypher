
import { NextResponse } from "next/server"

export async function POST(req, res) {

    const { textoCifrado, num = 3 } = await req.json()
    const alphabet_es = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
    const alphabet_en = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    const separarTexto = (texto, separador) => {
        let separado = "";
        for (let i = 0; i < texto.length; i++) {
            separado += texto[i];
            if ((i + 1) % separador === 0 && i !== texto.length - 1) {
                separado += ' ';
            }
        }

        return separado.split(" ");
    }

    const splitText = (texto, num) => {

        let text = texto.toUpperCase();
        let listas = []
        let splittedText = []
        for (let i = 0; i < num; i++) {

            for (let j = 0; j < text.length; j += num) {
                splittedText.push(text.slice(j, j + num))
            }
            //delete the first character
            text = text.slice(1)
            listas.push(splittedText)

        }

        return splittedText

    }

    const cantidades = (splittedText, num) => {

        let cantidades = []

        for (let i = 0; i < splittedText.length; i++) {
            let cantidad = 0
            for (let j = 0; j < splittedText.length; j++) {
                if (splittedText[i] === splittedText[j]) {
                    cantidad++
                }
            }
            if (cantidad >= 2) {
                //cantidad = [[cantidad, nombre]]
                cantidades.push([cantidad, splittedText[i]])
            }
        }
        return cantidades

    }

    const contarRepetidos = (texto, cantidades, num) => {

        console.log(num)
        //[[cantidad, nombre], [cantidad, nombre],...]
        console.log(cantidades)
        console.log(texto)

        const textoCifrado = texto


        for (let i = 0; i < cantidades.length; i++) {
            const textFind = cantidades[i][1]
            console.log("Buscando: ", textFind)
            const posiciones = []
            for (let j = 0; j < textoCifrado.length; j++) {
                //encontrar textfind en el textoCifrado y calcular la distancia entre cada punto
                const grupo = textoCifrado.slice(j, j + textFind.length)
                if (grupo === textFind) {
                    posiciones.push(j + textFind.length)

                }

            }
            console.log("Posiciones de para " + textFind, posiciones)
        }


    }

    const decypher = (texto, num = 3) => {

        const textoSplit = splitText(texto, 3)
        const cantidadesv = cantidades(textoSplit, 3)
        console.log(textoSplit)
        console.log(cantidadesv)
        const contado = contarRepetidos(texto, cantidadesv, 3)



        return ''

    }

    const textoDecifrado = decypher(textoCifrado, num)

    console.log(textoDecifrado)

    return NextResponse.json({ textoDecifrado })

}