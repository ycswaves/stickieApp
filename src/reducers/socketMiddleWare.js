const socket = require('socket.io-client')('http://stickies-app-server.herokuapp.com/')
export default function() {
  return next => action => {
    switch (action.type) {
      case "ADD_STICKIE":
      case "ADD_SECTION":
        console.log(action);
        socket.emit('sendMessage', action);
        break;

      case "CREATE_BOARD":
        socket.emit('createRoom', action);
        break;

      case "JOIN_ROOM":
        socket.emit('joinRoom', {roomName: action.payload});
        break;

      default:

    }
    return next(action);
  }
}

export function socketListener(store) {
  socket.on('sendMessage', action => {
    store.dispatch(action);
  })
}
