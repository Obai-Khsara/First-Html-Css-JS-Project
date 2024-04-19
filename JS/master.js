// Check if Local Storage has A color
let mainColors = localStorage.getItem("color_option")
if(mainColors != null){
    document.documentElement.style.setProperty("--main-color",localStorage.getItem("color_option"))

    document.querySelectorAll(".colors-list li").forEach(element =>{
        element.classList.remove("active")

        if(element.dataset.color == mainColors){
            element.classList.add("active")
        }
    })
}
// Check if Local Storage has A color

let backgroundInterval
// Random background option
let backgroundOption = true

// Check if there is random background item in local storage
let backgroundLocalItem = localStorage.getItem("background_option")
if(backgroundLocalItem != null){
    if(backgroundLocalItem == "true"){
        backgroundOption = true
    }else{
        backgroundOption = false
    }

    document.querySelectorAll(".random-backgrounds span").forEach(element =>{
        element.classList.remove("active")
    })


    if(backgroundLocalItem == "true"){
        let test = document.querySelector(".random-backgrounds .yes").classList.add("active")
    }else{
        document.querySelector(".random-backgrounds .no").classList.add("active")
    }
}
// Check if there is random background item in local storage


// Change Toggle Settings
let togglebolean = false
document.querySelector(".toggle-settings i").onclick = function() {


    if (togglebolean == false){
        this.classList.add("fa-spin")
        // he wrote instead the above line
        // this.classList.toggle("fa-spin")
    
    
        document.querySelector(".settings-box").classList.add("open")
        // document.querySelector(".settings-box").classList.toggle("open")
        togglebolean = true
    }else{
        this.classList.remove("fa-spin")
        document.querySelector(".settings-box").classList.remove("open")
        togglebolean = false
    }
}
// Change Toggle Settings


// Change Colors on Website
const colorsLi = document.querySelectorAll(".colors-list li")
colorsLi.forEach(li => {
    li.addEventListener("click",(e)=>{
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color)
        localStorage.setItem("color_option",e.target.dataset.color)
        // document.querySelectorAll(".colors-list li").forEach(element =>{
        //     element.classList.remove("active")
        // })

        // e.target.classList.add("active")
        handleActive(e)
    })
})
// Change Colors on Website

// Switch Random backgrounds option
const randomBackEl = document.querySelectorAll(".random-backgrounds span")
randomBackEl.forEach(span => {
    span.addEventListener("click",(e)=>{
        // document.querySelectorAll(".random-backgrounds span").forEach(element =>{
        //     element.classList.remove("active")
        // })

        // e.target.classList.add("active")
        handleActive(e)


        if(e.target.dataset.background == "yes"){
            backgroundOption = true
            randomizeImags()
            localStorage.setItem("background_option",true)
        }else{
            backgroundOption = false
            clearInterval(backgroundInterval)
            localStorage.setItem("background_option",false)
        }
    })
})
// Switch Random backgrounds option



// Change landing-page background image
let landingPage = document.querySelector(".landing-page")
let imgsArray = ["landing-page-1.jpg","landing-page-2.jpg","landing-page-3.jpg","landing-page-4.jpg","landing-page-5.jpg"]

function randomizeImags(){
    if(backgroundOption == true){
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length)
            landingPage.style.backgroundImage = `url('images/${imgsArray[randomNumber]}')`
        },3000)
    }
}

randomizeImags()
// Change landing-page background image




let ourSkills = document.querySelector(".skills")


window.onscroll = function () {
    let ourSkillsOffsetTop = ourSkills.offsetTop
    let skillsOuterHeight = ourSkills.offsetHeight
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset
    // console.log(windowScrollTop)


    if(windowScrollTop < (ourSkillsOffsetTop + skillsOuterHeight - windowHeight)){
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span")
        allSkills.forEach(skill =>{
            skill.style.width = skill.dataset.progress
        })
    }
}


let ourGallery = document.querySelectorAll(".gallery img")
ourGallery.forEach(img => {
    img.addEventListener("click",(e) => {
        let overlay = document.createElement("div")
        overlay.className = "popup-overlay"
        document.body.appendChild(overlay)


        let popupBox = document.createElement("div")
        popupBox.className = "popup-box"


        if(img.alt != null){
            let imgHeading = document.createElement("h3")
            let imgText = document.createTextNode(img.alt)
            imgHeading.appendChild(imgText)
            popupBox.appendChild(imgHeading)
        }


        let popupImage = document.createElement("img")
        popupImage.src = img.src


        popupBox.appendChild(popupImage)
        document.body.appendChild(popupBox)



        let closeButton = document.createElement("span")
        let closeButtonText = document.createTextNode("X")
        closeButton.appendChild(closeButtonText)
        closeButton.className = "close-button"
        popupBox.appendChild(closeButton)

        document.addEventListener("click", function(e){
            if(e.target.className == "close-button"){
                document.querySelector(".popup-box").remove()
                document.querySelector(".popup-overlay").remove()
            }
        })
    })
})


// Start All Links
const allLinks = document.querySelectorAll(".links a")
const allBullets = document.querySelectorAll(".nav-bullets .bullet")

function scrollToSection(elements){
    elements.forEach(ele => {
        ele.addEventListener("click",(e) => {
            // e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView(
                {
                    behavior: "smooth"
                }
            )
        })
    })
}

scrollToSection(allLinks)
scrollToSection(allBullets)
// End All Links

// Handle Active State
function handleActive(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(element=>{
        element.classList.remove("active")
    })
    ev.target.classList.add("active")
}

// Show and hide bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span")
let bulletsContainer = document.querySelector(".nav-bullets")
let bulletsLocalItem = localStorage.getItem("bullets_option")
if(bulletsLocalItem != null){
    bulletsSpan.forEach(span => {
        span.classList.remove("active")
    })
    if(bulletsLocalItem == "block"){
        bulletsContainer.style.display = "block"
        document.querySelector(".bullets-option .yes").classList.add("active")
    }else{
        bulletsContainer.style.display = "none"
        document.querySelector(".bullets-option .no").classList.add("active")
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if(span.dataset.display == "show"){
            bulletsContainer.style.display = "block"
            localStorage.setItem("bullets_option","block")
        }else{
            bulletsContainer.style.display = "none"
            localStorage.setItem("bullets_option","none")
        }

        handleActive(e)
    })
})

// Reset Option
document.querySelector(".reset-options").onclick = function(){
    localStorage.clear()
    window.location.reload()
}

// Show menu in small and midum screen
let toggleBtn = document.querySelector(".toggle-menu")
let tLinks = document.querySelector(".links")

toggleBtn.onclick = function(e){
    e.stopPropagation()
    this.classList.toggle("menu-active")
    tLinks.classList.toggle("open")
}

// Click anywhere to close links-menu in small and midum screen
document.addEventListener("click",(e)=>{
    if(e.target != toggleBtn && e.target != tLinks){
        if(tLinks.classList.contains("open")){
            toggleBtn.classList.toggle("menu-active")
            tLinks.classList.toggle("open")
        }
    }
})

// Stop Propagation on links menu
tLinks.onclick = function(e){
    e.stopPropagation()
}