class LoadHook {
	constructor() {
		this.nodes = {};
		this.texts = [];
		this.ignore = /^\s*$/;
	}

	extractText(node) {
		if(this.ignore.test(node.nodeValue)) return;

		const id = Math.random().toString(36).slice(2);
		this.nodes[id] = node;
		return [id, node.nodeValue.trim()];
	}

	traverse(node) {
		const nodeTexts = [];
		node.childNodes.forEach(v => {
			switch(v.nodeName) {
				case '#cdata-section':
				case '#comment':
				case 'script': case 'img': case'map': case 'link':
				case 'style': case 'canvas': case 'video': case 'audio': case 'svg':
				case 'embed': case 'object': case 'iframe':
				break;

				case '#text':
					const extract = hook.extractText(v);
					if(!extract) break;

					nodeTexts.push(extract);
					break;

				case 'a': case 'abbr': case 'acronym': case 'b': case 'bdo': case 'big':
				case 'cite': case 'code': case 'dfn': case 'em': case 'font': case 'i': case 'kbd':
				case 'label': case 'q': case 's': case 'samp': case 'small': case 'span':
				case 'strong': case 'sub': case 'sup': case 'tt': case 'u': case 'var': case'wbr':

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
	}
}

const hook = new LoadHook;
hook.init();
