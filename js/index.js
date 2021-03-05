import gallery from "./gallery-items.js";

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalImgRef = document.querySelector('.lightbox__image');
const closeBtnModal = document.querySelector('button[data-action="close-lightbox"]');
const overlayRef = document.querySelector('.lightbox__overlay');

const createGalleryItem = (item) => {
    const itemRef = document.createElement('li');
    itemRef.classList.add('gallery__item');

    const linkRef = document.createElement('a');
    linkRef.classList.add('gallery__link');
    linkRef.href = item.original;


    const imgRef = document.createElement('img');
    imgRef.classList.add('gallery__image')
    imgRef.src = item.preview;
    imgRef.setAttribute("data-source", item.original);
    imgRef.alt = item.description;

    linkRef.appendChild(imgRef);
    itemRef.appendChild(linkRef);

    return itemRef;
};

const galleryMarkup = gallery.map(item => createGalleryItem(item));

galleryRef.append(...galleryMarkup);


galleryRef.addEventListener('click', openModal);

function openModal(event) {

    event.preventDefault();
    const target = event.target;
    if (target.nodeName !== "IMG") { return };

    modalRef.classList.add('is-open');
    modalImgRef.src = target.dataset.source;

    window.addEventListener('keydown', closeOnEscape);
    closeBtnModal.addEventListener('click', closeModal);
    overlayRef.addEventListener('click', closeModal);
};

function closeModal() {

    modalRef.classList.remove('is-open');
    modalImgRef.src = '';

    window.removeEventListener('keydown', closeOnEscape);
    closeBtnModal.removeEventListener('click', closeModal);
    overlayRef.removeEventListener('click', closeModal);
};

function closeOnEscape(event) {
    if (event.code === 'Escape') {
        closeModal();
    }
};










