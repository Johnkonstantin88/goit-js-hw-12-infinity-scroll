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
  target: document.querySelector('.js-guard'),
};

refs.form.addEventListener('submit', onSubmit);

const loaderSpan = ' <span class="css-loader"></span>';
refs.loader.insertAdjacentHTML('beforeend', loaderSpan);
refs.loader.hidden = true;

let currentPage = 1;
let searchQueryValue = '';
const picturesCountQuery = 15;

const options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};

let lightboxGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

let observer = new IntersectionObserver(onLoadMore, options);

async function onSubmit(e) {
  e.preventDefault();
  observer.unobserve(refs.target);
  refs.gallery.innerHTML = '';
  refs.loader.hidden = false;
  currentPage = 1;

  const { searchQuery } = e.currentTarget.elements;
  searchQueryValue = searchQuery.value.trim().toLowerCase();

  if (searchQueryValue === '') {
    onError('Sorry, but you must enter your search query. Please try again.');

    return;
  }

  try {
    const { hits, totalHits } = await getPictures(
      currentPage,
      searchQueryValue,
      picturesCountQuery
    );

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
      observer.observe(refs.target);
    }

    if (hits.length > 0) {
      onScroll();
    }

    refs.loader.hidden = true;
    refs.form.reset();
  } catch (error) {
    onError(error.message);
  }
}

function onLoadMore(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      refs.loader.hidden = false;
      currentPage += 1;

      getPictures(currentPage, searchQueryValue, picturesCountQuery)
        .then(response => {
          const { hits } = response;

          refs.gallery.insertAdjacentHTML('beforeend', markup(hits));

          lightboxGallery.refresh();

          if (hits.length < picturesCountQuery) {
            observer.unobserve(refs.target);

            onWarning(
              "We're sorry, but you've reached the end of search results."
            );

            refs.loader.hidden = true;
          }

          if (hits.length > 0) {
            onScroll();
          }

          refs.loader.hidden = true;
        })
        .catch(onError);
    }
  });
}

function onError(err) {
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
