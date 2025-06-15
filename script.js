const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalName = document.getElementById('modal-name');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.querySelector('.modal-price');
const modalFeatures = document.getElementById('modal-features');
const modalOrder = document.getElementById('modal-order');
const closeBtn = document.querySelector('.close-btn');
const phone = "213XXXXXXXXX"; // ضع رقمك هنا

// فتح المودال باستخدام صورة المنتج الموجودة داخل العنصر
function openModal(product) {
  const name = product.getAttribute('data-name');
  const price = product.getAttribute('data-price');
  const desc = product.getAttribute('data-desc');
  const features = product.getAttribute('data-features').split(',');
  const imgElement = product.querySelector('img');

  modalName.textContent = name;
  modalDesc.textContent = desc;
  modalPrice.textContent = price;
  modalImg.src = imgElement.src;
  modalImg.alt = name;

  // إضافة المميزات
  modalFeatures.innerHTML = features
    .map(feature => `<span class="modal-feature">${feature.trim()}</span>`)
    .join('');

  // تحديث رابط واتساب
  const message = `السلام عليكم، أريد طلب ${name} من SULTAN BEARD.\n\nالمنتج: ${name}\nالسعر: ${price}\n\nالمميزات:\n${features.map(f => `- ${f.trim()}`).join('\n')}`;
  modalOrder.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  // إظهار المودال مع تأثير حركي
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ربط الأزرار - تحديث طريقة إضافة المستمع
document.addEventListener('DOMContentLoaded', function() {
  // إضافة مستمع الحدث لكل زر تفاصيل
  const detailButtons = document.querySelectorAll('.btn-details');
  detailButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const productCard = this.closest('.product-card');
      if (productCard) {
        openModal(productCard);
      }
    });
  });

  // إضافة مستمع الحدث لكل بطاقة منتج
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (!e.target.classList.contains('btn-details')) {
        openModal(this);
      }
    });
  });
});

// غلق المودال
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// تحريك الصفحة بسلاسة عند النقر على الروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// تأثيرات حركية عند التمرير
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.product-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'all 0.5s ease-out';
  observer.observe(card);
});
