$(document).ready(function () {
    var table = $('#symbolTable').DataTable();
    var geneSymbolsData = window.geneSymbolsData; // Fetch data from global variable set in template

    // Show and hide the loader
    function toggleLoader(show) {
        if (show) {
            $('#loader').removeAttr('hidden');
        } else {
            $('#loader').attr('hidden', true);
        }
    }

    // Populate letters
    function populateLetters() {
        try {
            toggleLoader(true);
            const letters = new Set(
                geneSymbolsData.map(item => {
                    const firstChar = item.symbol.trim().charAt(0); // Get first character
                    return isNaN(firstChar) ? firstChar.toUpperCase() : '0-9'; // Group numbers as "0-9"
                })
            );
            // Sort letters alphabetically, ensuring "0-9" comes first 
            const sortedLetters = Array.from(letters).sort((a, b) => {
                if (a === '0-9') return -1; // "0-9" comes first
                if (b === '0-9') return 1;
                return a.localeCompare(b); // Alphabetical sort for letters
            });
            // Populate letter filter
            const letterFilterContainer = $('.letter-filter');
            letterFilterContainer.empty(); // Clear existing letters
            // Add "All" option
            letterFilterContainer.append('<span data-letter="all" class="active">All</span>');
            // Add rest of the letters
            sortedLetters.forEach(letter => {
                letterFilterContainer.append(`<span data-letter="${letter}">${letter}</span>`);
            });
            // Add click event listeners for filtering
            
            letterFilterContainer.find('span').on('click', function () {
                $('.letter-filter span').removeClass('active');
                $(this).addClass('active');
                const selectedLetter = $(this).data('letter');
                fetchAndDisplayData(selectedLetter);
            });
        } catch (error) {
            console.error('Error populating letters:', error);
        } finally {
            toggleLoader(false);
        }
    }

    // Fetch and display data based on selected character
    function fetchAndDisplayData(character) {
        try {
            // Verify that character is letter, 0-9, or 'all'
            if (!/^[A-Za-z]$|^0-9$|^all$/.test(character)) {
                throw new Error('Invalid character selected');
            }
            toggleLoader(true);
            // Filter data based on selected character
            const filteredData = geneSymbolsData.filter(item => {
                const firstChar = item.symbol.trim().charAt(0).toUpperCase();
                if (character === 'all') {
                    return true;
                } else if (character === '0-9') {
                    return !isNaN(firstChar);
                } else {
                    return firstChar === character;
                }
            });
            table.clear();
            // Populate table with filtered data
            filteredData.forEach(item => {
                table.row.add([
                    item.symbol,
                    item.fullName,
                    `<a href="#" class="gene-linkout" data-identifier="${item.geneModelID}">${item.geneModelID}</a>`
                    
                ]);
            });
            // Draw table
            table.draw();
            toggleLoader(false);            
        } catch (error) {
            console.error('Error fetching data:', error);
            
        }

    }


    

    populateLetters();
    fetchAndDisplayData('all'); // Initially fetch all data


});