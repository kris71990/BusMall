'use strict';

var imgEl1 = document.getElementById('image1');
var imgEl2 = document.getElementById('image2');
var imgEl3 = document.getElementById('image3');

var elArray = [imgEl1, imgEl2, imgEl3];
var images = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
Item.allItems = [];

function Item(src, name) {
  this.src = src;
  this.name = name;
  Item.allItems.push(this);
}

for (var i = 0; i < images.length; i++) {
  if (images[i] === 'usb') {
    new Item('img/' + images[i] + '.gif', images[i]);
  } else if (images[i] === 'sweep') {
    new Item('img/' + images[i] + '.png', images[i]);
  } else {
    new Item('img/' + images[i] + '.jpg', images[i]);
  }
}

imgEl1.addEventListener('click', randomizer);
imgEl2.addEventListener('click', randomizer);
imgEl3.addEventListener('click', randomizer);

function randomizer() {
  var randomNumberArray = [];

  for (var i = 0; i < elArray.length; i++) {
    var random = Math.floor(Math.random() * Item.allItems.length);
    if (randomNumberArray.includes(random)) {
      i -= 1;
    } else {
      randomNumberArray.push(random);
    }
  }
  console.log(randomNumberArray);

  // var randomNumber = Math.floor(Math.random() * Item.allItems.length);
  imgEl1.setAttribute('src', Item.allItems[randomNumberArray[0]].src);
  imgEl2.setAttribute('src', Item.allItems[randomNumberArray[1]].src);
  imgEl3.setAttribute('src', Item.allItems[randomNumberArray[2]].src);
}

randomizer();