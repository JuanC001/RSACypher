import { Box, Divider, Typography } from '@mui/material';
import React from 'react'

function page() {
    const isPrime = (num) => {
        if (num === 2) return true;
        if (num < 2 || num % 2 === 0) return false;
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) return false;
        }
        return true;
    }

    const cifradoRsa = () => {

        let p = 0;
        let q = 0;
        let n = 0;

        let phi = 0;
        let e = 0;

        let bool = true;

        while (bool) {
            p = Math.floor(Math.random() * 100);
            q = Math.floor(Math.random() * 100);

            if (isPrime(p) && isPrime(q)) {
                bool = false;
            }

        }

        console.log(p);
        console.log(q);

    }
    return (
        <Box component={'section'}>
            <Typography variant='h1'>RSA</Typography>
            <Divider />
        </Box>
    )
}

export default page