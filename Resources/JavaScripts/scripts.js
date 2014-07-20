$(document).ready(function() {
    // initialize tooltip plugin
    $('.social-buttons a').tooltip();

    // wait 2sec to complete rendering of page before initializing bird move animation
    setTimeout(initBirdMoveAnimation, 2000);
});

// Returns css rule by name
function getRule(ruleName) {
    var rule,
        ss = document.styleSheets,
        i, x;

    for (i = 0; i < ss.length; ++i) {
        if(ss[i].cssRules) {
            // loop through all the rules
            for (x = 0; x < ss[i].cssRules.length; ++x) {
                rule = ss[i].cssRules[x];
                if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === ruleName) {
                    return rule;
                }
            }
        }
    }
};

function adjustBirdMoveAnimation(birdMoveRule) {
    var
        targetPositionOffsetX, targetPositionOffsetY, distanceX, distanceY;
    if(birdMoveRule) {
        targetPositionOffsetX = 1;
        targetPositionOffsetY = 13;
        distanceX = $('.target-position').offset().left - $('.social-buttons a.twitter').offset().left - targetPositionOffsetX;
        distanceY = $('.target-position').offset().top - $('.social-buttons a.twitter').offset().top - targetPositionOffsetY;
        birdMoveRule.deleteRule("100%");
        birdMoveRule.insertRule("100% { transform: scaleX(-1); top: " + distanceY + "px; left: " + distanceX + "px; }");
    }
};

function startBirdMoveAnimation() {
    $('.fa-twitter').hide();
    $('.twitter-bird-box').show();
    $('.twitter-bird-box').addClass('twitter-bird-move');
};
function stopBirdMoveAnimation() {
    $('.twitter-bird-box').hide();
    $('.twitter-bird-box').removeClass('twitter-bird-move');
    $('.fa-twitter').show();
};
function initBirdMoveAnimation() {
    var birdMoveRule,
        idleTime = 10000,
        timeoutTimer;

    birdMoveRule = getRule("bird-move");
    adjustBirdMoveAnimation(birdMoveRule);

    timeoutTimer = setTimeout(startBirdMoveAnimation, idleTime);
    $('body').bind('mousemove scroll touchmove mousedown keydown', function(event) {
        stopBirdMoveAnimation();
        clearTimeout(timeoutTimer);
        timeoutTimer = setTimeout(startBirdMoveAnimation, idleTime);
    });

    $(window).resize(function() {
        stopBirdMoveAnimation();
        clearTimeout(timeoutTimer);
        timeoutTimer = setTimeout(startBirdMoveAnimation, idleTime);
        adjustBirdMoveAnimation(birdMoveRule);
    });
};
