import LoadHook from "./LoadHook.hook.js";
import ScrollHook from "./ScrollHook.hook.js";

export default {
	title: "Default HookSet",
	id: "default",
	information: {
		author: "Tumn Developers",
		description: "Default HookSet containing hooks useful on most pages.",
		source: {
			href: "https://github.com/hatsu-koi/tumn",
			text: "https://github.com/hatsu-koi/tumn"
		}
	},
	options: [
		{
			name: 'ScrollHook',
			id: "default.scroll",
			description: "Filters elements in user's screen. Activated at scroll and load."
		},

		{
			name: 'LoadHook',
			id: "default.load",
			description: "Filters all elements when the site is loaded.",
		}
	],
	type: 'hooks'
};

export const source = {
	"default.load": LoadHook,
	"default.scroll": ScrollHook
};
