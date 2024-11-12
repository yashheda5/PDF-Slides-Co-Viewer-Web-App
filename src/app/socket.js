import {io} from 'socket.io-client'

// const URL = 'https://pdf-slides-co-viewer-web-app-wqee-backend.vercel.app/'
const URL  = 'http://localhost:3001'

export const socket = io(URL,{
    autoConnect: false
})
