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
}

function initBirdMoveAnimation() {
    var birdMoveRule = getRule("bird-move"),
        targetPositionOffsetX, targetPositionOffsetY, distanceX, distanceY,
        idleActive = false,
        idleTime = 10000,
        startAnimation,
        timeoutTimer;

    if(birdMoveRule) {
        // ajust bird move animation by getting offset of web elements
        targetPositionOffsetX = 1;
        targetPositionOffsetY = 13;
        distanceX = $('.target-position').offset().left - $('.social-buttons a.twitter').offset().left - targetPositionOffsetX;
        distanceY = $('.target-position').offset().top - $('.social-buttons a.twitter').offset().top - targetPositionOffsetY;
        birdMoveRule.deleteRule("100%");
        birdMoveRule.insertRule("100% { -webkit-transform: scaleX(-1); top: " + distanceY + "px; left: " + distanceX + "px; }");
    }

    startAnimation = function() {
        idleActive = true;
        $('.twitter-bird-box').show();
        $('.twitter-bird-box').addClass('twitter-bird-move');
        $('.fa-twitter').hide();
    };
    timeoutTimer = setTimeout(startAnimation, idleTime);
    $('body').bind('mousemove scroll mousedown keydown', function(event) {
        if(idleActive) {
            // restore website / stop animation
            $('.fa-twitter').show();
            $('.twitter-bird-box').hide();
            $('.twitter-bird-box').removeClass('twitter-bird-move');
        }
        clearTimeout(timeoutTimer);
        timeoutTimer = setTimeout(startAnimation, idleTime);
    });
}
