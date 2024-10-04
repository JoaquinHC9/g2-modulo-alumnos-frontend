import React, { useState } from 'react'
import { CursosLayout } from '../layout';
import { CursosResumen, CursosCopiar } from '../views';

export const CursosHome = ( {vista} ) => {
    
    return (
        <CursosLayout>
           
            { vista === 'resumen' 
                ? <CursosResumen /> 
                : <br></br>
            }
        </CursosLayout>
    )
}
