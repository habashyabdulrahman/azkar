// تحميل البيانات من ملف JSON
fetch('azkar-sabah.json')
    .then(response => response.json())
    .then(data => {
        // استدعاء الدالة التي تقوم بعرض الأذكار
        displayAzkar(data.azkar);
    })
    .catch(error => console.error('Error loading JSON:', error));

// دالة لعرض الأذكار
function displayAzkar(azkar) {
    const container = document.querySelector('.right-section'); // تأكد أن الحاوية موجودة

    azkar.forEach(dhikr => {
        // إنشاء بطاقة جديدة
        const card = document.createElement('div');
        card.classList.add('card');

        // إضافة المحتوى
        const title = document.createElement('h3');
        title.textContent = dhikr.content;

        const description = document.createElement('p');
        description.textContent = dhikr.description || '';

        const countSpan = document.createElement('span');
        countSpan.textContent = `التكرار: ${dhikr.count}`;

        // إنشاء زر لزيادة العداد
        const button = document.createElement('button');
        button.textContent = 'أضغط';

        // إضافة عداد عند الضغط على الزر
        let count = 0;
        const counter = document.createElement('span');
        counter.textContent = `العدد: ${count}`;

        // تحديد الحد الأقصى من ملف JSON
        const maxCount = dhikr.count;

        button.addEventListener('click', () => {
            if (count < maxCount) {
                count++;
                counter.textContent = `العدد: ${count}`;
                if (count === maxCount) {
                    // عندما يصل للحد الأقصى، تغيير شكل الماوس والزر
                    button.style.cursor = 'not-allowed';
                    button.style.opacity = '0.5';
                }
            }
        });

        // إنشاء زر لإعادة تعيين العداد
        const resetButton = document.createElement('button');
        resetButton.textContent = 'إعادة';

        resetButton.addEventListener('click', () => {
            count = 0;
            counter.textContent = `العدد: ${count}`;
            // إعادة الزر إلى حالته الطبيعية
            button.style.cursor = 'pointer';
            button.style.opacity = '1';
        });

        // ربط العناصر معًا داخل البطاقة
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(countSpan);
        card.appendChild(counter);
        card.appendChild(button);
        card.appendChild(resetButton); // إضافة زر إعادة التعيين

        // إضافة البطاقة إلى الحاوية
        container.appendChild(card);
    });
}
