const azkarUrl = "./azkar.json";

// طلب إذن الإشعارات
if ('Notification' in window && navigator.serviceWorker) {
    Notification.requestPermission(status => {
        console.log('Notification permission status:', status);
    });
}

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

// تسجيل خدمة العمال
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(error => {
            console.log('ServiceWorker registration failed: ', error);
        });
}

// إرسال الإشعارات في الأوقات المحددة
function scheduleNotification(title, options, delay) {
    setTimeout(() => {
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.getRegistration().then(reg => {
                reg.showNotification(title, options);
            });
        }
    }, delay);
}

// تحديد مواعيد الإشعارات
const now = new Date();
const morningTime = new Date();
morningTime.setHours(6, 0, 0, 0); // 6:00 AM
const eveningTime = new Date();
eveningTime.setHours(18, 0, 0, 0); // 6:00 PM

const morningDelay = morningTime - now > 0 ? morningTime - now : morningTime - now + 24 * 60 * 60 * 1000;
const eveningDelay = eveningTime - now > 0 ? eveningTime - now : eveningTime - now + 24 * 60 * 60 * 1000;

scheduleNotification('موعد أذكار الصباح', { body: 'حان الآن موعد أذكار الصباح.' }, morningDelay);
scheduleNotification('موعد أذكار المساء', { body: 'حان الآن موعد أذكار المساء.' }, eveningDelay);