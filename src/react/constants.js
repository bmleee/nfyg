export const Display = {
	MOBILE: 'display is mobilde',
	TABLET: 'display is tablet',
	DESKTOP: 'display is desktop',
};

export const SelectOptions = {
	ProjectCategory: [
		{ value: 'life-style', label: '라이프 스타일' },
		{ value: 'beauty', label: '뷰티' },
		{ value: 'health', label: '건강' },
		{ value: 'culture', label: '문화' },
	],

	ProjectState:  [
		{ "value": "in-progress", "label": "진행중" },
		{ "value": "preparing", "label": "준비중" },
		{ "value": "completed", "label": "완료" },
	],

	QnA: [
		{ "value": "to-all", "label": "모두에게" },
		{ "value": "to-creator", "label": "창작자에게" }
	],

	Ranking: [
		{ "value": "support_at", "label": "최신순" },
		{ "value": "likes", "label": "좋아요순" },
		{ "value": "money", "label": "금액순" }
	],

	Reward: [
		{value: true, label: '직접 후원'},
		{value: false, label: '간접 후원'}
	],
	
	Artwork: [
		{ "value": true, "label": "판매완료" },
		{ "value": false, "label": "판매중" },
	],

}
