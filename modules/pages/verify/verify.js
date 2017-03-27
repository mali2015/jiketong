module.exports = {
    url: '/verify',
    template: __inline('./verify.html'),
    controller: ["$scope",
        function($scope) {
            var timer;
            var s = 20;
            $(".anew").on("click", function() {
                if (this.className.indexOf("on") != -1) {
                    return false; }
                var self = $(this);
                self.addClass("on");
                timer = setInterval(function() {
                    if (s == 0) {
                        clearInterval(timer);
                        self.removeClass("on");
                        s = 20;
                    }
                    s--;
                    self.find(".count-down").text("(" + s + "s)");
                }, 1000)
            });
        }
    ]
};
