/**
 * Класс для управления UI удаления профиля.
 */
export class ProfileDeletionUI{
    /**
     * @param {string} [colorBackground='rgb(14,89,187)'] - Цвет фона для элементов UI.
     */
    constructor(colorBackground){
        this.colorBackground = colorBackground || 'rgb(14,89,187)';
        this.allComponentsDisplay = this.allComponentsDisplay.bind(this); // Привязка контекста this
    }
    /**
     * Создает HTML элемент с заданными стилями и атрибутами.
     * @param {string} tag - Тип создаваемого HTML элемента.
     * @param {Object} [styles={}] - CSS стили для элемента.
     * @param {Object} [attributes={}] - Атрибуты для элемента.
     * @returns {HTMLElement} - Созданный HTML элемент.
     */
     createElement(tag, styles = {}, attributes = {}){
        const element = document.createElement(tag);
        Object.assign(element.style,styles);
        Object.keys(attributes).forEach(attr => element.setAttribute(attr,attributes[attr]))
        return element
    }
    /**
     * Создает контейнер для диалогового окна удаления профиля.
     * @returns {HTMLElement} - Контейнер для диалогового окна.
     */
    deleteDisplay(){
        return this.createElement('div', {
            width: '250px',
            height: '150px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            border: `2px solid ${this.colorBackground}`,
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }, { id: 'delete-Profile' });
    }
    /**
     * Создает элементы для кнопки закрытия (X).
     * @returns {HTMLElement[]} - Массив из двух элементов, образующих X.
     */
    createX(){
        const commonStyles = {
            height: '2px',
            width: '20px',
            backgroundColor: '#fff',
            position: 'absolute'
        };

        const line1 = this.createElement('div', { ...commonStyles, transform: 'rotate(45deg)' });
        const line2 = this.createElement('div', { ...commonStyles, transform: 'rotate(-45deg)' });

        return [line1, line2];
    }
    /**
     * Создает кнопку закрытия.
     * @returns {HTMLElement} - Кнопка закрытия.
     */
    closeButton() {
        const close = this.createElement('button', {
            width: '25px',
            height: '25px',
            display: 'flex',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            borderRadius: '50%',
            margin: '2px 0 0 2px',
            backgroundColor: this.colorBackground
        });

        this.createX().forEach(line => close.appendChild(line));
        return close;
    }
    /**
     * Создает форму для удаления профиля.
     * @returns {HTMLElement} - Форма для удаления профиля.
     */
    profileDeleteForm() {
        const form = this.createElement('form', {
            display: 'flex',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        });

        const inputStyles = {
            marginBottom: '20px',
            width: '70%',
            height: '20px',
            borderRadius: '5px',
            border: `1px solid ${this.colorBackground}`
        };

        const labelEmail = this.createElement('label', {}, { for: 'email-delete' });
        labelEmail.innerText = 'Email';
        const inputEmail = this.createElement('input', inputStyles, { id: 'email-delete' });

        const labelPassword = this.createElement('label', {}, { for: 'password-delete' });
        labelPassword.innerText = 'Password';
        const inputPassword = this.createElement('input', inputStyles, { id: 'password-delete' });

        const submit = this.createElement('input', {
            border: 'none',
            backgroundColor: 'red',
            color: '#fff',
            fontSize: '15px',
            borderRadius: '5px',
            padding: '5px'
        }, { type: 'submit', value: 'Удалить' });

        [labelEmail, inputEmail, labelPassword, inputPassword, submit].forEach(el => form.appendChild(el));

        return form;
    }
    /**
     * Отображает все компоненты диалогового окна удаления профиля.
     */
    allComponentsDisplay() {
        if (!document.getElementById('delete-Profile')) {
            const display = this.deleteDisplay();
            const close = this.closeButton();
            const form = this.profileDeleteForm();

            close.addEventListener('click', () => display.remove());
            [close, form].forEach(el => display.appendChild(el));

            document.querySelector('main').appendChild(display);
        }
    }
    /**
     * Создает кнопку для запуска диалогового окна удаления профиля.
     * @returns {HTMLElement} - Кнопка для запуска удаления профиля.
     */
    deleteBtn() {
        const btn = this.createElement('button', {
            borderRadius: '5px',
            marginTop: '10px',
            height: '40px',
            backgroundColor: 'red',
            fontSize: '14px',
            padding: '10px 20px',
            cursor: 'pointer',
            color: '#fff',
            textDecoration: 'none',
            border: 'none'
        }, { id: 'delete-button' });

        btn.textContent = 'Удалить профиль';
        btn.addEventListener('click', this.allComponentsDisplay);
        return btn;
    }
}