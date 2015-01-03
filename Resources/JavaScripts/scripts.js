$(document).ready(function() {
    // initialize tooltip plugin
    $('.twitter-bird-box').tooltip();

    // set current year in copyright
    $('#current-year').html(new Date().getFullYear());

    // set current age
    $('#current-age').html(tschortsch.calculateAge());

    // only initialize animation if browser supports it (every browser but IE9 or older) (http://tanalin.com/en/articles/ie-version-js/)
    if (!(document.all && !window.atob)) {
        // wait 5sec to complete rendering of page before initializing bird move animation
        setTimeout(tschortsch.initBirdMoveAnimation, 5000);
    }
});

// create tschortsch namespace
(function(tschortsch, $) {

    var birdMoveAnimationInitialized = false;
    // ----------------------------------------------------------
    // If you're not in IE (or IE version is less than 5) then:
    // ie === undefined
    // If you're in IE (>=5) then you can determine which version:
    // ie === 7; // IE7
    // Thus, to detect IE:
    // if (ie) {}
    // And to detect the version:
    // ie === 6 // IE6
    // ie > 7 // IE8, IE9, IE10 ...
    // ie < 9 // Anything less than IE9
    // ----------------------------------------------------------
    tschortsch.ie = (function(){
        var undef,rv = -1, // Return value assumes failure.
            ua = window.navigator.userAgent,
            msie = ua.indexOf('MSIE '),
            trident = ua.indexOf('Trident/'),
            rvNum;

        if (msie > 0) {
            // IE 10 or older => return version number
            rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        } else if (trident > 0) {
            // IE 11 (or newer) => return version number
            rvNum = ua.indexOf('rv:');
            rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
        }

        return ((rv > -1) ? rv : undef);
    }());

    function getKeyframeRule(ruleName, styleSheetUrl) {
        var ss = document.styleSheets,
            rule, i, x;

        for (i = 0; i < ss.length; ++i) {
            if (ss[i].href === styleSheetUrl && ss[i].cssRules) {
                // loop through all the rules
                for (x = 0; x < ss[i].cssRules.length; ++x) {
                    rule = ss[i].cssRules[x];
                    if ((rule.type === window.CSSRule.KEYFRAMES_RULE || rule.type === window.CSSRule.WEBKIT_KEYFRAMES_RULE) && rule.name === ruleName) {
                        return rule;
                    }
                }
            }
        }
        return null;
    }

    function calculateDistanceX(elementA, elementB) {
        var targetPositionOffsetX = 16;
        return elementB.offset().left - elementA.offset().left - targetPositionOffsetX;
    }

    function calculateDistanceY(elementA, elementB) {
        var targetPositionOffsetY = 15;
        return elementB.offset().top - elementA.offset().top - targetPositionOffsetY;
    }

    function adjustBirdMoveAnimation(birdMoveRule) {
        var startPositionElement = $('.social-buttons a.twitter'),
            targetPositionElement = $('.target-position'),
            animationEndRuleIndex, newAnimationEndRule;

        if (!birdMoveRule) {
            return;
        }

        // In IE the deleteRule function only accepts numbers from 0 to 1
        if(tschortsch.ie) {
            birdMoveRule.deleteRule(1);
        } else {
            birdMoveRule.deleteRule("100%");
        }

        newAnimationEndRule = "100% { -webkit-transform: scaleX(-1); transform: scaleX(-1); top: " + calculateDistanceY(startPositionElement, targetPositionElement) + "px; left: " + calculateDistanceX(startPositionElement, targetPositionElement) + "px; }";
        // Check if appendRule function is available (for Mozilla browsers) (see: https://developer.mozilla.org/en-US/docs/Web/API/CSSKeyframesRule)
        if ($.isFunction(birdMoveRule.appendRule)) {
            birdMoveRule.appendRule(newAnimationEndRule);
        } else {
            birdMoveRule.insertRule(newAnimationEndRule);
        }
    }

    function startBirdMoveAnimation() {
        var twitterBirdBoxElement = $('#twitter-bird-box'),
            twitterBirdElement = $('#twitter-bird'),
            twitterIconElement = $('.fa-twitter');

        twitterIconElement.hide();
        twitterBirdBoxElement.show();
        twitterBirdElement.show();
        twitterBirdElement.addClass('twitter-bird-fly');
        twitterBirdBoxElement.addClass('twitter-bird-move');

        // show followme tooltip after bird move animation is done
        twitterBirdElement.one('webkitAnimationEnd oanimationend MSAnimationEnd animationend',
            showFollowMeTooltip
        );
    }

    function stopBirdMoveAnimation() {
        var twitterBirdBoxElement = $('#twitter-bird-box'),
            twitterBirdElement = $('#twitter-bird'),
            twitterIconElement = $('.fa-twitter');

        twitterBirdElement.off();
        hideFollowMeTooltip();
        twitterBirdBoxElement.removeClass('twitter-bird-move');
        twitterBirdElement.removeClass('twitter-bird-fly');
        twitterBirdElement.hide();
        twitterBirdBoxElement.hide();
        twitterIconElement.show();
    }

    function showFollowMeTooltip() {
        var topOffset = 5,
            leftOffset = -23,
            twitterBirdBoxElement = $('#twitter-bird-box'),
            followMeTooltipElement,
            originalTop, originalLeft;

        twitterBirdBoxElement.tooltip('show');
        followMeTooltipElement = $('a.twitter div.tooltip');
        originalTop = followMeTooltipElement.css("top").replace(/[^-\d\.]/g, '');
        originalLeft = followMeTooltipElement.css("left").replace(/[^-\d\.]/g, '');
        followMeTooltipElement.css("top", (parseInt(originalTop) + topOffset) + "px");
        followMeTooltipElement.css("left", (parseInt(originalLeft) + leftOffset) + "px");
    }

    function hideFollowMeTooltip() {
        $('#twitter-bird-box').tooltip('hide');
    }

    function resetBirdMoveAnimationTimer(birdMoveAnimationTimer, idleTime) {
        stopBirdMoveAnimation();
        clearTimeout(birdMoveAnimationTimer);
        return setTimeout(startBirdMoveAnimation, idleTime);
    }

    tschortsch.initBirdMoveAnimation = function() {
        var birdMoveRule,
            idleTime = 10000,
            birdMoveAnimationTimer;

        if (document.all && !window.atob) {
            console.log("Internet Explorer 9 and older doesn't support CSS3 animations. So stop trying!");
            return;
        }

        if (birdMoveAnimationInitialized) {
            console.log("bird move animation already initialized!");
            return;
        }

        birdMoveRule = getKeyframeRule("bird-move", document.URL + "Resources/Styles/styles.css");
        adjustBirdMoveAnimation(birdMoveRule);

        birdMoveAnimationTimer = setTimeout(startBirdMoveAnimation, idleTime);
        $('body').bind('mousemove scroll touchmove touchstart mousedown keydown', function(event) {
            birdMoveAnimationTimer = resetBirdMoveAnimationTimer(birdMoveAnimationTimer, idleTime);
        });

        $(window).resize(function() {
            birdMoveAnimationTimer = resetBirdMoveAnimationTimer(birdMoveAnimationTimer, idleTime);
            adjustBirdMoveAnimation(birdMoveRule);
        });
        $(window).blur(function() {
            stopBirdMoveAnimation();
            clearTimeout(birdMoveAnimationTimer);
        });
        $(window).focus(function() {
            adjustBirdMoveAnimation(birdMoveRule);
            birdMoveAnimationTimer = setTimeout(startBirdMoveAnimation, idleTime);
        });
        birdMoveAnimationInitialized = true;
    };

    tschortsch.calculateAge = function() {
        var birthDate = new Date(1985, 4, 2), // Attention: month parameter is 0-based!
            today = new Date(),
            age, m;

        age = today.getFullYear() - birthDate.getFullYear();
        m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
}(window.tschortsch = window.tschortsch || {}, jQuery));
