import { MockHandler } from 'vite-plugin-mock-server'

const mocks: MockHandler[] = [
  {
    pattern: '/api/form',
    method: 'POST',
    handle: (req, res) => {
    const message = {
        message: 'success',
    }
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(message))
    },
}
]

export default mocks