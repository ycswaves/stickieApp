export default function (state = {}, action) {
  const {sections, sectionCount} = state;
  const keyName = 'sections'+sectionCount;
  const newSections = {...sections, [keyName]: action.payload};

  switch (action.type) {
    case 'CREATE_BOARD':
      return action.payload;

    case 'ADD_SECTION':
      return {...state, sectionCount: sectionCount+1, sections: newSections}

    default:
      return state;
  }
}
