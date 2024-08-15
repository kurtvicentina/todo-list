export function createHoverEffect(){
const sideLis = document.querySelectorAll('li')

sideLis.forEach((li) => {
    li.addEventListener('mouseenter', (e) => {
        const icon = li.querySelector('i')
        if (icon) {
            icon.classList.add('bx-tada')
        }
    });

    li.addEventListener('mouseleave', (e) => {
        const icon = li.querySelector('i')
        if (icon) {
            icon.classList.remove('bx-tada')
        }
    })
})
}
