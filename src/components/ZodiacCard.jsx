import React, { useState } from 'react'
import './ZodiacCard.css'

import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




function ZodiacCard({ name, date, description, image, CS, GC, altname }) {

    const [flip, setFlip] = useState("flip-card");


    return (

        <div className={`${flip} hover:cursor-pointer`} >
            <div className="flip-card-inner">
                <div class="flip-card-front">
                    {/* Foreground image/icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Replace 'YourIcon' with the actual Material-UI icon component */}
                        <img className='opacity-30 object-cover' src={image} alt="" srcset="" />
                    </div>

                    <h2 className="text-2xl font-semibold">{name}</h2>
                    <p className="text-gray-600 ">({altname})</p>
                    <p className="text-gray-700 mt-2">{description}</p>
                    

                </div>

                <div className="flip-card-back flex flex-col justify-between">
                    <IconButton onClick={() => setFlip("flip-card")} sx={{ width: 20, height: 20, p: 1 }}>
                        <ArrowBackIcon sx={{ height: 25, width: 25 }} />
                    </IconButton>

                    
                    <Button size='small' color='warning' variant='contained' sx={{ color: "white", width: "50%", marginX: "auto", p: 1, marginBottom: 1 }}>View more</Button>
                </div>
            </div>
        </div>
    );
}

export default ZodiacCard
