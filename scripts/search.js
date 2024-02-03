document.addEventListener('DOMContentLoaded', function () {




    let request = window.location.search.substring(1)
    fetch(`https://www.chitai-gorod.ru/search?phrase=${request}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'text/html', // Устанавливайте нужные заголовки
  },
})
  .then(response => response.text())
  .then(data => {
    // Создайте временный контейнер, чтобы разместить полученный HTML
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = data;

    // Найти все элементы с классом "product-card"
    const productCards = tempContainer.querySelectorAll('.product-card');

    // Обработка найденных элементов
    productCards.forEach(card => {
      // Ваш код для обработки каждой карточки товара
      console.log(card.textContent);
    });
  })
  .catch(error => console.error('Error:', error));



})