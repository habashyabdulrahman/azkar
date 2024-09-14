const azkarUrl =
  "https://api.myjson.online/v1/records/f8fc9e9b-1fef-427b-9886-6f6bd6eeaee1";

async function getAzkarSabah() {
  const content = document.querySelector(".content");
  const res = await fetch(azkarUrl);
  const data = await res.json();

  data.data.azkarsabah.map(function (azkar) {});

  content.innerHTML = `
    ${data.data.azkarsabah
      .map(
        (azkar) => `
        <div class="card">
            <h3>${azkar.content}</h3>
            <p>${azkar.description}</p>
            <span>التكرار: ${azkar.count}</span>
            <span class="count-value">0</span>
            <button class="increment-btn">أضغط</button>
            <button class="reset-btn">إعادة</button>
        </div>`
      )
      .join("")}
`;
    // Add event listeners for buttons after the content is rendered
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const countValueElement = card.querySelector('.count-value');
        const incrementButton = card.querySelector('.increment-btn');
        const resetButton = card.querySelector('.reset-btn');

        let count = 0;
        const maxCount = parseInt(card.querySelector('span').textContent.replace('التكرار: ', ''));

        incrementButton.addEventListener('click', () => {
            if (count < maxCount) {
                count++;
                countValueElement.textContent = count;
                if (count === maxCount) {
                    incrementButton.style.cursor = 'not-allowed';
                    incrementButton.style.opacity = '0.5';
                }
            }
        });

        resetButton.addEventListener('click', () => {
            count = 0;
            countValueElement.textContent = count;
            incrementButton.style.cursor = 'pointer';
            incrementButton.style.opacity = '1';
        });
    });
}
getAzkarSabah();

// Azkar Masah
async function getAzkarMasa() {
  const content = document.querySelector(".content");
  const res = await fetch(azkarUrl);
  const data = await res.json();


    data.data.azkarmasa.map(function (azkar) {});

    content.innerHTML = `
    ${data.data.azkarmasa
            .map(
                (azkar) => `
        <div class="card">
            <h3>${azkar.content}</h3>
            <p>${azkar.description}</p>
            <span>التكرار: ${azkar.count}</span>
            <span class="count-value">0</span>
            <button class="increment-btn">أضغط</button>
            <button class="reset-btn">إعادة</button>
        </div>`
            )
            .join("")}
`;
    // Add event listeners for buttons after the content is rendered
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const countValueElement = card.querySelector('.count-value');
        const incrementButton = card.querySelector('.increment-btn');
        const resetButton = card.querySelector('.reset-btn');

        let count = 0;
        const maxCount = parseInt(card.querySelector('span').textContent.replace('التكرار: ', ''));

        incrementButton.addEventListener('click', () => {
            if (count < maxCount) {
                count++;
                countValueElement.textContent = count;
                if (count === maxCount) {
                    incrementButton.style.cursor = 'not-allowed';
                    incrementButton.style.opacity = '0.5';
                }
            }
        });

        resetButton.addEventListener('click', () => {
            count = 0;
            countValueElement.textContent = count;
            incrementButton.style.cursor = 'pointer';
            incrementButton.style.opacity = '1';
        });
    });

}
getAzkarMasa();
