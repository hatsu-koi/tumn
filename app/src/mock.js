export function getMock() {
	return [
		{
			title: "Khinenw's NN FilterSet",
			id: "khinenwnn",
			information: {
				author: "Khinenw",
				description: "FilterSet related to things",
				source: {
					href: "https://github.com/hatsu-koi/tumn",
					text: "https://github.com/hatsu-koi/tumn"
				}
			},
			options: [
				{
					name: 'MatureContentNN',
					id: "khinenwnn.maturecontent",
					description: "Filters Mature Content by neural network.",
				},

				{
					name: 'SwearwordsNN',
					id: "khinenwnn.swearwords",
					description: "Filters Swearwords by neural network.",
				},

				{
					name: 'HateSpeechNN',
					id: "khinenwnn.hatespeech",
					description: "Filters Hate Speeches by neural network.",
				}
			],
			type: 'filters',
			version: '1.0.0'
		}
	];
}

export function getMockHooks() {
	return [
		{
			title: "Khinenw's HookSet",
			id: "khinenwhooks",
			options: [
				{
					name: 'ScrollHook',
					id: "khinenwhooks.scroll",
					description: "Filters elements in user's screen. Activated at scroll and load.",
				},

				{
					name: 'LoadHook',
					id: "khinenwhooks.load",
					description: "Filters all elements when the site is loaded.",
				}
			],
			type: 'hooks'
		}
	];
}
