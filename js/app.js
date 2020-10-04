'use strict';

// use .clone()
let $pageOne = $('.pageOne');
let $pageTwo = $('.pageTwo');
let $menu = $('#menu');
let $sort = $('#sort');
let keyword = [];
let sortedPageOne = [];
let sortedPageTwo = [];
let sortedHorns = [];
let defaultPage = true;
let secondPage = true;
function Photo(src, title, description, key, horns) {
  this.src = src;
  this.title = title;
  this.description = description;
  this.key = key;
  this.horns = horns;

  sortedHorns.push(this);
}

$.ajax('../data/page-1.json').then(pageOne => {
  pageOne.forEach(function (image) {
    let newPhoto = new Photo(image.image_url, image.title, image.description, image.keyword, image.horns);
    sortedPageOne.push(newPhoto);
    let $phototemplate = $('#photo-template').html();
    let rendered = Mustache.render($phototemplate, newPhoto);
    $pageOne.append(rendered);
  });




  //create array of key words

  for (let i = 1; i < $pageOne.children().length; i++) {
    keyword.push($pageOne.children()[i].classList.value);
  }
  //filter array from dupes
  let uniKeys = keyword.filter((item, i, ar) => ar.indexOf(item) === i);


  // Add keywords to menu
  uniKeys.forEach(function (key) {
    let $newOption = $('<option></option>').text(key);
    $($newOption).addClass('pageOneOpt');
    $menu.append($newOption);
  });


});


//Page Two
$.ajax('../data/page-2.json').then(pageTwo => {
  pageTwo.forEach(image => {
    let newPhoto = new Photo(image.image_url, image.title, image.description, image.keyword, image.horns);
    sortedPageTwo.push(newPhoto);
    let $phototemplate = $('#photo-template').html();
    let rendered = Mustache.render($phototemplate, newPhoto);
    $pageTwo.append(rendered);
  });

  //create array of key words
  for (let i = 1; i < $pageTwo.children().length; i++) {
    keyword.push($pageTwo.children()[i].classList.value);
  }
  //filter array from dupes
  let uniKeys = keyword.filter((item, i, ar) => ar.indexOf(item) === i);


  // Add keywords to menu
  uniKeys.forEach(function (key) {
    let $newOption = $('<option></option>').text(key);
    $($newOption).addClass('pageTwoOpt');
    $menu.append($newOption);
  });
  pages();


});


//Menu Event handler
$menu.on('change', function (event) {
  let $show = `.${event.target.value}`;
  $('section').show();
  if ($show !== '.default') {
    $('section').not($show).toggle('hide');
  }

});


//pagination

function pages() {
  $($pageTwo).hide();
  $('option').hide();
  let $showOne = $('#oneShow');
  let $showTwo = $('#twoShow');
  $('.pageOneOpt').show();

  $showOne.on('click', function (event) {
    $('.pageOneOpt').show();
    $('.pageTwoOpt').hide();
    $pageOne.show();
    $pageTwo.hide();
    defaultPage = true;
  });

  $showTwo.on('click', function (event) {

    $('.pageOneOpt').hide();
    $('.pageTwoOpt').show();
    $pageTwo.show();
    $pageOne.hide();
    defaultPage = false;
  });
}


// sorting 

$sort.on('click', function (event) {
  sortedPageOne.sort((a, b) => a.horns - b.horns);
  sortedPageTwo.sort((a, b) => a.horns - b.horns);
  if (defaultPage) {
    $pageOne.empty();
    sortedPageOne.forEach(item => {
      let $phototemplate = $('#photo-template').html();
      let rendered = Mustache.render($phototemplate, item);
      $pageOne.append(rendered);
    });
  } else if (secondPage) {
    $pageTwo.empty();
    sortedPageTwo.forEach(item => {
      let $phototemplate = $('#photo-template').html();
      let rendered = Mustache.render($phototemplate, item);
      $pageTwo.append(rendered);
    });
  }


});






