$(document).ready(function () {
    var table = $('#parentageTable').DataTable();

    // Show and hide the loader
    function toggleLoader(show) {
        if (show) {
            $('#loader').removeAttr('hidden');
        } else {
            $('#loader').attr('hidden', true);
        }
    }

    // Fetch and populate letters
    function fetchAndPopulateLetters() {
        toggleLoader(true); // Show loader
        $.ajax({
            url: 'https://app.soybase.org/api/parentage/genotypes',
            method: 'GET',
            success: function (data) {
                const validData = data.slice(1); // Skip the header
                const letters = new Set(
                    validData.map(item => {
                        const firstChar = item[0].trim().charAt(0); // Get the first character
                        return isNaN(firstChar) ? firstChar.toUpperCase() : '0-9'; // Group numbers as "0-9"
                    })
                );

                // Sort letters alphabetically, ensuring "0-9" comes first
                const sortedLetters = Array.from(letters).sort((a, b) => {
                    if (a === '0-9') return -1; // "0-9" comes first
                    if (b === '0-9') return 1;
                    return a.localeCompare(b); // Alphabetical sort for letters
                });

                // Populate the letter filter
                const letterFilterContainer = $('.letter-filter');
                letterFilterContainer.empty(); // Clear existing letters

                // Add the "All" option
                letterFilterContainer.append('<span data-letter="all" class="active">All</span>');

                // Add the rest of the letters
                sortedLetters.forEach(letter => {
                    letterFilterContainer.append(`<span data-letter="${letter}">${letter}</span>`);
                });

                // Add click event listeners for filtering
                letterFilterContainer.find('span').on('click', function () {
                    $('.letter-filter span').removeClass('active');
                    $(this).addClass('active');
                    const selectedLetter = $(this).data('letter');
                    fetchAndDisplayData(selectedLetter, validData);
                });

                // Initially fetch all data
                fetchAndDisplayData('all', validData);
                toggleLoader(false); // Hide loader
            },
            error: function (error) {
                console.error('Error fetching data:', error);
                toggleLoader(false); // Hide loader on error
            }
        });
    }

    // Function to filter and display data
    function fetchAndDisplayData(filterLetter, data) {
        table.clear();

        data.forEach(function (item) {
            const firstChar = item[0].trim().charAt(0).toUpperCase(); // Normalize first character
            const isNumber = !isNaN(firstChar); // Check if the first character is a number
            if (filterLetter === 'all' || (filterLetter === '0-9' && isNumber) || firstChar === filterLetter) {
                const individualLink = `<a href="#" class="individual-link" data-individual="${item[0]}">${item[0] || '-'}</a>`;
                table.row.add([
                    individualLink || '-', // Individual
                    item[1] || '-', // Female Parent
                    item[2] || '-', // Male Parent
                ]);
            }
        });

        table.draw();
    }

    // Attach delegated event listener to handle clicks on dynamically added links
    $('#parentageTable tbody').on('click', '.individual-link', function (e) {
        e.preventDefault();
        const individualName = $(this).data('individual');
        openModal(individualName); // Open the modal and fetch details
    });

    // Open modal and fetch data for an individual
    function openModal(individualName) {
        $('#modal-title').text(`Details for ${individualName}`);
        $('#modal-content').html(`
            <div id="modal-loader" class="uk-flex uk-flex-center uk-flex-middle">
                <div uk-spinner="ratio: 1"></div>
            </div>
        `);

        // Fetch data
        $.ajax({

            url: `https://app.soybase.org/api/parentage?q=${encodeURIComponent(individualName)}`,
            method: 'GET',
            success: function (response) {
                let parsedData;
                try {
                    parsedData = JSON.parse(response); // Response is returned as string, needs to be parsed
                } catch (error) {
                    console.error('Error parsing response:', error);
                    $('#modal-content').html('<p>Error parsing response data. Please try again later.</p>');
                    return;
                }

                let htmlContent = '';

                // Link to Helium
                htmlContent += `
                    <h4>Helium Pedigree Viewer</h4>
                    <p>
                        <button class="uk-button uk-button-primary" onclick="window.open('https://helium.hutton.ac.uk/#/pedigree?germinateUrl=https://app.soybase.org/api/parentage/pedigree.helium.zip?q=${encodeURIComponent(individualName)}', '_blank')">Pedigree Viewer</button>
                    </p>
                    <p class="uk-text-meta">For an interactive plot of the pedigree, click the "Pedigree viewer" button, then choose "Import".</p>
                `;

                // Text representation of pedigree
                if (parsedData.construction && parsedData.construction.length > 0 && !parsedData.construction.some(line => line.includes('Skipping parentage report'))) {
                    htmlContent += `<h4>Text representation of pedigree for ${individualName}:</h4><pre>`;
                    parsedData.construction.forEach(line => {
                        htmlContent += `${line}\n`;
                    });
                    htmlContent += `</pre>`;
                }

                // Lines in the pedigree
                if (parsedData.matches && parsedData.matches !== "NULL") {
                    if (Array.isArray(parsedData.matches) && parsedData.matches.length > 0) {
                        htmlContent += `
                            <h4>${individualName} is in the pedigree of these lines:</h4>
                            <pre>${parsedData.matches.join(', ')}</pre>
                        `;
                    } else if (typeof parsedData.matches === 'string') {
                        htmlContent += `
                            <h4>${individualName} is in the pedigree of these lines:</h4>
                            <pre>${parsedData.matches}</pre>
                        `;
                    }
                }

                // Alternate names
                if (parsedData.synonyms && parsedData.synonyms !== "NULL") {
                    htmlContent += `
                        <h4>Alternate names for ${individualName}:</h4>
                        <p>${parsedData.synonyms}</p>
                    `;
                }

                // Comments
                if (parsedData.comments && parsedData.comments !== "NULL") {
                    htmlContent += `
                        <h4>Comments for ${individualName}:</h4>
                        <ul>
                            ${parsedData.comments.map(comment => `<li>${comment}</li>`).join('')}
                        </ul>
                    `;
                }

                $('#modal-content').html(htmlContent);
            },
            error: function (error) {
                console.error(`Error fetching data for ${individualName}:`, error);
                $('#modal-content').html('<p>Error fetching details. Please try again later.</p>');
            }
        });

        // Open the modal
        UIkit.modal('#detail-modal').show();
    }

    fetchAndPopulateLetters();
});
