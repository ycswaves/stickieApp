export default function (state = [], action) {
  switch (action.type) {
    case 'ADD_STICKIE':
      if (state.find(stickie => stickie.stickieId === action.payload.stickieId)) {
        return state;
      }
      return [...state, action.payload];

    default:
      return state;
  }
}
