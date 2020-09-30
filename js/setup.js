'use strict';

const setupOpen = document.querySelector('.setup-open');
const setup = document.querySelector('.setup');
const setupClose = setup.querySelector('.setup-close');
const setupUsername = setup.querySelector('.setup-user-name');
const setupWizardCoat = setup.querySelector('.wizard-coat');
const setupWizardCoatInput = setup.querySelector('input[name=coat-color]');
const setupWizardEyes = setup.querySelector('.wizard-eyes');
const setupWizardEyesInput = setup.querySelector('input[name=eyes-color]');
const setupWizardFireball = setup.querySelector('.setup-fireball-wrap');
const setupWizardFireballInput = setup.querySelector('input[name=fireball-color]');
const setupSimilarList = setup.querySelector('.setup-similar-list');
const similarWizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');
const fragment = document.createDocumentFragment();

const MIN_NAME_LENGTH = 2;
const WIZARD_DATA = [
  {
    name: 'fullName',
    fullName: [
      ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
      ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']
    ]
  },
  {
    name: 'coatColor',
    coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)']
  },
  {
    name: 'eyeColor',
    eyeColor: ['black', 'red', 'blue', 'yellow', 'green']
  },
  {
    name: 'fireballColor',
    fireballColor: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  }
];

const getRandomNumber = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const createName = (item) => {
  const randomNum = Math.round(Math.random() * (item.length - 1));
  let anotherRandomNum = 0;

  while (randomNum === anotherRandomNum) {
    anotherRandomNum = Math.round(Math.random() * (item.length - 1));
  }

  const name = item[randomNum][getRandomNumber(item[randomNum])];
  const surname = item[anotherRandomNum][getRandomNumber(item[anotherRandomNum])];
  const fullName = `${name} ${surname}`;

  return fullName;
};

const generateWizards = (dataarr, amount) => {
  const wizards = [];

  for (let i = 0; i < amount; i++) {
    let wizard = {};

    dataarr.forEach(function (element) {
      let nameValue = element.name;

      if (nameValue === 'fullName') {
        wizard[nameValue] = createName(element[nameValue]);
      } else {
        wizard[nameValue] = element[nameValue][getRandomNumber(element[nameValue])];
      }
    });
    wizards.push(wizard);
  }

  return wizards;
};

const renderWizard = (wizard) => {
  const wizardItem = similarWizardTemplate.cloneNode(true);
  const wizardName = wizardItem.querySelector('.setup-similar-label');
  const wizardCoat = wizardItem.querySelector('.wizard-coat');
  const wizardEyes = wizardItem.querySelector('.wizard-eyes');

  wizardName.textContent = wizard.fullName;
  wizardCoat.style.fill = wizard.coatColor;
  wizardEyes.style.fill = wizard.eyeColor;

  return wizardItem;
};

const fillFragment = (frag, list, func) => {
  for (let i = 0; i < list.length; i++) {
    frag.appendChild(func(list[i]));
  }
  return frag;
};

const onPopupEscPress = (evt) => {
  if (evt.key === 'Escape' && setupUsername !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = () => {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

const closePopup = () => {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

const rgb2hex = (rgb) => {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
};

const changeFillColor = (element, currentArr, input) => {
  const currentColor = element.style.fill;
  let currentColorIndex = currentArr.indexOf(currentColor);
  currentColorIndex++;

  if (currentColorIndex === currentArr.length) {
    currentColorIndex = 0;
  }

  element.style.fill = currentArr[currentColorIndex];
  input.value = currentArr[currentColorIndex];
};

const changeBgColor = (element, currentArr, input) => {
  const currentColor = element.style.backgroundColor;
  let currentColorIndex = currentArr.indexOf(rgb2hex(currentColor));
  currentColorIndex++;

  if (currentColorIndex === currentArr.length) {
    currentColorIndex = 0;
  }

  element.style.backgroundColor = currentArr[currentColorIndex];
  input.value = currentArr[currentColorIndex];
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

setupUsername.addEventListener('input', function () {
  const valueLength = setupUsername.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    setupUsername.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else {
    setupUsername.setCustomValidity('');
  }
  setupUsername.reportValidity();
});

setupWizardCoat.addEventListener('click', function () {
  changeFillColor(setupWizardCoat, WIZARD_DATA[1].coatColor, setupWizardCoatInput);
});

setupWizardEyes.addEventListener('click', function () {
  changeFillColor(setupWizardEyes, WIZARD_DATA[2].eyeColor, setupWizardEyesInput);
});

setupWizardFireball.addEventListener('click', function () {
  changeBgColor(setupWizardFireball, WIZARD_DATA[3].fireballColor, setupWizardFireballInput);
});

setup.querySelector('.setup-similar').classList.remove('hidden');

const wizardList = generateWizards(WIZARD_DATA, 4);

fillFragment(fragment, wizardList, renderWizard);

setupSimilarList.appendChild(fragment);

