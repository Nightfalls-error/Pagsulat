// Fetch the JSON file and set up the randomizer logic
fetch('slang-words.json')
    .then(response => response.json())
    .then(data => {
        const slangWords = data;

        // Helper function: Returns a random element with weights
        function getRandomWeighted() {
            let weightedArray = [];

            // Add words to the array multiple times to increase their chance
            slangWords.forEach(slang => {
                // The higher the weight, the more likely the word is selected
                const weight = Math.random() < 0.8 ? 1 : 2; // 80% chance for weight 1, 20% for weight 2
                for (let i = 0; i < weight; i++) {
                    weightedArray.push(slang);
                }
            });

            // Select a random item from the weighted array
            const randomIndex = Math.floor(Math.random() * weightedArray.length);
            return weightedArray[randomIndex];
        }

        // Event listener for the "Generate Random Slang" button
        const button = document.getElementById('randomizeButton');
        const slangWordDisplay = document.getElementById('slangWord');
        const slangMeaningDisplay = document.getElementById('slangMeaning');

        button.addEventListener('click', () => {
            const randomSlang = getRandomWeighted();
            slangWordDisplay.textContent = randomSlang.word;
            slangMeaningDisplay.textContent = randomSlang.meaning;
        });
    })
    .catch(error => {
        alert('Slang words are still loading. Please try again.');
        console.error('Error fetching slang words:', error);
    });
