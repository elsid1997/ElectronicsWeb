function logOutAdmin(){
    console.log('button log out',window.location.origin)
    let localStorageUsers = localStorage.getItem('userData');
    if(localStorageUsers){
        localStorage.removeItem('userData');
    }
    let baseURL = window.location.origin;
    window.location.href = `${baseURL}/auth/profile`;
}

function btnLogOut(){
    console.log('logOut is working')
    let headerNav = document.querySelector('header');
    console.log(headerNav)
    let logOutBtn = document.createElement('button');
    logOutBtn.value = 'log-out';
    logOutBtn.title = 'Log out';
    logOutBtn.style.position = 'fixed';
    logOutBtn.style.right = '5%';
    logOutBtn.style.marginTop = '10px';
    logOutBtn.style.borderRadius = '5px';
    logOutBtn.style.border = '1px solid black';
    logOutBtn.style.display = 'flex';
    logOutBtn.style.justifyContent = 'center';
    logOutBtn.style.alignItems = 'center';
    logOutBtn.style.width = '34px';
    logOutBtn.style.height = '34px';

    let iconLogOut = document.createElement('img')
    iconLogOut.src = 'static/img/icons/logout-icon.png';
    iconLogOut.style.width = '30px';
    iconLogOut.style.height = '30px';
    logOutBtn.appendChild(iconLogOut);
    logOutBtn.addEventListener('click',logOutAdmin)
    headerNav.appendChild(logOutBtn)

}
btnLogOut()