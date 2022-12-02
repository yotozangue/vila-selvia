function customNav() {

    const name = localStorage.getItem('name');

    if(!name) {
        hide('nav-area');
        throw new Error('No login.');
    }

    const navItem = document.getElementById('nav-item');
    const admin = localStorage.getItem('admin');

    // Dropdown Menus

    let menu = `
    <li>
        <a class="nav-link" href="/pages/panel.html" id="panel-item">
            Panel
        </a>
    </li>`;

    menu += (admin==='true') ? `
    <li>
        <a class="nav-link" href="/pages/admin.html" id="panel-item">
            Admin
        </a>
    </li>` : ``;

    menu += `
    <li>
        <a class="nav-link" type="button" onclick="logout()" id="panel-item">
            Logout
        </a>
    </li>`;

    navItem.innerHTML = menu;
    document.getElementById('name').innerHTML = name;

    // Hide Unnecessary Menus
    hide('login');
    hide('signup');

}
