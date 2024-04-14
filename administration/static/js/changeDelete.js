document.addEventListener('DOMContentLoaded', function(){
    console.log('changeDelete is working')
    let changeUserAdmin = document.getElementsByClassName('changeUser')
    for(let change of changeUserAdmin){
        change.addEventListener('click', function(){
            console.log('change is working')
            let  userData = this.parentNode;
            let fragment = document.createDocumentFragment();
            for(let data  of userData.children){
                data.style.padding = '0'
                if(data.children[0] == undefined){
                    let input = document.createElement('input');
                    input.type = 'text';
                    input.style.backgroundColor = 'gray';
                    input.style.color = '#fff';
                    input.style.border = 'none';
                    input.style.fontSize = '20px';
                    input.style.width = '100%';
                    input.style.height = '100%';
                    input.style.paddingLeft = '5px';
                    input.style.paddingRight = '5px';
                    input.value = data.textContent;
                    data.textContent = '';
                    fragment.appendChild(input);
                }else if(data.children[0].tagName == 'IMG'){
                    let btn = document.createElement('button')
                    if(data.className == 'changeUser'){
                        btn.style.backgroundColor = 'rgb(14,89,187)';
                        btn.textContent = 'ok';
                        btn.id = 'change-user'
                    }else {
                        btn.style.backgroundColor = 'red'
                        btn.innerText = 'X';
                        btn.id = 'cancel-user'
                    }
                    data.style.width = '40px';
                    data.style.height = '30px';
                    btn.style.width = '100%';
                    btn.style.height = '100%';
                    btn.style.fontSize = '25px';
                    btn.style.color = '#fff';
                    btn.style.border = 'none'
                    data.innerHTML = '';
                    fragment.appendChild(btn);
                }
            }

            userData.appendChild(fragment.childNodes);

        })
    }
})