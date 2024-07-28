import WebSocket from 'ws'
import {EventEmitter} from 'events'

const wss = new WebSocket.Server({ port: 3001 });
const ee = new EventEmitter()

export function send(data:any){
    ee.emit('data',data)
}

wss.on('connection', (ws) => {
    
  ee.on('data',(state) => {
    if (state.changed) {
      ws.send(JSON.stringify(state.value));
    }
  });
});
