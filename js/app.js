'use strict';

// use .clone()
let $phototemplate = $('#photo-template');
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


    let $newOption = $('<option></option>').text(image.keyword);
    // console.log(image.keyword);
  

    $menu.append($newOption);


  });



  $menu.on('change', function (event) {
    let $show = event.target.value;
    console.log($show);
    $('section').not(`.${$show}`).toggle('hide');
  });
});






