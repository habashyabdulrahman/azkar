class AzkarApp {
  constructor(dataUrl) {
    this.dataUrl = dataUrl;
    this.azkarData = null;
    this.currentList = [];
    this.currentIndex = 0;
    this.currentType = "";

    // متغيرات اللمس
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.minSwipeDistance = 50;

    // عناصر واجهة المستخدم
    this.DOM = {
      homeScreen: document.getElementById("home-screen"),
      azkarScreen: document.getElementById("azkar-screen"),
      content: document.querySelector(".content"),
      azkarTitle: document.getElementById("azkar-title"),
      btnSabah: document.getElementById("btn-sabah"),
      btnMasa: document.getElementById("btn-masa"),
      btnBack: document.getElementById("btn-back"),
    };

    this.initEvents();
  }

  // تهيئة وجلب البيانات
  async init() {
    try {
      const res = await fetch(this.dataUrl);
      this.azkarData = await res.json();
    } catch (error) {
      console.error("حدث خطأ أثناء جلب الأذكار:", error);
      this.DOM.content.innerHTML = `<p style="text-align:center; color:red;">تعذر تحميل الأذكار. تأكد من اتصالك أو صحة الملف.</p>`;
    }
  }

  // ربط أزرار القائمة الرئيسية والسحب
  initEvents() {
    this.DOM.btnSabah.addEventListener("click", () =>
      this.startSession("azkarsabah", "أذكار الصباح"),
    );
    this.DOM.btnMasa.addEventListener("click", () =>
      this.startSession("azkarmasa", "أذكار المساء"),
    );
    this.DOM.btnBack.addEventListener("click", () => this.showHomeScreen());

    document.addEventListener("touchstart", (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });
  }

  startSession(type, title) {
    if (!this.azkarData || !this.azkarData[type]) return;

    this.currentType = type;
    this.currentList = this.azkarData[type];
    this.DOM.azkarTitle.textContent = title;

    this.findNextIncompleteZikr();

    this.DOM.homeScreen.classList.remove("active");
    this.DOM.azkarScreen.classList.add("active");

    this.renderSingleZikr();
  }

  showHomeScreen() {
    this.DOM.azkarScreen.classList.remove("active");
    this.DOM.homeScreen.classList.add("active");
    this.currentType = "";
    this.currentList = [];
  }

  // جلب مفتاح التخزين الآمن (يفضل وجود id في ملف json، وإلا نستخدم الفهرس مؤقتاً)
  getStorageKey(index) {
    const item = this.currentList[index];
    return item.id ? `azkar_${item.id}` : `azkar_${this.currentType}_${index}`;
  }

  findNextIncompleteZikr() {
    for (let i = 0; i < this.currentList.length; i++) {
      const savedCount = localStorage.getItem(this.getStorageKey(i));
      if (savedCount === null || parseInt(savedCount) > 0) {
        this.currentIndex = i;
        return;
      }
    }
    this.currentIndex = this.currentList.length;
  }

  renderSingleZikr() {
    if (this.currentIndex >= this.currentList.length) {
      this.DOM.content.innerHTML = `
                <div class="card" style="text-align: center;">
                    <h3>تقبل الله طاعتكم ✨</h3>
                    <p>لقد أتممت جميع أذكار هذا الوقت.</p>
                    <button class="primary-btn" onclick="app.resetAzkar()" style="margin: 1rem auto; padding: 0.5rem 2rem;">إعادة البدء</button>
                </div>
            `;
      return;
    }

    const azkar = this.currentList[this.currentIndex];
    const storageKey = this.getStorageKey(this.currentIndex);
    const savedCount = localStorage.getItem(storageKey);
    const currentCount =
      savedCount !== null ? parseInt(savedCount) : parseInt(azkar.count);

    this.DOM.content.innerHTML = `
            <div class="card" id="active-card">
                <span class="progress-text">الذكر ${this.currentIndex + 1} من ${this.currentList.length}</span>
                <h3>${azkar.content}</h3>
                <p>${azkar.description}</p>
                <button class="increment-btn" id="counter-btn">${currentCount}</button>
                
                <div class="navigation-btns">
                    <button class="nav-btn" onclick="app.nextZikr()">التالي ←</button>
                    ${this.currentIndex > 0 ? `<button class="nav-btn" onclick="app.prevZikr()">→ السابق</button>` : `<div></div>`}
                </div>
            </div>
        `;

    this.attachCardInteraction(currentCount, storageKey);
  }

  attachCardInteraction(initialCount, storageKey) {
    const card = document.getElementById("active-card");
    const btn = document.getElementById("counter-btn");
    let count = initialCount;

    if (count === 0) {
      btn.disabled = true;
      btn.innerHTML = "✓";
      return;
    }

    card.addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-btn")) return;

      if (count > 0) {
        count--;
        btn.textContent = count;
        localStorage.setItem(storageKey, count);

        if (navigator.vibrate) navigator.vibrate(50);

        // تأثير بصري للضغط
        card.style.transform = "scale(0.98)";
        setTimeout(() => (card.style.transform = "scale(1)"), 150);

        if (count === 0) {
          btn.disabled = true;
          btn.innerHTML = "✓";
          if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

          setTimeout(() => {
            this.nextZikr();
          }, 800);
        }
      }
    });
  }

  nextZikr() {
    this.currentIndex++;
    this.renderSingleZikr();
  }

  prevZikr() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderSingleZikr();
    }
  }

  resetAzkar() {
    for (let i = 0; i < this.currentList.length; i++) {
      localStorage.removeItem(this.getStorageKey(i));
    }
    this.currentIndex = 0;
    this.renderSingleZikr();
  }

  handleSwipe() {
    // لا تنفذ السحب إذا لم نكن في شاشة الأذكار
    if (!this.DOM.azkarScreen.classList.contains("active")) return;

    const swipeDistance = this.touchEndX - this.touchStartX;
    if (Math.abs(swipeDistance) < this.minSwipeDistance) return;

    // بسبب (dir="rtl") السحب أصبح معكوساً منطقياً
    if (swipeDistance > 0) {
      this.nextZikr(); // سحب لليمين يعرض التالي
    } else {
      this.prevZikr(); // سحب لليسار يعرض السابق
    }
  }
}

// تعريف التطبيق عالمياً لتتمكن الأزرار المضمنة في HTML من استدعائه (مثل app.nextZikr)
let app;
document.addEventListener("DOMContentLoaded", async () => {
  app = new AzkarApp("./azkar.json");
  await app.init();
});
