export interface Credentials {
    email?: string
    password?: string
}

interface Response {
    name?: string
    error?: string
}

export async function login ({ email, password }: Credentials) {
    const res = await fetch('https://reqres.in/api/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    return res.json() as Promise<Response>
}