angular.module('app', []).controller("dictCtrl", function ($scope, $interval) {

	$scope.word_list = []; // randomly generate 12 words for each game
	$scope.letter = ''; // random letter for each game ("words must start with")
	$scope.countDown = 0; // count down timer for each game
	$scope.totalTime = 120; // default length of each game: 2 minutes

	$interval(() => { $scope.countDown > 0 ? $scope.countDown-- : 0 }, 1000, 0); // tick the timer

	// start a new game: generate word list and a random letter
	$scope.gen = function (entropy) {
		rnd(entropy);
		$scope.letter = getLetter($scope.letter);
		$scope.word_list = [...Array(12).keys()].map(getWord);
		$scope.countDown = $scope.totalTime;
	}

	// JavaScript doesn't have seeded random, so we are simulating one
	let rnd = function () {
		let seed = 735632791; // co-prime with p and q
		const pq = 31883349249899480; // p = 982451653, q = 32452843
		return function (entropy) {
			if (entropy) {
				seed += entropy.trim().toUpperCase().split('').map(
					letter => letter.charCodeAt(0)).reduce(
						(accum, keycode) => accum * 31 + keycode, 7);
			}
			seed = (seed * seed) % pq;
			let x = seed / pq;
			return x;
		}
	}();

	// unit test function to ensure rnd is uniform
	(function () {
		console.log("Testing rnd...");
		let bins = new Map();
		[...Array(1000000).keys()].forEach(() => {
			let r = rnd();
			if (Math.floor(r) == 1) {
				console.log('found 1');
			}
			let k = Math.floor(r * 100);
			if (bins[k]) {
				bins[k] += 1;
			} else {
				bins[k] = 1;
			}
		});

		console.log('bins = %o', bins);

	}); // ();

	// generate a random letter that is different from the letter passed in
	function getLetter(avoid) {
		const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G',
			'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'W'];
		let candidate = avoid;
		while (candidate == avoid) {
			console.log('avoiding ' + avoid);
			candidate = letters[Math.floor(rnd() * letters.length)];
		}
		return candidate;
	}

	// pull a word from the word_bank; use each word once before repeating
	let getWord = function () {
		let list = [];
		return function () {
			console.log('there are %d words in the list', list.length);
			if (!list.length) {
				console.log('restocking...');
				list = word_bank.slice();
			}
			let index = Math.floor(rnd() * list.length);
			return list.splice(index, 1)[0];
		}
	}();

	const word_bank = [
		"A bird", "A boy’s name", "A drink", "A fish", "A girl’s name", "A relative", "A river", "Acronyms", "An animal", "Animal noises", "Animals in books or movies",
		"Appliances", "Authors", "Awards/ceremonies", "Baby foods", "Bad habits", "Beers", "Birds", "Board games", "Bodies of water", "Breakfast foods", "Capitals",
		"Card games", "Cars", "Cartoon characters", "Celebrities", "Children’s books", "Christmas songs", "Cities", "Clothing", "Colleges/Universities", "Colors",
		"Computer parts", "Computer programs", "Cooking utensils", "Cosmetics/Toiletries", "Countries", "Crimes", "Diet foods", "Diseases", "Drugs that are abused",
		"Electronic gadgets", "Ethnic foods", "Excuses for being late", "Famous duos and trios", "Fears", "Fictional characters", "Fish", "Flowers",
		"Food/Drink that is green", "Foods you eat raw", "Footwear", "Foreign list used in English", "Foriegn cities", "Fruits", "Game terms", "Games", "Gifts",
		"Halloween costumes", "Heroes", "Historic events", "Historical Figures", "Hobbies", "Holiday Activities ", "Holidays", "Honeymoon spots", "Household chores",
		"Ice cream flavors", "In the NWT (Northwest Territories, Canada)", "Insects", "Internet lingo", "Items in a catalog", "Items in a kitchen", "Items in a suitcase",
		"Items in a vending machine", "Items in this room", "Items you save up to buy", "Items you take on a road trip", "Kinds of candy", "Kinds of soup", "Leisure activities",
		"Magazines", "Math terms", "Menu items", "Movie titles", "Musical Instruments", "Musical groups", "Musical instruments", "Names used in songs", "Nicknames", "Notorious people",
		"Occupations", "Ocean things", "Offensive list", "Olympic events", "Parks", "Parts of the body", "Personality traits", "Pizza toppings", "Places in Europe", "Places to hangout",
		"Provinces or States", "Reasons to call 911", "Reasons to make a phone call", "Reasons to quit your job", "Reasons to take out a loan", "Reptiles/Amphibians", "Restaurants",
		"Sandwiches", "School subjects", "School supplies", "Seafood", "Software", "Something you keep hidden", "Something you’re afraid oF", "Song titles", "Spices/Herbs", "Spicy foods",
		"Sports", "Sports Stars", "Sports equipment", "Sports equiptment", "Sports played outdoors", "States", "Stones/Gems", "Store names", "TV Shows", "TV Stars", "Television stars",
		"Terms of endearment", "Things at a carnival", "Things at a circus", "Things at a football game", "Things found at a bar", "Things found in New York", "Things found in a desk",
		"Things found in a hospital", "Things in a grocery store", "Things in a medicine cabinet", "Things in a park", "Things in the kitchen", "Things in the sky",
		"Things that are black", "Things that are cold", "Things that are hot", "Things that are round", "Things that are square", "Things that are sticky",
		"Things that can get you fired", "Things that can kill you", "Things that grow", "Things that have buttons", "Things that have spots", "Things that have stripes",
		"Things that have wheels", "Things that jump/bounce", "Things that make you smile", "Things that use a remote", "Things to do at a party", "Things to do on a date",
		"Things with tails", "Things you buy for kids", "Things you do at work", "Things you do everyday", "Things you get in the mail", "Things you get tickets for", "Things you make",
		"Things you replace", "Things you save up to buy", "Things you see at the zoo", "Things you shouldn’t touch", "Things you shout", "Things you sit/on", "Things you store items in",
		"Things you throw away", "Things you wear", "Things you’re allergic to", "Titles people can have", "Tools", "Tourist attractions", "Toys", "Trees", "Types of drinks",
		"Types of weather", "Vacation spots", "Vegetables", "Video games", "Villains", "Ways to get from here to there", "Ways to kill time", "Weapons", "Websites", "Weekend Activities",
		"Wireless things", "Words associated with exercise", "Words associated with money", "Words associated with summer", "Words associated with winter", "Words ending in “-n”", "Words with double letters"
	];
});
