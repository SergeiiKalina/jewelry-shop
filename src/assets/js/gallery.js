const GalleryClassName = 'gallery';
const GalleryLineClassName = 'gallery-line';
const GallerySlideClassName = 'gallery-slide';

class Gallery{
constructor(element, options ={}){
    this.containerNode = element;
   this.size = element.childElementCount
   this.currentSlide = 0;
   this.currentSlideWasChanged = false;

   this.manageHTML = this.manageHTML.bind(this);
   this.setParameter = this.setParameter.bind(this);
   this.setEvents = this.setEvents.bind(this);
   this.resizeGallery = this.resizeGallery.bind(this)
   this.startDrag = this.startDrag.bind(this)
   this.stopDrag = this.stopDrag.bind(this)
   this.dragging = this.dragging.bind(this)
   this.setStylePosition = this.setStylePosition.bind(this)
   this.manageHTML();
   this.setParameter()
   this.setEvents()
}
manageHTML(){
this.containerNode.classList.add(GalleryClassName)
this.containerNode.innerHTML = `
<div class="${GalleryLineClassName}">
${this.containerNode.innerHTML}</div>
`;
this.lineNode = this.containerNode.querySelector(`.${GalleryLineClassName}`);

this.slideNodes = Array.from(this.lineNode.children).map((childNode) =>
wrapElementByDiv({
    element: childNode,
    className: GallerySlideClassName
})

);
}

setParameter(){
    const coordsContainer = this.containerNode.getBoundingClientRect()
    console.log(this.containerNode)
    this.width = coordsContainer.width;
    this.x = -this.currentSlide * this.width;
    this.lineNode.style.width = `${this.size * this.width}px`;
    Array.from(this.slideNodes).forEach((slideNode) => {
        slideNode.style.width = `${this.width}px`
    });
}
setEvents(){
    this.debounceResizeGallery = debounce(this.resizeGallery)
    window.addEventListener('resize', this.debounceResizeGallery)
    this.lineNode.addEventListener('pointerdown', this.startDrag);
    window.addEventListener('pointerup', this.stopDrag);
}
destroyEvents(){
    window.removeEventListener('resize', this.debounceResizeGallery)
}
resizeGallery(){
this.setParameter();
}
startDrag(evt){
    this.currentSlideWasChanged = false;
    this.clickX = evt.pageX;
    this.startX = this.x;
window.addEventListener('pointermove', this.dragging)
}
stopDrag(){ 
    window.removeEventListener('pointermove', this.dragging);
    this.x = -this.currentSlide * this.width;
    this.setStylePosition();
    console.log(currentSlide)
}
dragging(evt){
this.dragX = evt.pageX;
const dragShift = this.dragX -this.clickX;
this.x = this.startX + dragShift;

this.setStylePosition(dragShift);

if(dragShift > 5 && 
    dragShift > 0 &&
    !this.currentSlideWasChanged &&
     this.currentSlide > 0
     ) {
        this.currentSlideWasChanged = true;
    this.currentSlide = this.currentSlide - 1;

}
if(dragShift < -5 &&
    dragShift < 0 &&
    !this.currentSlideWasChanged &&
    this.currentSlide < this.size - 1){
        this.currentSlideWasChanged = true;
    this.currentSlide = this.currentSlide + 1;
    }
}
setStylePosition(shift){
    this.lineNode.style.transform = `translate3d(${this.x}px, 0, 0)`;
}
}


function wrapElementByDiv({element, className}){
    const wrapperNode = document.createElement('div');
    wrapperNode.classList.add(className);
    element.parentNode.insertBefore(wrapperNode, element);
    wrapperNode.appendChild(element);

    return wrapperNode;
};

function debounce(func, time = 100){
    let timer;
    return function(event){
        clearTimeout(timer);
        timer = setTimeout(func, time, event);
    }
}
