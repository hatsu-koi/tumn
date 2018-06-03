const insertAfter = (node, appendingNode) => {
	if(node.nextSibiling) {
		node.parentNode.insertBefore(appendingNode, node.nextSibiling);
		return;
	}

	node.parentNode.appendChild(appendingNode);
};

class HookInject {
	constructor() {
		this.nodes = {};
		this.ignore = /^\s*$/;
		this.mockSending = [];
	}

	extractText(node) {
		if(this.ignore.test(node.nodeValue)) return;
		if(node.$TUMN_ID) return;

		const id = Math.random().toString(36).slice(2);
		this.nodes[id] = node;

		node.$TUMN_ID = id;
		return [id, node.nodeValue.trim()];
	}

	sendExtracted(extracted) {
		this.mockSending.push(extracted);
	}

	remapText(mapped) {
		mapped.forEach(([id, texts]) => {
			this.nodes[id].nodeValue = '';

			texts.forEach(v => {
				let node = null;

				if(Array.isArray(v)) {
					node = document.createElement('span');
					node.classList.add('Tumn__AbuseFilter');
					node.innerText = v[0];
					node.appendChild(document.createElement('span'))
				} else {
					node = document.createTextNode(v);
				}

				insertAfter(node, this.nodes[id]);
			});
		});
	}

	dispose() {
		delete window.$TUMN_HOOK;
	}

	registerHook(Hook) {
		const hook = new Hook;
		hook.init();
	}
}

window.$TUMN_HOOK = new HookInject();
