const azkarUrl = "./azkar.json";

// Azkar Sabah
async function getAzkarSabah() {
    const content = document.querySelector(".content");
    const res = await fetch(azkarUrl);
    const data = await res.json();

    data.azkarsabah.map(function (azkar) { });

    content.innerHTML = `
    ${data.azkarsabah
            .map(
                (azkar) => `
        <div class="card" data-max-count="${azkar.count}">
            <h3>${azkar.content}</h3>
            <p>${azkar.description}</p>
            <button class="increment-btn">${azkar.count}</button>
        </div>`
            )
            .join("")}
    `;
    // Add event listeners for cards after the content is rendered
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const incrementButton = card.querySelector('.increment-btn');

        let count = parseInt(incrementButton.textContent);

        card.addEventListener('click', () => {
            if (count > 0) {
                count--;
                incrementButton.textContent = count;
                incrementButton.style.borderColor = 'rgb(254, 98, 39, 255)';
                if (count === 0) {
                    card.style.cursor = 'not-allowed';
                    card.style.opacity = '0.5';
                }
            }
        });
    });
}
getAzkarSabah();

// Azkar Masah
async function getAzkarMasa() {
    const content = document.querySelector(".content");
    const res = await fetch(azkarUrl);
    const data = await res.json();

    data.azkarmasa.map(function (azkar) { });

    content.innerHTML = `
    ${data.azkarmasa
            .map(
                (azkar) => `
        <div class="card" data-max-count="${azkar.count}">
            <h3>${azkar.content}</h3>
            <p>${azkar.description}</p>
            <button class="increment-btn">${azkar.count}</button>
        </div>`
            )
            .join("")}
    `;
    // Add event listeners for cards after the content is rendered
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const incrementButton = card.querySelector('.increment-btn');

        let count = parseInt(incrementButton.textContent);

        card.addEventListener('click', () => {
            if (count > 0) {
                count--;
                incrementButton.textContent = count;
                incrementButton.style.borderColor = 'rgb(254, 98, 39, 255)';
                if (count === 0) {
                    card.style.cursor = 'not-allowed';
                    card.style.opacity = '0.5';
                }
            }
        });
    });
}
getAzkarMasa();