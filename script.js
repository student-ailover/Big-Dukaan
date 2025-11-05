const productNames = [
  "smartphones",
  "laptops",
  "tablets",
  "headphones",
  "earbuds",
  "smartwatches",
  "televisions",
  "gaming consoles",
  "video games",
  "digital cameras",
  "drones",
  "printers",
  "monitors",
  "keyboards",
  "computer mice",
  "bluetooth speakers",
  "power banks",
  "phone cases",
  "chargers",
  "webcams",
  "t-shirts",
  "t-shirts for men",
  "t-shirts for women",
  "jeans",
  "jeans for men",
  "jeans for women",
  "dresses",
  "skirts",
  "jackets",
  "jackets for men",
  "jackets for women",
  "hoodies",
  "sweaters",
  "shorts",
  "trousers",
  "suits",
  "sneakers",
  "running shoes",
  "boots",
  "sandals",
  "shoes for men",
  "shoes for women",
  "shoes for kids",
  "watches",
  "watches for men",
  "watches for women",
  "jewelry",
  "necklaces",
  "rings",
  "earrings",
  "bracelets",
  "sunglasses",
  "backpacks",
  "handbags",
  "wallets",
  "belts",
  "hats",
  "caps",
  "socks",
  "underwear",
  "air fryers",
  "blenders",
  "coffee makers",
  "microwave ovens",
  "toasters",
  "refrigerators",
  "washing machines",
  "vacuum cleaners",
  "robot vacuums",
  "cookware",
  "pots and pans",
  "knife sets",
  "cutlery",
  "blenders",
  "bed sheets",
  "pillows",
  "blankets",
  "towels",
  "curtains",
  "rugs",
  "lamps",
  "desks",
  "office chairs",
  "sofas",
  "bookshelves",
  "storage containers",
  "clocks",
  "mirrors",
  "picture frames",
  "candles",
  "skincare",
  "moisturizer",
  "face wash",
  "sunscreen",
  "makeup",
  "lipstick",
  "foundation",
  "shampoo",
  "conditioner",
  "hair dryers",
  "perfume",
  "cologne",
  "vitamins",
  "protein powder",
  "yoga mats",
  "dumbbells",
  "resistance bands",
  "treadmills",
  "bicycles",
  "helmets",
  "tents",
  "sleeping bags",
  "hiking boots",
  "basketballs",
  "soccer balls",
  "toys",
  "action figures",
  "dolls",
  "board games",
  "puzzles",
  "lego",
  "baby diapers",
  "strollers",
  "car seats",
  "books",
  "fiction books",
  "non-fiction books",
  "cookbooks",
  "dog food",
  "cat food",
  "cat litter",
  "dog toys",
  "pet beds",
  "tool kits",
  "power drills",
  "gardening tools",
  "car chargers",
  "car covers"
]

sidebar = document.getElementsByClassName('sidebar')[0]
start()
function start()
{
    document.addEventListener('mouseup', (event) => {
        // if clicked element is outside the sidebar, then close the sidebar if it 
        // is open
        sideBarButton = document.getElementsByClassName('sidebar-button')[0]
        if(!sidebar.contains(event.target) && !sideBarButton.contains(event.target))
        {
            closeSideBar()
        }
    })

    const searchBar = document.getElementById('search-bar')
    searchBar.addEventListener('input', function() {
        // remove all previous recommendations
        dropdown = document.getElementsByClassName('search-bar-dropdown')[0]
        dropdown.innerHTML = ''
        for(var i = 0; i < productNames.length; i++)
        {
            index = productNames[i].indexOf(this.value)
            if(index == -1){continue}
            recommendation = document.createElement('li')
            recommendation.className = 'search-bar-recommendation'
            recommendation.onclick = `onRecomendationClick(${productNames[i]})`
            recommendation.innerHTML = `${productNames[i].slice(0, index)}<b>${productNames[i].slice(index, index + this.value.length)}</b>${productNames[i].slice(this.value.length + index)}`
            dropdown.appendChild(recommendation)
        }
    });

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
}
function onRecomendationClick(text)
{

    console.log('click')
    const searchBar = document.getElementById('search-bar')
    searchBar.value = text

}
var searchQuery
function onSearchButtonClick()
{
    // if search bar is empty then ignore
    searchBar = document.getElementsByClassName('search-bar')[0]
    if(searchBar.value.length == 0) return

    searchQuery = searchBar.value
    heading = document.getElementsByClassName('results-heading')[0]
    heading.innerHTML = `Showing results for <i>${searchQuery}</i>`
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

    console.log('here')
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