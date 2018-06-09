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
		chrome.runtime.sendMessage({
			type: 'QUERY',
			body: {
				extracted
			}
		}, resp => {
			resp.forEach(([id, stack]) => {
				if(stack.length > 0) {
					const text = this.nodes[id].nodeValue;
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

					this.remapText(id, exportText);
				}
			});
		});
	}

	remapText(id, texts) {
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
