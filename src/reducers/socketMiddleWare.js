const URL = window.location.href
let socketUrl
if (URL.match('heroku') !== null) {
  socketUrl ='http://stickies-app-server.herokuapp.com'
} else {
  socketUrl = 'http://localhost:8080'
}

const socket = require('socket.io-client')(socketUrl)
export default function() {
  return next => action => {
    switch (action.type) {
      case "ADD_STICKIE":
      case "ADD_SECTION":
        socket.emit('sendMessage', action);
        break;

      case "CREATE_BOARD":
        // if (store.getState().board.userId == userId) {
          socket.emit('createRoom', action);
        // }
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
  socket.on('broadcastMessageToRoom', action => {
    console.log('broadcast=======> ', action);
    if (action.payload.userId !== localStorage.getItem('userId')) {
      store.dispatch(action);
    }
  })

  socket.on('sendMessage', action => {
      store.dispatch(action);
  })

  socket.on('recreateBoard', action => {
      store.dispatch(action);
  })

  socket.on('connectToRoom', stickiesArr => {
    console.log(stickiesArr)
    stickiesArr.forEach(addStickie => store.dispatch(addStickie));
  })
}
