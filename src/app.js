document.addEventListener('DOMContentLoaded', () => {
	// card options
	const cardArr = [
		{
			name: 'fries',
			img: 'src/images/fries.png',
		},
		{
			name: 'cheeseburger',
			img: 'src/images/cheeseburger.png',
		},
		{
			name: 'ice-cream',
			img: 'src/images/ice-cream.png',
		},
		{
			name: 'pizza',
			img: 'src/images/pizza.png',
		},
		{
			name: 'milkshake',
			img: 'src/images/milkshake.png',
		},
		{
			name: 'hotdog',
			img: 'src/images/hotdog.png',
		},
		{
			name: 'fries',
			img: 'src/images/fries.png',
		},
		{
			name: 'cheeseburger',
			img: 'src/images/cheeseburger.png',
		},
		{
			name: 'ice-cream',
			img: 'src/images/ice-cream.png',
		},
		{
			name: 'pizza',
			img: 'src/images/pizza.png',
		},
		{
			name: 'milkshake',
			img: 'src/images/milkshake.png',
		},
		{
			name: 'hotdog',
			img: 'src/images/hotdog.png',
		},
	];

	cardArr.sort(() => 0.5 - Math.random()); // 0.5 - (0 ~ 1) = (+ or -); (for randomly sorting)
	console.log(cardArr);

	const grid = document.querySelector('.grid');
	const resultDisplay = document.querySelector('#result');
	let cardsChoosen = []; // for pushing (cardArr[cardId].name)
	let cardsChoosenIds = []; // for pushing (cardId)
	let cardsWon = []; // for pushing matched (cardsChoosen)

	function createBoard() {
		for (let i = 0; i < cardArr.length; i++) {
			const card = document.createElement('img');
			card.setAttribute('src', 'src/images/blank.png');
			card.setAttribute('data-id', i);
			card.addEventListener('click', flipCard);
			grid.appendChild(card);
		}
	}

	function flipCard() {
		let cardId = this.getAttribute('data-id'); // this = card from createBoared()
		cardsChoosen.push(cardArr[cardId].name);
		cardsChoosenIds.push(cardId);
		this.setAttribute('src', cardArr[cardId].img); // for overwriting attribute of blank card
		this.style.width = '100px'; // for card styling
		this.style.height = '100px'; // for card styling

		// for preventing double clicking on same card
		if (cardsChoosen.length === 2) {
			setTimeout(checkForMatch, 500);
		}
		console.log(cardsChoosenIds);
	}

	function checkForMatch() {
		const cards = document.querySelectorAll('img'); // for selecting all cards with img tag
		const optionOneId = cardsChoosenIds[0];
		const optionTwoId = cardsChoosenIds[1];

		if (optionOneId === optionTwoId) {
			alert('🐱‍👤 You have clicked the same image! '); // a popup alert
			cards[optionOneId].setAttribute('src', 'src/images/blank.png');
			cards[optionTwoId].setAttribute('src', 'src/images/blank.png');
		}
		// for checking if the name of the two cards is same; cardArr[cardId].name
		else if (cardsChoosen[0] === cardsChoosen[1]) {
			alert('🎉 You have found a match!');
			cards[optionOneId].setAttribute('src', 'src/images/white.png'); // for overwriting revealed cards with white cards
			cards[optionTwoId].setAttribute('src', 'src/images/white.png');
			cards[optionOneId].removeEventListener('click', flipCard); // for preventing reappearance of the previously revealed card if clicked again
			cards[optionTwoId].removeEventListener('click', flipCard);
			cardsWon.push(cardsChoosen); // for storing two matched cards
		}
		// for two consecutive unmatched cards
		else {
			cards[optionOneId].setAttribute('src', 'src/images/blank.png'); // for overwriting revealed cards to blank cards
			cards[optionTwoId].setAttribute('src', 'src/images/blank.png');
			alert('🐱‍🏍 Try again! ');
		}
		cardsChoosen = []; // for clearing array after two unmatched card
		cardsChoosenIds = [];

		resultDisplay.textContent = cardsWon.length; // for displaying score
		// 12 cards = (12 / 2) possible matches
		if (cardsWon.length === cardArr.length / 2) {
			resultDisplay.textContent = '🐱‍💻 You Win!';
		}

		console.log(cardsChoosen);
		console.log(cardsWon);
	}

	createBoard();
});
