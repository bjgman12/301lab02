'use strict';

// use .clone()
let $phototemplate = $('.photo-template');
let $container = $('.container');
let $menu = $('#menu');


$.ajax('../data/page-1.json').then(pageOne => {
  pageOne.forEach(function (image) {
    let $newPhoto = $phototemplate.clone();
    $container.append($newPhoto);
    $newPhoto.find('h2').text(image.title);
    $newPhoto.find('img').attr('src', image.image_url);
    $newPhoto.find('p').text(image.description);
    $newPhoto.removeClass('photo-template');
    $newPhoto.attr('class', image.keyword);

  });
  $phototemplate.remove();

  let keyword = [];
  //create array of key words
  for (let i = 1; i < $container.children().length; i++) {
    keyword.push($container.children()[i].classList.value);
  }
  //filter array from dupes
  let uniKeys = keyword.filter((item, i, ar) => ar.indexOf(item) === i);

  console.log(uniKeys);
  // Add keywords to menu
  uniKeys.forEach(function (key) {
    let $newOption = $('<option></option>').text(key);

    $menu.append($newOption);

  });

});
$menu.on('change', function (event) {
  let $show = `.${event.target.value}`;
  $('section').show();
  $('section').not($show).toggle('hide');

});






