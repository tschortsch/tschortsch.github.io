// initialize tooltip plugin
$('.social-buttons a').tooltip();

// Returns a reference to the specified CSS rule(s).
function getRule(ruleName) {
    var rule;
    var ss = document.styleSheets;
    for (var i = 0; i < ss.length; ++i) {
        if(ss[i].cssRules) {
            // loop through all the rules!
            for (var x = 0; x < ss[i].cssRules.length; ++x) {
                rule = ss[i].cssRules[x];
                if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === ruleName) {
                    return rule;
                }
            }
        }
    }
}
var birdMoveRule = getRule("bird-move");

if(birdMoveRule) {
    var targetPositionOffsetX = 5;
    var targetPositionOffsetY = 10;
    console.log("target top: " + $('.target-position').offset().top);
    console.log("twitter top: " + $('.social-buttons a.twitter').offset().top);
    var distanceX = $('.target-position').offset().left - $('.social-buttons a.twitter').offset().left - targetPositionOffsetX;
    var distanceY = $('.target-position').offset().top - $('.social-buttons a.twitter').offset().top - targetPositionOffsetY;
    console.log(distanceX + " " + distanceY);
    //birdMoveRule.deleteRule("100%");
    //birdMoveRule.insertRule("100% { -webkit-transform: scaleX(-1); top: " + distanceY + "px; left: " + distanceX + "px; }");
    console.log(birdMoveRule);
}

var idleActive = false;
var timeout = function() {
    idleActive = true;
    $('.twitter-bird-box').show();
    $('.twitter-bird-box').addClass('twitter-bird-move');
    $('.fa-twitter').hide();
};
var timeoutTime = 5000;
var timeoutTimer = setTimeout(timeout, timeoutTime);
$(document).ready(function() {
    $('body').bind('mousemove mousedown keydown', function(event) {
        if(idleActive) {
            $('.fa-twitter').show();
            $('.twitter-bird-box').hide();
            $('.twitter-bird-box').removeClass('twitter-bird-move');
        }
        clearTimeout(timeoutTimer);
        timeoutTimer = setTimeout(timeout, timeoutTime);
    });
});