class LoadHook {
	constructor() {
		this.nodes = {};
		this.texts = [];
	}

	traverse(node) {
		const nodeTexts = [];
		node.childNodes.forEach(v => {
			switch(v.nodeName.toLowerCase()) {
				case '#cdata-section':
				case '#comment':
				case 'script': case 'img': case'map': case 'link':
				case 'style': case 'canvas': case 'video': case 'audio': case 'svg':
				case 'embed': case 'object': case 'iframe':
				break;

				case '#text':
					const extract = window.$TUMN_HOOK.extractText(v);
					if(!extract) break;

					nodeTexts.push(extract);
					break;

				case 'a': case 'abbr': case 'acronym': case 'b': case 'bdo': case 'big':
				case 'cite': case 'code': case 'dfn': case 'em': case 'font': case 'i': case 'kbd':
				case 'label': case 'q': case 's': case 'samp': case 'small': case 'span':
				case 'strong': case 'sub': case 'sup': case 'tt': case 'u': case 'var': case'wbr':

				//Although p tag is not inline, I have added p tag because it is used to make a paragraph.
				case 'p':

					nodeTexts.push(...this.traverse(v));
					break;

				default:
					const traverse = this.traverse(v);
					if(traverse.length === 0) break;

					this.texts.push(traverse);
					break;
			}
		});

		return nodeTexts;
	}

	init() {
		this.texts.push(this.traverse(document.body));
		window.$TUMN_HOOK.sendExtracted(this.texts);
	}
}

registerHook(LoadHook);
