import { v1 } from 'uuid';

export const createBoard = (formData) => {
  return {
    type: 'CREATE_BOARD',
    payload: formData
  };
};

export const addSection = (sectionTitle) => {
  return {
    type: 'ADD_SECTION',
    payload: sectionTitle
  };
};

export const addStickie = (userId, sectionTitle, message) => {
  const stickieId = v1();
  return {
    type: 'ADD_STICKIE',
    payload: {
      stickieId,
      userId,
      sectionTitle,
      message,
      layout: {i: stickieId, x: 0, y: 0, w: 10, h: 1}
    }
  };
};

export const joinRoom = (boardId) => {
  return {
    type: 'JOIN_ROOM',
    payload: boardId
  };
};
