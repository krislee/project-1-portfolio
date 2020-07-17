let $burger = $('.burger')
$burger.on('click', function(e) {
    let $right = $('.right-burger');
    $right.toggleClass('show');
})

$(window).resize (function(e) {
   if($(window).width()<600){
       $('.right-burger').removeClass('show')
   }
})



const url = 'https://spreadsheets.google.com/feeds/list/1TfxvlFob_O3oOgSFAW-pfBBPPGfMN0E5z7gfqq6xg0k/od6/public/values?alt=json'
fetch(url)
.then(response => response.json())
.then(retrievedData => {
    //console.log(retrievedData)
    const arr = retrievedData.feed.entry.map(eachentry => {
        return {
            description: eachentry.gsx$description.$t,
            image: eachentry.gsx$image.$t,
            title: eachentry.gsx$title.$t,
            url: eachentry.gsx$url.$t
        }
    })
    console.log(arr)
    
    create(arr)
    let projectDiv1 = document.querySelectorAll('.container')[0]
    let projectDiv2 = document.querySelectorAll('.container')[1]
    let projectDiv3 = document.querySelectorAll('.container')[2]
    let projectDiv4 = document.querySelectorAll('.container')[3]
    let projectDiv5 = document.querySelectorAll('.container')[4]

    let a = opacityChange(0)
    let b = opacityChange(1)
    let c = opacityChange(2)
    let d = opacityChange(3)
    let e = opacityChange(4)

    a.observe(projectDiv1)
    b.observe(projectDiv2) 
    c.observe(projectDiv3)
    d.observe(projectDiv4) 
    e.observe(projectDiv5)

})

const opacityChange = (num) => {
    let options = {
        root: null,
        rootMargin: '0px',
        threshold:0.8
    }

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            // console.log(entry)
            if (entry.isIntersecting) {
                document.querySelectorAll('.container')[num].setAttribute('id', 'projects-opacity')
            }
        })
    }, options)
   return observer
}

// const opacityChange2 = () => {
//     let options = {
//         root: null,
//         rootMargin: '0px',
//         threshold:0.8
//     }

//     let observer = new IntersectionObserver((entries, observer) => {
//         entries.forEach((entry) => {
//             console.log(entry)
//             if (entry.isIntersecting) {
//                 document.querySelectorAll('.container')[2].setAttribute('id', 'projects-opacity')
//                 document.querySelectorAll('.container')[3].setAttribute('id', 'projects-opacity')
//             }
//         })
//     }, options)
//    return observer
// }

// const opacityChange3 = () => {
//     let options = {
//         root: null,
//         rootMargin: '0px',
//         threshold:0.8
//     }

//     let observer = new IntersectionObserver((entries, observer) => {
//         entries.forEach((entry) => {
//             console.log(entry)
//             if (entry.isIntersecting) {
//                 document.querySelectorAll('.container')[4].setAttribute('id', 'projects-opacity')
//             }
//         })
//     }, options)
//    return observer
// }




const create  = (array) => {
    array.forEach ((eachArrayElement) => {
        const $div = $("<div>").addClass("container")
        const $source = $("<source>").attr({src: eachArrayElement.image, type: "video/mp4"})
        const $video = $("<video autoplay muted loop playsinline>").addClass("video")
        const $divVideo = $("<div>").addClass("videoDiv")
        $divVideo.append($video.append($source))
        
        const $div2 = $("<div>").addClass("paraContainer")
        $div2.append($("<h1>").addClass("projectheading").text(eachArrayElement.title))
        $div2.append($("<p>").addClass("para").text(eachArrayElement.description))

        const $a = $("<a>").attr({target: "_blank", href: eachArrayElement.url}).append($("<i>").addClass("fa fa-github"))
        $div2.append($("<div>").addClass("icons").append($a))
        
        $div.append($divVideo)
        $div.append($div2)
        $(".flex").append($div)
    
    })
}

document.querySelectorAll('.container')[1].setAttribute('id', 'projects-opacity')
document.querySelectorAll('.container')[2].setAttribute('id', 'projects-opacity')
document.querySelectorAll('.container')[3].setAttribute('id', 'projects-opacity')
document.querySelectorAll('.container')[4].setAttribute('id', 'projects-opacity')