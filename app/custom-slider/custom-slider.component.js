'use strict';

export default (customSliderModule) => {
    customSliderModule.component('customSlider', {
        template     : require('./custom-slider.template.html'),
        controllerAs : 'cslider',
        controller   : ['$scope', function ($scope) {
            var cslider = this,
                MobileDetect = require('mobile-detect'),
                md = new MobileDetect(window.navigator.userAgent);

            this.isMobile = md.mobile() || md.phone() || md.tablet();
            this.slides = [];
            this.slideCount = 0;
            this.whellDelta  = 80;
            this.SLIDE_WIDTH_FROM = 100;
            this.slidesWidth = 0;
            this.sliderWidth = 600;
            this.SLIDE_MARGIN = 25;
            this.sliderPositionX = 0;
            this.sliderSpeed = 400; // pixels per second
            this.sliderFPS = 30;
            this.sliderTimeout = parseInt(1000 / this.sliderFPS, 10);
            this.shiftPerTimeout = parseInt(this.sliderSpeed / this.sliderFPS, 10);
            this.moveDescriptor = null;
            
            this.getCurrentSliderBoxStyle = function () {
                return {
                    'width' : cslider.sliderWidth + 'px'
                };
            };

            this.getCurrentSliderStyle = function () {
                return {
                    'width' : cslider.slidesWidth + 'px',
                    'left'  : cslider.sliderPositionX + 'px'
                };
            };

            this.redraw = function () {
                var slideCount = parseInt(this.slideCount, 10),
                    slidesWidth = 0,
                    index;
                if (!isNaN(slideCount)) {
                    this.slides = [];
                    for (index = 0; index < slideCount; index += 1) {
                        var width = this.SLIDE_WIDTH_FROM + parseInt(Math.random() * 100, 10);
                        this.slides.push({
                            'width' : width
                        });
                        slidesWidth += width;
                    }
                    this.slidesWidth = slidesWidth + (2 * slideCount * this.SLIDE_MARGIN);
                    this.sliderPositionX = fitNewPositionX(this.sliderPositionX);
                }
            }

            function fitNewPositionX (newSliderPositionX) {
                var minimum = (cslider.slidesWidth - cslider.sliderWidth);
                minimum = minimum < 0 ? 0 : -minimum;
                return Math.max(minimum, Math.min(newSliderPositionX, 0));
            }

            function startToMove(sing) {
                function nextMove() {
                    cslider.sliderPositionX = fitNewPositionX(cslider.sliderPositionX + (cslider.shiftPerTimeout * sing));
                    cslider.moveDescriptor = setTimeout(nextMove, cslider.sliderTimeout);
                    $scope.$apply();
                }
                setTimeout(nextMove, 0);
            }

            this.startToMoveLeft = function () {
                this.stopToMove();
                startToMove(1);
            }

            this.stopToMove = function () {
                clearTimeout(this.moveDescriptor);
            }

            this.startToMoveRight = function () {
                this.stopToMove();
                startToMove(-1);
            }

            this.moveLeft = function () {
                this.sliderPositionX = fitNewPositionX(this.sliderPositionX - this.whellDelta);
            }

            this.moveRight = function () {
                this.sliderPositionX = fitNewPositionX(this.sliderPositionX + this.whellDelta);
            }

            this.mouseWheel = function (event) {
                if (event.deltaY < 0) {
                    this.moveRight();
                } else {
                    this.moveLeft();
                }
            }

            this.touchstartLeftArrow = function () {
                this.startToMoveLeft();
            };
            this.touchendLeftArrow = function () {
                this.stopToMove();
            };
            this.mousedownLeftArrow = function () {
                if (!this.isMobile) {
                    this.startToMoveLeft();
                }
            };
            this.mouseupLeftArrow = function () {
                if (!this.isMobile) {
                    this.stopToMove();
                }
            };
            this.mouseleaveLeftArrow = function () {
                if (!this.isMobile) {
                    this.stopToMove();
                }
            };

            this.touchstartRightArrow  = function () {
                this.startToMoveRight();
            };
            this.touchendRightArrow  = function () {
                this.stopToMove();
            };
            this.mousedownRightArrow  = function () {
                if (!this.isMobile) {
                    this.startToMoveRight();
                }
            };
            this.mouseupRightArrow  = function () {
                if (!this.isMobile) {
                    this.stopToMove();
                }
            };
            this.mouseleaveRightArrow  = function () {
                if (!this.isMobile) {
                    this.stopToMove();
                }
            };

        }]
    });
}