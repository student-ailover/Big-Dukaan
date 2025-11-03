departmentDropdownMenu = document.getElementsByClassName('department-dropdown-menu')[0]
departmentDropdownButton = document.getElementsByClassName('department-dropdown-button')[0]
departmentDropdownMenuList = document.getElementsByClassName('department-dropdown-menu-list')[0]
languageDropdownMenu = document.getElementsByClassName('language-dropdown-menu')[0]
languageRadioButtons = document.getElementsByClassName('language-dropdown-menu-radio')
sidebar = document.getElementsByClassName('sidebar')[0]
start()
function start()
{
    departmentDropdownMenu.style.display = 'none'
    languageDropdownMenu.style.display = 'none'
    document.addEventListener('mouseup', (event) => {
        // if clicked element is outside the sidebar, then close the sidebar if it 
        // is open
        sideBarButton = document.getElementsByClassName('sidebar-button')[0]
        if(!sidebar.contains(event.target) && !sideBarButton.contains(event.target))
        {
            closeSideBar()
        }
        // if clicked element is outside department dropdown menu, and language dropdown
        // menu, and side bar, then close any opened menu
        if(
            !departmentDropdownMenu.contains(event.target) &&
            !languageDropdownMenu.contains(event.target)
        ) closeAllMenus()
        // if mouse click is inside language dropdown
        else if(languageDropdownMenu.contains(event.target))
        {
            for(var i = 0; i < languageRadioButtons.length; i++)
            {
                if(languageRadioButtons[i].checked)
                    console.log(languageRadioButtons[i].id)
            }
        }
    })
    document.addEventListener('keyup',
        (event) =>{
            switch(event.key){
                case '/':
                    searchbar = document.getElementsByClassName('search-bar')[0]
                    searchbar.focus()
                    break
            }
        }
    )
    // radio buttons for langauge dropdown
}
function onDepartmentDropdownButtonClick()
{
    if (departmentDropdownMenu.style.display == 'none')
        departmentDropdownMenu.style.display = 'block'
    else
        departmentDropdownMenu.style.display = 'none'
}
function selectDepartment(departmentIndex)
{
    // remove the current active item
    for(var i = 0; i < departmentDropdownMenuList.children.length; i++)
        {
        if(departmentDropdownMenuList.children[i].className.includes('active-item')){
            if (i == departmentIndex) return
            // departmentDropdownMenuList.children[i].className = departmentDropdownMenu.children[i].className.replace(' active-item', '')
            departmentDropdownMenuList.children[i].className = 'department-dropdown-menu-item'
            break
        }
    }

    // make new item active
    newActiveItem = departmentDropdownMenuList.children[departmentIndex]
    newActiveItem.className = 'department-dropdown-menu-item active-item'
    departmentDropdownButton.children[0].innerHTML = newActiveItem.innerHTML

    // close the menu
    departmentDropdownMenu.style.display = 'none'

    // set keyboard focus to the search bar and change its placeholder text
    // according to the department selected
    searchbar = document.getElementsByClassName('search-bar')[0]
    searchbar.focus()
    console.log(newActiveItem.innerHTML.toString().replace('/\r/g', 'a'))
    // searchbar.placeholder = `Search For ${newActiveItem.innerHTML.replace('/\t/g', '')}`
    
}
function onLanguageDropdownButtonClick()
{
    console.log(languageDropdownMenu.style.display)
    if(languageDropdownMenu.style.display == 'none')
    {
        languageDropdownMenu.style.display = 'block'
    }
    else
    {
        languageDropdownMenu.style.display = 'none'
    }
}
function onMenuItemClick(submenuIndex)
{
    submenu = document.getElementsByClassName('submenu')[submenuIndex]
    submenu.style.display = 'block'

    slide = document.getElementsByClassName('sidebar-slide')[0]
    animationID = slide.animate(
        [
            {transform : 'translateX(-0%)', offset : 0.0},
            {transform : 'translateX(-50%)', offset : 1.0}
        ],
        {
            duration : 150,
            easing: 'linear',
            fill: 'forwards'
        }
    )
    animationID.onfinish = () =>{
        // slide.style.marginLeft = '-100%'
    }

}
function closeSubmenu()
{

    slide = document.getElementsByClassName('sidebar-slide')[0]
    animationID = slide.animate(
        [
            {transform : 'translateX(-50%)', offset : 0.0},
            {transform : 'translateX(0%)', offset : 1.0}
        ],
        {
            duration : 150,
            easing: 'linear',
            fill: 'forwards'
        }
    )
    animationID.onfinish = () =>{
        // find the submenu which is visible and then hide it
        submenus = document.getElementsByClassName('submenu')
        for(var i = 0; i < submenus.length; i++)
        {
            if(submenus[i].style.display == 'block')
            {
                submenus[i].style.display = 'none'
                break
            }
        }
    }


}
function openSidebar()
{
    // open the side bar
    button = document.getElementsByClassName('sidebar-button')[0]
    overlay = document.getElementsByClassName('sidebar-overlay')[0]
    overlay.style.display = 'block'
    sidebar.style.display = 'block'
    sidebar.animate(
        [
            {transform : 'translateX(0%)', offset : 0.0},
            {transform : 'translateX(100%)', offset : 1.0}
        ],
        {
            duration: 150,
            easing: 'linear',
            fill: 'forwards'
        }
    )
}
function closeSideBar()
{
    // if sidebar is already closed, then ignore
    // if(sidebar.left <= 0) return
    overlay = document.getElementsByClassName('sidebar-overlay')[0]
    overlay.style.display = 'none'
    animationID = sidebar.animate(
        [
                {transform : 'translateX(100%)', offset : 0.0},
                {transform : 'translateX(0%)', offset : 1.0}
            ],
            {
                duration: 150,
                easing: 'linear',
                fill: 'forwards'
            }
        )
    animationID.onfinish = () =>{
        sidebar.style.display = 'none'
    }
}
function closeAllMenus()
{
    departmentDropdownMenu.style.display = 'none'
    languageDropdownMenu.style.display = 'none'
}
var imageIndex = 0
function slideLeft()
{
    slide = document.getElementsByClassName('slide')[0]
    imageIndex--
    if(imageIndex == -1)
    {
        images = slide.children
        firstImageSrc = images[0].src
        for(var i = 0; i < 3; i++)
        {
            images[i].src = images[i + 1].src
        }
        images[3].src = firstImageSrc
        slide.left = '-75%'
        imageIndex = 2
    }

    slide.animate(
        [
            {transform : `translateX(${(-25 * (imageIndex + 1)).toString()}%)`},
            {transform : `translateX(${(-25 * imageIndex).toString()}%)`}
        ],
        {
            duration: 150,
            easing: 'linear',
            fill: 'forwards'
        }
    )
}
function slideRight()
{
    slide = document.getElementsByClassName('slide')[0]
    imageIndex++
    if(imageIndex == 4)
    {
        images = slide.children
        lastImageSrc = images[3].src
        lastImageAlt = images[3].alt
        for(var i = 3; i > 0; i--)
        {
            images[i].src = images[i - 1].src
            images[i].alt = images[i - 1].alt
        }
        images[0].src = lastImageSrc
        images[0].alt = lastImageAlt
        slide.left = '0%'
        imageIndex = 1
    }

    slide.style.animationPlayState = 'paused'
    animationID = slide.animate(
        [
            {transform : `translateX(${(-25 * (imageIndex - 1)).toString()}%)`},
            {transform : `translateX(${(-25 * imageIndex).toString()}%)`}
        ],
        {
            duration: 150,
            easing: 'linear',
            fill: 'forwards'
        }
    )
    animationID.onfinish = () =>{
        slide.style.animationPlayState = 'running'
    }
}
function itemSlideLeft(slideIndex)
{

    slide = document.getElementsByClassName('item-slide')[slideIndex]

    console.log(slide.style.left)
    return
    // update slide position
    // if(slide.style.left.length == 0)
    // {
    //     slide.style.left = '0%'
    // }
    // else{
    //     slide.style.left = `${parseInt(slide.style.left) - 10}%`
    // }

    animationID = slide.animate(
        [
            {transform : 'translateX(0%)', offset : 0.0},
            // {transform : `translateX(${slide.style.left})`, offset: 1.0}
            {transform : `translateX(-12.5%)`, offset: 1.0}
        ],
        {
            duration: 150,
            easing: 'linear',
            fill: 'forwards'
        }
    )
    animationID.onfinish = () =>{
        // console.log(slide.style.left)
    }
}