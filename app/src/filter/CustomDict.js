class CustomDict {
	constructor(tumn) {
		this.isExtensionFilter = true;
		this.tumn = tumn;
	}

	filter(texts, rule) {
		const exportTextSet = [];

		texts.forEach(textSet => {
			textSet.forEach(([id, text]) => {
				let indexes = [];
				const stack = [];

				this.tumn.store.state.filter.dict.dict.forEach(dictWord => {
					let pos = text.indexOf(dictWord);
					if(pos === -1) return;

					while (pos !== -1) {
						indexes.push(pos, pos + dictWord.length);
					}
				});

				indexes.sort(([s1], [s2]) => s1 - s2);
				indexes.forEach((prev, curr, i) => {
					const firstElem = prev[0];

					if(firstElem[0] < curr[0] && curr[0] < firstElem[1]) {
						firstElem[1] === Math.max(firstElem[1], curr[1]);
					} else {
						stack.push(prev.pop());
					}
				});

				if(stack.length > 0) {
					const exportText = [];
					let lastIndex = 0;

					stack.forEach(([start, end]) => {
						if(lastIndex !== 0) {
							exportText.push(text.substr(lastIndex, start));
						}
						exportText.push([text.substr(start, end)]);
						lastIndex = end;
					});

					if(lastIndex !== text.length - 1) {
						exportText.push(text.slice(lastIndex));
					}
				}
			});
		});
	}
}
