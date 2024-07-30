document.getElementById('addCategory').addEventListener('click', addCategory);
document.getElementById('imageUpload').addEventListener('change', handleImageUpload);

const predefinedCategories = [
    { id: 'god', name: 'God', color: 'bg-green-300' },
    { id: 'decent', name: 'Decent', color: 'bg-blue-300' },
    { id: 'average', name: 'Average', color: 'bg-yellow-300' },
    { id: 'trash', name: 'Trash', color: 'bg-red-300' },
    { id: 'intolerable', name: 'Intolerable', color: 'bg-gray-300' }
];

window.onload = () => {
    renderPredefinedCategories();
    addDragEvents();
};

function renderPredefinedCategories() {
    const container = document.getElementById('predefinedCategories');
    container.innerHTML = predefinedCategories.map(category => `
        <div id="${category.id}" class="drop-zone ${category.color} p-3 flex flex-row space-x-3 overflow-auto">
            <h2 class="text-xl font-bold">${category.name}</h2>
        </div>
    `).join('');
}

function addCategory() {
    const categoryName = document.getElementById('categoryName').value.trim();
    const categoryColor = document.getElementById('categoryColor').value;
    if (!categoryName) {
        alert('Please enter a category name');
        return;
    }
    const newCategory = createCategoryElement(categoryName, categoryColor);
    document.getElementById('categories').appendChild(newCategory);
    addDragEventsToCategory(newCategory);
}

function createCategoryElement(name, color) {
    const div = document.createElement('div');
    div.className = 'flex category drop-zone space-x-3 overflow-auto flex-row p-2';
    div.style.backgroundColor = color;
    div.innerHTML = `<h2 class="text-xl font-bold p-2">${name}</h2>`;
    return div;
}

function handleImageUpload(event) {
    const files = event.target.files;
    const imageContainer = document.getElementById('imageContainer');
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = e => {
            const image = createImageElement(e.target.result, `uploadedImage${i}`);
            imageContainer.appendChild(image);
            addDragEventsToImage(image);
        };
        reader.readAsDataURL(file);
    }
}

function createImageElement(src, id) {
    const img = document.createElement('img');
    img.src = src;
    img.width = 200;
    img.alt = 'Uploaded Image';
    img.id = id;
    img.classList.add('draggable');
    img.draggable = true;
    return img;
}

function addDragEvents() {
    document.querySelectorAll('.draggable').forEach(addDragEventsToImage);
    document.querySelectorAll('.drop-zone').forEach(addDragEventsToCategory);
}

function addDragEventsToImage(image) {
    image.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text/plain', event.target.id);
    });
}

function addDragEventsToCategory(category) {
    category.addEventListener('dragover', event => {
        event.preventDefault();
        category.classList.add('bg-gray-400');
    });
    category.addEventListener('dragleave', event => {
        event.preventDefault();
        category.classList.remove('bg-gray-400');
    });
    category.addEventListener('drop', event => {
        event.preventDefault();
        category.classList.remove('bg-gray-400');
        const imageId = event.dataTransfer.getData('text/plain');
        const image = document.getElementById(imageId);
        category.appendChild(image);
    });
}
