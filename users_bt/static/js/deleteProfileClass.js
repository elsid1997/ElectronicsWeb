export class ProfileDeletionUI{
    constructor(colorBackground){
        this.colorBackground = colorBackground || 'rgb(14,89,187)';
        this.allComponentsDisplay = this.allComponentsDisplay.bind(this); // Привязка контекста this
    }

    deleteDisplay(){
        const display = document.createElement('div');
        display.style.width = '300px';
        display.id = 'delete-Profile'
        display.style.height = '200px';
        display.style.backgroundColor = '#fff';
        display.style.borderRadius = '10px';
        display.style.border = '2px solid '+ this.colorBackground;
        display.style.position = 'fixed';
        display.style.top = '50%';
        display.style.left = '50%';
        display.style.transform = 'translate(-50%,-50%)';
        return display
    }

    createX(){
        let line1 = document.createElement('div');
        let line2 = document.createElement('div');

        line1.style.height = line2.style.height = '2px';
        line1.style.width = line2.style.width = '20px';
        line1.style.backgroundColor = line2.style.backgroundColor = '#fff';
        line1.style.position = line2.style.position = 'absolute';
        line1.style.transform = 'rotate(45deg)';
        line2.style.transform = 'rotate(-45deg)';
        return [line1, line2];
    }

    closeButton(){
        let close  = document.createElement('button');
        close.style.width = '25px';
        close.style.height = '25px';
        close.style.display = 'flex';
        close.style.position = 'absolute';
        close.style.justifyContent = 'center';
        close.style.alignItems = 'center';
        close.style.border = 'none';
        close.style.borderRadius = '50%';
        close.style.margin = '2px 0 0 2px';
        close.style.backgroundColor = this.colorBackground;
        let X = this.createX();
        X.map(line => close.appendChild(line));
        return close
    }

    profileDeleteForm(){
        let form = document.createElement('form');
        form.style.display = 'flex';
        form.style.width = '100%';
        form.style.height = '100%';
        form.style.boxSizing = 'border-box';
        form.style.flexDirection = 'column';
        form.style.justifyContent = 'center';
        form.style.alignItems = 'center';
        let inputEmail = document.createElement('input');
        inputEmail.id = 'email-delete';
        let inputPassword = document.createElement('input');
        inputPassword.id = 'password-delete';
        let labelEmail = document.createElement('label');
        let labelPassword = document.createElement('label');

        labelEmail.innerText = 'Email';
        labelPassword.innerText = 'Password';
        labelEmail.setAttribute('for', 'email-delete')
        labelPassword.setAttribute('for', 'password-delete')
        inputEmail.style.marginBottom = inputPassword.style.marginBottom = '20px';
        inputEmail.style.width = inputPassword.style.width = '70%';
        inputEmail.style.height = inputPassword.style.height = '20px';
        inputEmail.style.borderRadius = inputPassword.style.borderRadius = '5px';
        inputEmail.style.border = inputPassword.style.border = '1px solid ' + this.colorBackground;
        form.appendChild(labelEmail);
        form.appendChild(inputEmail);
        form.appendChild(labelPassword);
        form.appendChild(inputPassword);

        let submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = 'Удалить';
        submit.style.border = 'none';
        submit.style.backgroundColor = 'red';
        submit.style.color = '#fff';
        submit.style.fontSize = '15px';
        submit.style.borderRadius = '5px';
        submit.style.padding = '5px';
        form.appendChild(submit)
        console.log(form)
        return form
    }

    allComponentsDisplay(){
        if(!document.getElementById('delete-Profile')){
            const display = this.deleteDisplay()
            const close = this.closeButton();
            const form = this.profileDeleteForm()
            close.addEventListener('click',()=> display.remove())
            display.appendChild(close);
            display.appendChild(form)
            let main = document.querySelector('main');
            main.appendChild(display);
        }
    }

    deleteBtn(){
        console.log('deleteProfile.js is working')
        let btn = document.createElement('button');
        btn.id = 'delete-button';
        btn.textContent = 'Удалить профиль'
        btn.setAttribute('style',`
            border-radius: 5px;
            margin-top: 10px;
            height: 40px;
            background-color: red;
            font-size: 14px;
            padding: 10px 20px;
            cursor: pointer;
            color:#fff;
            text-decoration: none;
            border: none;
        `)
        btn.addEventListener('click',this.allComponentsDisplay)
    return btn
    }
}