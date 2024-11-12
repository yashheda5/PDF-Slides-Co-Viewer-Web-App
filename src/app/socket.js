import {io} from 'socket.io-client'

const URL = 'https://pdf-slides-co-viewer-web-app-wqee-backend-2gexkrl57.vercel.app/'

export const socket = io(URL,{
    autoConnect: false
})
