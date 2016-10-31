'use strict';

require('./custom-slider/custom-slider.module.js');
const angular            = require('angular');
require('angular-mousewheel');
require('ngtouchstart');
require('ngtouchend');
const simpleSliderModule = angular.module('simpleSlider', [
    'customSlider',
    'monospaced.mousewheel',
    'ngTouchstart',
    'ngTouchend'
]);
