document.getElementById('giveaway-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const itemName = document.getElementById('item-name').value;
    const itemDescription = document.getElementById('item-description').value;
    const itemRegion = document.getElementById('item-region').value;
    const itemRegionText = document.getElementById('item-region').selectedOptions[0].text;

    const itemImage1 = document.getElementById('item-image1').files[0];
    const itemImage2 = document.getElementById('item-image2').files[0];

    if (!itemImage1 || !itemImage2) {
        alert('Please upload both images.');
        return;
    }

    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = function(e1) {
        reader2.onload = function(e2) {
            const newItem = {
                name: itemName,
                description: itemDescription,
                region: itemRegion,
                regionText: itemRegionText,
                image1: e1.target.result,
                image2: e2.target.result
            };

            addItemToDOM(newItem);
            clearForm();
        };
        reader2.readAsDataURL(itemImage2);
    };
    reader1.readAsDataURL(itemImage1);
});

function addItemToDOM(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>Region:</strong> ${item.regionText}</p>
        <p>${item.description}</p>
        <img src="${item.image1}" alt="${item.name} Image 1">
        <img src="${item.image2}" alt="${item.name} Image 2">
    `;
    document.getElementById('items-list').appendChild(itemDiv);
}

function clearForm() {
    document.getElementById('giveaway-form').reset();
}