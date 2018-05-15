export const addElem = name => (state, {id, elem}) => {

};

export const updateElem = name => (state, {id, elemId, key, value}) => {
	if(!elemId) elemId = id.split('.')[0];
};

export const removeElem = name => (state, {id, elemId}) => {

};

export const addSet = name => (state, {set}) => {

};

export const updateSet = name => (state, {id, key, value}) => {

};

export const removeSet = name => (state, {id}) => {

};
