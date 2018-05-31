const findSet = (state, name, id) => {
	return state[name].find(v => v.id === id);
};

const findElem = (state, name, id, elemId) => {
	const elemSet = findSet(state, name, id);
	if(!elemSet) return null;

	return elemSet.options.find(v => v.id === elemId);
};

export const addElem = name => (state, {id, elem}) => {
	const elemSet = findSet(state, name, id);
	if(!elemSet) return;

	elemSet.options.push(elem);
};

export const updateElem = name => (state, {id, elemId, key, value}) => {
	if(!id) id = elemId.split('.')[0];

	const elem = findElem(state, name, id, elemId);
	if(!elem) return;

	elem[key] = value;
};

export const activateElem = () => (state, {elemId, active}) => {
	if(active !== undefined && !active) {
		deactivateElem()(state, {elemId});
		return;
	}

	if(!state.active.includes(elemId))
		state.active.push(elemId);
};

export const deactivateElem = () => (state, {elemId}) => {
	const elemIndex = state.active.indexOf(elemId);
	if(elemIndex < 0) return;

	state.active.splice(elemIndex, 1);
};

export const removeElem = (name, deactivate=true) => (state, {id, elemId}) => {
	if(!id) id = elemId.split('.')[0];

	const elemSet = findSet(state, name, id);
	if(!elemSet) return;

	const elemIndex = elemSet.options.findIndex(v => v.id === elemId);
	if(elemIndex < 0) return;

	if(deactivate) deactivateElem(name)(state, {elemId});
	elemSet.options.splice(elemId, 1);
};

export const addSet = name => (state, {set}) => {
	state[name].push(set);
};

export const updateSet = name => (state, {id, key, value}) => {
	const elemSet = findSet(state, name, id);
	if(!elemSet) return;

	elemSet[key] = value;
};

export const removeSet = (name, deactivate=true) => (state, {id}) => {
	const setIndex = state[name].findIndex(v => v.id === id);
	if(setIndex < 0) return;

	if(deactivate) {
		const elemSet = state[name][setIndex];
		elemSet.options.forEach(({id}) => {
			deactivateElem(name)(state, {elemId: id});
		});
	}

	state[name].splice(setIndex, 1);
};
