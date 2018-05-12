// Two-way binding mapState

export const bindState = (namespace, options) => {
	if(Array.isArray(options)) {
		options = options.reduce((prev, curr) => {
			prev[curr] = {};
			return prev;
		}, {});
	}

	const keys = Object.keys(options);
	return keys.reduce((obj, key) => {
		obj[key] = {
			get() {
				const base = namespace.split('/').reduce((prev, curr) => prev[curr], this.$store.state);

				if(options[key].getter) {
					return options[key].getter(base);
				}

				return base[key];
			},

			set(value) {
				if(options[key].setter){
					return options[key].setter(this.$store, value);
				}

				this.$store.commit(`${namespace}/update`, {label: key, value});
			}
		};

		return obj;
	}, {});
};

export const update = (state, {label, value}) => state[label] = value;
