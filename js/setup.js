'use strict';

const userSettings = document.querySelector('.setup');
const setupSimilarList = userSettings.querySelector('.setup-similar-list');
const similarWizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');
const fragment = document.createDocumentFragment();
const WIZARD_DATA = [
  {
    name: 'name',
    content: [
      ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
      ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']
    ]
  },
  {
    name: 'coatColor',
    content: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)']
  },
  {
    name: 'eyeColor',
    content: ['black', 'red', 'blue', 'yellow', 'green']
  }
];

const getRandomNumber = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const createName = (item) => {
  let randomNum = Math.round(Math.random() * (item.length - 1));
  let anotherRandomNum = 0;

  while (randomNum === anotherRandomNum) {
    anotherRandomNum = Math.round(Math.random() * (item.length - 1));
  }

  let name = item[randomNum][getRandomNumber(item[randomNum])];
  let surname = item[anotherRandomNum][getRandomNumber(item[anotherRandomNum])];
  let fullName = `${name} ${surname}`;

  return fullName;
};

const generateWizards = (dataarr, amount) => {
  let wizards = [];

  for (let i = 0; i < amount; i++) {
    let wizard = {};

    dataarr.forEach(function (element) {
      if (element.name === 'name') {
        wizard[element.name] = createName(element.content);
      } else {
        wizard[element.name] = element.content[getRandomNumber(element.content)];
      }
    });
    wizards.push(wizard);
  }

  return wizards;
};

const renderWizard = (wizard) => {
  let wizardItem = similarWizardTemplate.cloneNode(true);
  let wizardName = wizardItem.querySelector('.setup-similar-label');
  let wizardCoat = wizardItem.querySelector('.wizard-coat');
  let wizardEyes = wizardItem.querySelector('.wizard-eyes');

  wizardName.textContent = wizard.name;
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

userSettings.classList.remove('hidden');
userSettings.querySelector('.setup-similar').classList.remove('hidden');

const wizardList = generateWizards(WIZARD_DATA, 4);

fillFragment(fragment, wizardList, renderWizard);

setupSimilarList.appendChild(fragment);
