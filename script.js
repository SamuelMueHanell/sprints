/**Ваша задача — написать JavaScript-скрипт, который:
1. Берёт текстовый JSON-файл с описанием формы (какие поля нужны, как они подписаны, какие
есть кнопки).
2. Автоматически создает для них нужные HTML-теги.
3. Отображает готовую рабочую форму на веб-странице.
4. При отправке нового файла, данные старого должны удаляться.
5. При нажатии на кнопку отправки собирает всё, что пользователь ввёл, в обычный JavaScript-
объект без перезагрузки страницы. */
/**Да как это работаетю */
/**Взять JSON-файл */
const fileInput = document.getElementById('file-input'); /**Конст что-то делает, сродни классам или вроде того... Эта фиолетовая штучка ищет file-input в хтмл с помощью айди */
const formContainer = document.getElementById('form-container'); /**Та же штука ищет from-container в хтмл */
/**input — параметры самого элемента ввода */
fileInput.addEventListener('change', function(event) { /**Листенер караулит работу сайта. "Добавить слушателя событий"*/
    formContainer.innerHTML = '';
    const files = event.target.files;
    if (!files || files.length === 0) return;
     Array.from(files).forEach(file => {
        /**if (file) return; Просишь сделать - выдает результат. Может и не надо оно тут... */
    /**Заставить читать */
        const reader = new FileReader();
        reader.onload = function(e) { /**Онлоад - эээээ...берет файл.  Функшион - вот тебе инструкция по выполнению задач. В конкретном случае - прочитать файл и выполнить следующие задачи */
            try { /**Попробуй себе помочь сам. */
                const formData = JSON.parse(e.target.result); /**Джсон парс - анализ формата данных */
                buildForm(formData); /**Создай форму загрузи туда вот это и покажи на экране */
            } 
            catch (error) { /**Если не справишься -  скажи, мы разберемся */
            alert('С Новым годом: ' + error.message); /**Алерт -  сообщить.  Необязательно, но пусть будет */
            }
        };
        reader.readAsText(file); /**Читает файл. указ - как текст*/
    });
})
/**Гспд... Куда все поехало. ДА ПОСЕМУ НЕ РАБОТАВТЕТ. */
/**Создать форму */
function buildForm(data) {
    formContainer.innerHTML = ''; /**Стирает все. Очищает форму, чтобы он не делал глупостей и не создавал еще формы */

    const formElement = document.createElement('form'); /**Другая фиолка созд тег в хтмл, делает форму*/

    if (data.name) { /**ЕСЛИ ТАК то сделай так */
        const title = document.createElement('h2'); /**Тож созд тег. Заголовок формы. Выводится в теге <h2> над формой. */
        title.textContent = data.name;
        formElement.appendChild(title); /**Поч ребенок?.. Добавляет эл-т в конец */
    } 
    
        if (data.fields && Array.isArray(data.fields)) { /**Перестраховщик. Смотрит, есть ли в форме кнопки и написаны ли они списком, чтобы ничего не поломалось. Если что-то идет не так, как он думал, то все ломается */
            data.fields.forEach(fieldData => {
                const group = document.createElement('div'); 
                group.className = 'form-group';
                if (fieldData.label) {
                    const label = document.createElement('label');
                    label.textContent = fieldData.label;
                    group.appendChild(label);
                }

            const inputInfo = fieldData.input;
            let inputElement; /**Если константа неизменная, то эта изменная. */

            if (inputInfo.type === 'textarea') {
                inputElement = document.createElement('textarea');
                if (inputInfo.multiple) {
                inputElement.multiple = true;
                }
            } else { /**ЕСЛИ ИНАЧЕ то сделай иначе */
                inputElement = document.createElement('input');
                inputElement.type = inputInfo.type || 'text';
            }

            if (inputInfo.placeholder) { /** подсказка внутри поля */
                inputElement.placeholder = inputInfo.placeholder;
            }

            if (inputInfo.required) { /**Указано ли в джсоне, что это поле обязательное для заполнения */
                inputElement.required = true;
            }
            /**ПОЧЕМУ НЕ РАБОТАЕТ*/
            inputElement.name = fieldData.label || 'field'; /**Дай эл-ту название лэйбл если таковой есть ИЛИ назови филд */
            group.appendChild(inputElement);
            formElement.appendChild(group);
        });
    }
    /**проверка полей */
    if (data.buttons && Array.isArray(data.buttons)) { /**Перестраховщик. */
        const buttonsGroup = document.createElement('div'); /**Если кнопочки должны быть, то чел создает коробочку и кнопочки */
        buttonsGroup.className = 'buttons-group';
        
        data.buttons.forEach((btnData, index) => { /**Созд либо такую либо другую кнопку для каждого эл-та */
            const button = document.createElement('button');
            button.textContent = btnData.text;

            if (index === 0) {
                button.type = 'submit'; /**Важнецкая кнопка */
            } else {
                button.type = 'button'; /**Любая другая кнопка тт */
            }

            buttonsGroup.appendChild(button);
        });

        formElement.appendChild(buttonsGroup);
    }

    formContainer.appendChild(formElement);
    formElement.addEventListener('submit', function(event) {
    event.preventDefault(); /**Чтоб не тупил и не обновлял форму  */

        const resultObject = {};
        const formData = new FormData(formElement);

        formData.forEach((value, key) => {
            resultObject[key] = value;
        });

        console.log('Готовенько:', resultObject);
        alert('Все супер (f12)');
    });
}
/**Все плохо. Press F*/