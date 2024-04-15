document.addEventListener('DOMContentLoaded', function(){
    console.log('changeDelete is working')
    let changeUserAdmin = document.getElementsByClassName('changeUser')
    for(let change of changeUserAdmin){
        change.addEventListener('click', function(){
            console.log('change is working')
            let  userData = this.parentNode;
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
                    data.appendChild(input);
                }else if(data.children[0].tagName == 'IMG'){
                    let btn = document.createElement('button')
                    if(data.className == 'changeUser'){
                        btn.style.backgroundColor = 'rgb(14,89,187)';
                        btn.textContent = 'ok';
                        btn.style.fontSize = '25px';
                        btn.id = 'change-user'
                    }else {
                        let beforeLine = document.createElement('div');
                        let afterLine = document.createElement('div');
                        let lineStyle = 'position: absolute; width: 3px; height: 25px; background-color: #fff; top: 50%; left: 50%; transform-origin: center;';
                        beforeLine.style.cssText = lineStyle + 'transform: translate(-50%,-50%) rotate(45deg);';
                        afterLine.style.cssText = lineStyle + 'transform: translate(-50%, -50%) rotate(-45deg);';
                        btn.style.backgroundColor = 'red';
                        btn.style.position = 'relative';
                        btn.id = 'cancel-user';
                        btn.appendChild(beforeLine);
                        btn.appendChild(afterLine);
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

        })
    }
})