import {sendChangedDataUser} from './deleteUsers.js';

console.log('changeDelete is working')
let countForId = 1;
export function changeDataUser(){
        console.log('change is working')
        let userData = this.parentNode;
        if (!changeDataUser.initialUserData) {
            changeDataUser.initialUserData = this.parentNode.cloneNode(true);
        }
        for(let data  of userData.children){
            data.style.padding = '0'
            if(data.textContent == 'No' || data.textContent == 'Yes'){
                let yesORno = data.textContent;
                data.textContent = '';
                data.style.backgroundColor = 'gray';
                data.style.color = '#fff'

                let arrYesNo = ['Yes', 'No']
                arrYesNo.forEach(value => {
                    let input = document.createElement('input');
                    input.type = 'radio';
                    input.style.marginLeft = '5px';
                    input.checked = yesORno == value;
                    input.value = value == 'No' ? false : true;
                    input.style.transform = 'scale(1.3)';
                    input.id = value + countForId;
                    input.addEventListener('change', function(){
                        let secondInput = this.id.slice(0, 3) == 'Yes' ? document.getElementById('No' + this.id.slice(3)) : document.getElementById('Yes' + this.id.slice(2));
                        secondInput.checked = false;
                    });

                    let label = document.createElement('label');
                    label.textContent = value;
                    if (value == 'No'){
                        label.style.marginLeft = '10px';
                        countForId += 1;
                    }
;
                    label.setAttribute('for', input.id);

                    data.appendChild(label);
                    data.appendChild(input);

                });
            }else if(data.children[0] == undefined){
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
                input.style.boxSizing = 'border-box';
                input.value = data.textContent;
                data.textContent = '';
                data.appendChild(input);
            }else if(data.children[0].tagName == 'IMG'){
                let btn = document.createElement('button')
                if(data.className == 'changeUser'){
                    btn.style.backgroundColor = 'rgb(14,89,187)';
                    btn.textContent = 'ok';
                    btn.style.fontSize = '25px';
                    btn.className = 'change-data'
                    this.removeEventListener('click', changeDataUser)
                    btn.addEventListener('click', sendChangedDataUser)
                }else {
                    let beforeLine = document.createElement('div');
                    let afterLine = document.createElement('div');
                    let lineStyle = 'position: absolute; width: 3px; height: 25px; background-color: #fff; top: 50%; left: 50%; transform-origin: center;';
                    beforeLine.style.cssText = lineStyle + 'transform: translate(-50%,-50%) rotate(45deg);';
                    afterLine.style.cssText = lineStyle + 'transform: translate(-50%, -50%) rotate(-45deg);';
                    btn.style.backgroundColor = 'red';
                    btn.style.position = 'relative';
                    btn.className = 'cancel-change';
                    btn.appendChild(beforeLine);
                    btn.appendChild(afterLine);
                    btn.addEventListener('click', function () {
                        userData.innerHTML = '';
                        let oldUserData = changeDataUser.initialUserData.children
                        Object.keys(oldUserData).forEach(key => {
                              let item = oldUserData[key].cloneNode(true)
                              if (item.className == 'changeUser'){
                                item.addEventListener('click', changeDataUser)
                              }
                              userData.appendChild(item)
                        })
                    });
                }
                data.style.position = 'relative';
                data.style.width = '40px';
                data.style.height = '30px';
                btn.style.position = 'absolute';
                btn.style.top = '0';
                btn.style.left = '0';
                btn.style.width = '100%';
                btn.style.height = '100%';
                btn.style.color = '#fff';
                btn.style.border = 'none'
                data.innerHTML = '';
                data.appendChild(btn);
            }
        }
}