const fireballSize = 22;
const wizardSpeed = 3;
const wizardWidth = 70;

function getFireballSpeed(isMovingLeft) {
  return isMovingLeft ? 2 : 5;
};

function getWizardHeight() {
  return 1.337 * wizardWidth;
};

function getWizardX(fieldWidth) {
  return (fieldWidth - wizardWidth) / 2;
};

function getWizardY(fieldHeight) {
  return fieldHeight / 3;
};
