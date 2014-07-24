$(document).ready(function() {
    // initialize tooltip plugin
    $('.social-buttons a').tooltip();

    // set current year in copyright
    $('#current-year').html(new Date().getFullYear());

    // only initialize animation if browser supports it (every browser but IE9 or older) (http://tanalin.com/en/articles/ie-version-js/)
    if(!(document.all && !window.atob)) {
        // wait 5sec to complete rendering of page before initializing bird move animation
        setTimeout(initBirdMoveAnimation, 5000);
    }
});

// Returns css rule by name
function getKeyframeRule(ruleName, styleSheetUrl) {
    var ss = document.styleSheets,
        rule, i, x;

    for (i = 0; i < ss.length; ++i) {
        if(ss[i].href === styleSheetUrl && ss[i].cssRules) {
            // loop through all the rules
            for (x = 0; x < ss[i].cssRules.length; ++x) {
                rule = ss[i].cssRules[x];
                if((rule.type === window.CSSRule.KEYFRAMES_RULE || rule.type === window.CSSRule.WEBKIT_KEYFRAMES_RULE || rule.type === window.CSSRule.MOZ_KEYFRAMES_RULE) && rule.name === ruleName) {
                    return rule;
                }
            }
        }
    }
    return null;
}

function getKeyframeIndex(keyframeRule, keyText) {
    var i;
    for(i = 0; i < keyframeRule.cssRules.length; ++i) {
        if(keyframeRule.cssRules[i].keyText === keyText) {
            return i;
        }
    }
    return -1;
}
function adjustBirdMoveAnimation(birdMoveRule) {
    var targetPositionElement = $('.target-position'),
        startPositionElement = $('.social-buttons a.twitter'),
        targetPositionOffsetX, targetPositionOffsetY, distanceX, distanceY,
        animationEndRuleIndex, newAnimationEndRule;

    if(!birdMoveRule) {
        return;
    }

    targetPositionOffsetX = 18;
    targetPositionOffsetY = 13;
    distanceX = targetPositionElement.offset().left - startPositionElement.offset().left - targetPositionOffsetX;
    distanceY = targetPositionElement.offset().top - startPositionElement.offset().top - targetPositionOffsetY;

    // find keyframe index because IE only allows to deleteRule by index
    animationEndRuleIndex = getKeyframeIndex(birdMoveRule, "100%");
    if(animationEndRuleIndex === -1) {
        return;
    }

    birdMoveRule.deleteRule(animationEndRuleIndex);
    newAnimationEndRule = "100% { -webkit-transform: scaleX(-1); -moz-transform: scaleX(-1); transform: scaleX(-1); top: " + distanceY + "px; left: " + distanceX + "px; }";
    // Check if appendRule function is available (for Mozilla browsers) (see: https://developer.mozilla.org/en-US/docs/Web/API/CSSKeyframesRule)
    if(jQuery.isFunction(birdMoveRule.appendRule)) {
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
function initBirdMoveAnimation() {
    var birdMoveRule,
        idleTime = 10000,
        birdMoveAnimationTimer;

    birdMoveRule = getKeyframeRule("bird-move", document.URL + "Resources/Styles/styles.css");
    adjustBirdMoveAnimation(birdMoveRule);

    birdMoveAnimationTimer = setTimeout(startBirdMoveAnimation, idleTime);
    $('body').bind('mousemove scroll touchmove mousedown keydown', function(event) {
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
}