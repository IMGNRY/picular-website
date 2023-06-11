import axios from 'axios'
import { stage } from './utils'

let baseUrl = 'http://192.168.1.112:3001'
if (stage() === 'production') {
    baseUrl = 'https://api.picular.com'
}
if (stage() === 'staging') {
    baseUrl = 'https://api-staging.picular.com'
}

function headers() {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getJWTFromCookie()}`,
        },
    }
}

function getJWTFromCookie() {
    const jwtCookie = document.cookie.split(';').find((c) => c.trim().startsWith('jwt='))

    if (!jwtCookie) {
        return null
    }

    return jwtCookie.split('=')[1]
}

export const api = {
    get: async (endpoint: string) => {
        return await axios.get(`${baseUrl}/api${endpoint}`, headers())
    },
    post: async (endpoint: string, data: any) => {
        return await axios.post(`${baseUrl}/api${endpoint}`, data, headers())
    },
}
