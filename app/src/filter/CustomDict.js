class CustomDict {
	constructor(tumn) {
		this.isExtensionFilter = true;
		this.tumn = tumn;
	}

	filter(texts) {
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

				exportTextSet.push([id, indexes]);
			});
		});

		return exportTextSet;
	}
}

export default CustomDict;
