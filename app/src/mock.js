export default function getMock() {
	return {
		title: "Khinenw's NN FilterSet",
		options: [
			{
				name: 'MatureContentNN',
				description: "Filters Mature Content by neural network.",
				active: false
			},

			{
				name: 'SwearwordsNN',
				description: "Filters Swearwords by neural network.",
				active: false
			},

			{
				name: 'HateSpeechNN',
				description: "Filters Hate Speeches by neural network.",
				active: true
			}
		],
		processor: false
	};
}
