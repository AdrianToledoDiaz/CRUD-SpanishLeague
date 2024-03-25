// Funciones de acceso a la API de entrenadores.

import { Entrenador } from "~/models/entrenador"

// Obtiene todos los entrenadores
export const getEntrenadores = async (): Promise<Entrenador[]>  => {
    try {
        const response = await fetch('http://localhost:8000/entrenadores/')
        const entrenadores = response.json()
        return entrenadores
    } catch (error) {
        console.error(error)
    }

    return <Entrenador[]><unknown>null
}

// Obtiene todos los entrenadores Españoles
export const getEspana = async (): Promise<Entrenador[]>  => {
    try {
        const response = await fetch('http://localhost:8000/entrenadores/espanoles/')
        const espana = response.json()
        return espana
    } catch (error) {
        console.error(error)
    }

    return <Entrenador[]><unknown>null
}

// Obtiene todos los entrenadores extranjeros
export const getExtranjeros = async (): Promise<Entrenador[]>  => {
    try {
        const response = await fetch('http://localhost:8000/entrenadores/extranjeros/')
        const espana = response.json()
        return espana
    } catch (error) {
        console.error(error)
    }

    return <Entrenador[]><unknown>null
}

// Obtiene todos los entrenadores nacidos a partir de 1970
export const getNacidos1970 = async (): Promise<Entrenador[]>  => {
    try {
        const response = await fetch('http://localhost:8000/entrenadores/nacidos1970/')
        const nacidos =  response.json();
        return nacidos
    } catch (error) {
        console.error(error)
    }

    return <Entrenador[]><unknown>null
}

// Añade un entrenador.
export const addEntrenador = async (entrenador: Entrenador)  => {
    try {
        await fetch('http://localhost:8000/entrenadores/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entrenador),
        })
        
    } catch (error) {
        console.error(error)
    }
}

// Modifica un entrenador.
export const updateEntrenador = async (id: string, entrenador: Entrenador)  => {
    try {
        await fetch(`http://localhost:8000/entrenadores/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entrenador),
        })
        
    } catch (error) {
        console.error(error)
    }
}


// Elimina un entrenador.
export const deleteEntrenador = async (id: string)  => {
    try {
        await fetch(`http://localhost:8000/entrenadores/${id}`,
        {
            method: 'DELETE',
        })
    } catch (error) {
        console.error(error)
    }
}