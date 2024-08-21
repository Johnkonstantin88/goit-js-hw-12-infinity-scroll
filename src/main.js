import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getPictures } from './js/pixabay-api';
import { markup } from './js/render-functions';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadButton: document.querySelector('#load-more-button'),
};

refs.form.addEventListener('submit', onSubmit);
refs.loadButton.addEventListener('click', onLoadMore);

const loaderSpan = ' <span class="css-loader"></span>';
refs.loader.insertAdjacentHTML('beforeend', loaderSpan);
refs.loader.hidden = true;
refs.loadButton.hidden = true;

let currentPage = 1;
let searchQueryValue = '';
const picturesCountQuery = 15;

let lightboxGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

function onSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  currentPage = 1;
  refs.loader.hidden = false;

  const { searchQuery } = e.currentTarget.elements;
  searchQueryValue = searchQuery.value.trim().toLowerCase();

  if (searchQueryValue === '') {
    onError('Sorry, but you must enter your search query. Please try again.');
    refs.loadButton.hidden = true;

    return;
  }

  getPictures(currentPage, searchQueryValue, picturesCountQuery)
    .then(response => {
      const { hits, totalHits } = response;

      if (hits.length < 1) {
        onWarning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      refs.gallery.insertAdjacentHTML('beforeend', markup(hits));

      lightboxGallery.refresh();

      if (!(hits.length < 1)) {
        iziToast.success({
          title: 'Success',
          message: `We found ${totalHits} images for you.`,
        });
      }

      if (totalHits > picturesCountQuery) {
        refs.loadButton.hidden = false;
      }

      if (hits.length > 0) {
        onScroll();
      }

      refs.loader.hidden = true;
      refs.form.reset();
    })
    .catch(onError);
}

function onLoadMore() {
  currentPage += 1;
  refs.loader.hidden = false;

  getPictures(currentPage, searchQueryValue, picturesCountQuery)
    .then(response => {
      const { hits } = response;

      refs.gallery.insertAdjacentHTML('beforeend', markup(hits));

      lightboxGallery.refresh();

      if (hits.length < picturesCountQuery) {
        onWarning("We're sorry, but you've reached the end of search results.");

        refs.loadButton.hidden = true;
        refs.loader.hidden = true;
      }

      if (hits.length > 0) {
        onScroll();
      }

      refs.loader.hidden = true;
    })
    .catch(onError);
}

function onError(err = `${err.name}: ${err.message}`) {
  refs.loader.hidden = true;
  refs.form.reset();
  iziToast.error({
    title: 'Error',
    message: `${err}`,
  });
}

function onWarning(message) {
  iziToast.warning({
    title: 'Warning',
    message: `${message}`,
  });
}

function onScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
