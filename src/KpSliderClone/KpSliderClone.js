(function ($) {

    $.fn.kpSliderClone = function (options) {

        var config = {
            leftButton: 'images/left.png',
            leftButtonStyle: {
                height: 22,
                left: 10
            },
            rightButton: 'images/right.png',
            rightButtonStyle: {
                height: 22,
                right: 10
            }
        };

        if ($.isPlainObject(options)) {
            $.extend(true, config, options);
        }

        var slider = this;

        $(slider).css('position', 'relative');
        // 所有图片
        var imgs = $(this).find('img');
        // 图片总数
        var imgCount = imgs.length;

        var imgIsLoaded = 0;
        $(imgs).on('load', function () {
            if (++imgIsLoaded === imgCount) {
                sliderInit();
            }
        })

        function sliderInit() {
            // 图片宽度
            var imgWidth = $(imgs).width();
            // 图片高度
            var imgHeight = $(imgs).height();

            // 创建overflowDiv
            var overflowDiv = $('<div></div>').css({overflow: 'hidden'});
            // 创建ul
            var ul = $('<ul></ul>').css({width: (imgCount + 2) * imgWidth});
            // 将图片插入到a标签，将a插入到li，将li插入到ul
            $(imgs).each(function () {
                $('<li></li>').append($('<a></a>').append(this)).appendTo(ul).css({float: 'left'});
            })
            // 将ul插入到overflowDiv
            overflowDiv.append(ul).appendTo(slider);
            // 克隆最后一个li
            var lastLiClone = $(ul).find('li:last').clone().addClass('last-li-clone');
            // 克隆第一个li
            var firstLiClone = $(ul).find('li:first').clone().addClass('first-li-clone');

            // 将克隆的li插入到ul最前和最后
            $(ul).append(firstLiClone).prepend(lastLiClone);
            // 将当前ul的可视区定位到第2个li
            $(ul).css({marginLeft: -imgWidth});

            // 创建左右按钮
            var leftButton = $('<a></a>').css({
                position: 'absolute',
                top: (imgHeight - config.leftButtonStyle.height) / 2,
                display: 'block'
            }).css(config.leftButtonStyle).append($('<img />').attr('src', config.leftButton)).appendTo(slider);

            var rightButton = $('<a></a>').css({
                position: 'absolute',
                top: (imgHeight - config.rightButtonStyle.height) / 2,
                display: 'block'
            }).css(config.rightButtonStyle).append($('<img />').attr('src', config.rightButton)).appendTo(slider);

            var n = 1;
            $(rightButton).on('click', function (a, b, c) {
                // arguments.callee === 指向当前函数的引用
                var __FUNCTION__ = arguments.callee;

                $(this).off('click', __FUNCTION__);
                ++n;
                $(ul).animate({marginLeft: -n * imgWidth}, function () {
                    if (n > imgCount) {
                        n = 1;
                        $(this).css({marginLeft: -imgWidth});
                    }
                    $(rightButton).on('click', __FUNCTION__);
                });
            });

            $(leftButton).on('click', function () {
                --n;
                var __FUNCTION__ = arguments.callee;
                $(this).off('click', __FUNCTION__);
                $(ul).animate({marginLeft: -n * imgWidth}, function () {
                    if (n < 1) {
                        n = imgCount;
                        $(this).css({marginLeft: -n * imgWidth});
                    }
                    $(leftButton).on('click', __FUNCTION__);
                });
            });


        }
    };


})(jQuery);