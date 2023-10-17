const filterByType = (type, ...values) => values.filter(value => typeof value === type), //стрелочная функция, принимающая множество аргументов, после первого аргумента, все последующие будут записаны в массив. Возвращает отфильтрованный массив по переданному типу

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // находим элементы div с классом dialog__response-block на странице и переобразовываем их в массив 
		responseBlocksArray.forEach(block => block.style.display = 'none'); // перебираем полученный массив элементов div и вешаем на них свойство display со значением none
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { //универсальная ф-ия, в которую передаются след. аргументы: класс элемента, текст сообщения, селектор для поиска элемента.
		hideAllResponseBlocks(); // вызов ф-ии 
		document.querySelector(blockSelector).style.display = 'block'; // ищем элемент на странице с переданным классом.
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}	//выполнение замены текстового содержимого элемента при наличии переданного селектора
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //функция, в которую мы передаем текст сообщения, вызывающая функцию для отображения ошибки

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	//функция, в которую мы передаем текст сообщения, вызывающая функцию для отображения результата

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), //отображение пустого поля, при отсутсвтии входящих данных.

	tryFilterByType = (type, values) => {// функция, принимающая в себя 2 аргумента.
		try { //попытка выполнения след.кода
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // создание переменной, в которой находится выполнение ф-ии и последующее преобразование в массив.
			const alertMsg = (valuesArray.length) ? //создание переменной с использованием тернарного оператора. 
				`Данные с типом ${type}: ${valuesArray}` : //Выведет при условии не пустого массива
				`Отсутствуют данные типа ${type}`; //Выведет при условии пустого массива
			showResults(alertMsg); //Вызов ф-ии с переданным текстом сообщения.
		} catch (e) {//обработка ошибок.
			showError(`Ошибка: ${e}`);//выполнение функции с переданным event
		}
	};

const filterButton = document.querySelector('#filter-btn');//поиск кнопки на странице.

filterButton.addEventListener('click', e => {//создание отслеживания нажатия на кнопку.
	const typeInput = document.querySelector('#type'); //поиск элемента по id
	const dataInput = document.querySelector('#data'); //поиск элемента по id

	if (dataInput.value === '') { //условие проверяющее инпут на пустую строку.
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //выводит сообщение при пустом поле
		showNoResults(); //выполнение ф-ии 
	} else {
		dataInput.setCustomValidity(''); //присваивает пустое значение
		e.preventDefault(); // отключает стандартные поведение кнопки
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //вывод сообщения с типом данных и заданными в инпуте данными с удалением пробелов в начале и в конце строк.
	}
});



