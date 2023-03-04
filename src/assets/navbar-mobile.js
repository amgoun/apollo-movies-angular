

// grab classnames
const btn = document.querySelector('.menu-hidden-button')
const menu = document.querySelector('.menu-hidden')


// add EventLister

btn.addEventListener('click', ()=> {
  menu.classList.toggle('hidden')
})


