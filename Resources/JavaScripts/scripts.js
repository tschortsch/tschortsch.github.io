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
function getRule(ruleName) {
    var ss = document.styleSheets,
        rule, i, x;

    for (i = 0; i < ss.length; ++i) {
        if(ss[i].href === document.URL + 'Resources/Styles/styles.css') {
            console.log(ss[i]);
            if(ss[i].cssRules) {
                // loop through all the rules
                for (x = 0; x < ss[i].cssRules.length; ++x) {
                    rule = ss[i].cssRules[x];
                    if((rule.type === window.CSSRule.KEYFRAMES_RULE || rule.type === window.CSSRule.WEBKIT_KEYFRAMES_RULE || rule.type === window.CSSRule.MOZ_KEYFRAMES_RULE) && rule.name === ruleName) {
                        return rule;
                    }
                }
            }
        }
    }
};

function adjustBirdMoveAnimation(birdMoveRule) {
    var targetPositionOffsetX, targetPositionOffsetY, distanceX, distanceY;

    if(birdMoveRule) {
        targetPositionOffsetX = 18;
        targetPositionOffsetY = 13;
        distanceX = $('.target-position').offset().left - $('.social-buttons a.twitter').offset().left - targetPositionOffsetX;
        distanceY = $('.target-position').offset().top - $('.social-buttons a.twitter').offset().top - targetPositionOffsetY;
        birdMoveRule.deleteRule("100%");
        birdMoveRule.insertRule("100% { -webkit-transform: scaleX(-1); -moz-transform: scaleX(-1); transform: scaleX(-1); top: " + distanceY + "px; left: " + distanceX + "px; }");
    }
};

function startBirdMoveAnimation() {
    $('.fa-twitter').hide();
    $('#twitter-bird-box').show();
    $('#twitter-bird-box').addClass('twitter-bird-move');

    // show followme tooltip after bird move animation is done
    $('#twitter-bird').one('webkitAnimationEnd oanimationend MSAnimationEnd animationend',
        showFollowMeTooltip
    );
};
function stopBirdMoveAnimation() {
    hideFollowMeTooltip();
    $('#twitter-bird-box').hide();
    $('#twitter-bird-box').removeClass('twitter-bird-move');
    $('.fa-twitter').show();
};
function showFollowMeTooltip() {
    var topOffset = 5,
        leftOffset = -23,
        originalTop, originalLeft;

    $('#twitter-bird-box').tooltip('show');
    originalTop = $('a.twitter div.tooltip').css("top").replace(/[^-\d\.]/g, '');
    originalLeft = $('a.twitter div.tooltip').css("left").replace(/[^-\d\.]/g, '');
    $('a.twitter div.tooltip').css("top", (parseInt(originalTop) + topOffset) + "px");
    $('a.twitter div.tooltip').css("left", (parseInt(originalLeft) + leftOffset) + "px");
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

    birdMoveRule = getRule("bird-move");
    adjustBirdMoveAnimation(birdMoveRule);

    birdMoveAnimationTimer = setTimeout(startBirdMoveAnimation, idleTime);
    $('body').bind('mousemove scroll touchmove mousedown keydown', function(event) {
        birdMoveAnimationTimer = resetBirdMoveAnimationTimer(birdMoveAnimationTimer, idleTime);
    });

    $(window).resize(function() {
        birdMoveAnimationTimer = resetBirdMoveAnimationTimer(birdMoveAnimationTimer, idleTime);
        adjustBirdMoveAnimation(birdMoveRule);
    });
    $(window).blur(function(){
        stopBirdMoveAnimation();
        clearTimeout(birdMoveAnimationTimer);
    });
    $(window).focus(function(){
        adjustBirdMoveAnimation(birdMoveRule);
        birdMoveAnimationTimer = setTimeout(startBirdMoveAnimation, idleTime);
    });
};
