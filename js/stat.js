'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const SHADE_OFFSET = 10;
const PADDING = 30;
const BAR_GAP = 50;
const TEXT_HEIGHT = 20;
const BAR_WIDTH = 40;
const BAR_HEIGHT = CLOUD_HEIGHT - PADDING * 2 - TEXT_HEIGHT * 3;

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderHoorayText = (ctx) => {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + PADDING, CLOUD_Y + PADDING);
  ctx.fillText('Список результатов:', CLOUD_X + PADDING, CLOUD_Y + PADDING + TEXT_HEIGHT);
};

const getMaxElement = (arr) => {
  let maxElement = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

const renderBars = (ctx, players, scores, maxScore) => {
  for (let i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT);
    ctx.fillText(Math.round(scores[i]), CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - TEXT_HEIGHT - (BAR_HEIGHT * scores[i]) / maxScore - TEXT_HEIGHT / 2);

    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : `hsl(235deg, ${Math.random() * 100}%, 27%)`;
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - TEXT_HEIGHT, BAR_WIDTH, (-BAR_HEIGHT * scores[i]) / maxScore);
  }
};

window.renderStatistics = (ctx, names, times) => {
  renderCloud(ctx, CLOUD_X + SHADE_OFFSET, CLOUD_Y + SHADE_OFFSET, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderHoorayText(ctx);

  let maxTime = getMaxElement(times);

  renderBars(ctx, names, times, maxTime);
};
