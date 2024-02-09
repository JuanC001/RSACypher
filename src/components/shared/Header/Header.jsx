import React from 'react'

import { AppBar, Button, Stack, Toolbar } from '@mui/material'
import Link from 'next/link'

import styles from './Header.module.css'

export const Header = () => {

    const handleRedirect = (path) => {
        console.log('click', path)
        redirect(path)
    }

    return (
        <header>
            <AppBar>
                <Toolbar>
                    <Stack gap={3} direction='row'>
                        <Link href='/' className={styles.Button__appbar} >
                            Home
                        </Link>
                        <Link href='/cesar' className={styles.Button__appbar}>
                            Cesar
                        </Link>
                        <Link href='/vigeniere' className={styles.Button__appbar}>
                            Vigeniere
                        </Link>
                        <Link href='/rsa' className={styles.Button__appbar}>
                            RSA
                        </Link>

                        <a href='https://criptoanalisis-test.vercel.app/' className={styles.Button__appbar}>Afin</a>

                    </Stack>

                </Toolbar>
            </AppBar>
        </header >
    )
}
