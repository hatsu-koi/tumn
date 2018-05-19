export const removeSet = name => ({commit, state}, {id}) => {
	const elemSet = state[name].find(v => v.id === id);
	if(!elemSet) return;

	elemSet.options.forEach(option => {
		commit('sites/removeRuleContentFromAll', {
			type: name,
			contentId: option.id
		}, {root: true});
	});

	commit('removeSet', {id});
};

export const removeElem = name => ({commit}, {id, elemId}) => {
	commit('sites/removeRuleContentFromAll', {
		type: name,
		contentId: elemId
	}, {root: true});

	commit('removeElem', {id, elemId});
};
