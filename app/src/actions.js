export const removeSet = name => ({commit, state, setId}) => {
	const elemSet = state[name].find(v => v.id === setId);
	if(!elemSet) return;

	elemSet.options.forEach(option => {
		commit('sites/removeRuleContentFromAll', {
			type: name,
			contentId: option.id
		}, {root: true});
	});

	commit('removeSet', {id: setId});
};

export const removeElem = name => ({commit, setId, elemId}) => {
	commit('sites/removeRuleContentFromAll', {
		type: name,
		contentId: elemId
	}, {root: true});

	commit('removeElem', {id: setId, elemId});
};
