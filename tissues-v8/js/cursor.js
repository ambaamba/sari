let $bigBall, $smallBall, $hoverables

$(document).ready(function () {
    // Move the cursor
    function onMouseMove(e) {
        TweenMax.to($bigBall, 0.4, {
            x: e.pageX - 15,
            y: e.pageY - 15
        });
        TweenMax.to($smallBall, 0.1, {
            x: e.pageX - 5,
            y: e.pageY - 7
        });
    }

    // Hover an element
    function onMouseHover() {
        TweenMax.to($bigBall, 0.3, {
            scale: 4
        });
    }

    function onMouseHoverOut() {
        TweenMax.to($bigBall, 0.3, {
            scale: 1
        });
    }

    // Var assignment
    $bigBall = document.querySelector(".cursor__ball--big");
    $smallBall = document.querySelector(".cursor__ball--small");
    $hoverables = document.querySelectorAll(".hoverable");

    // Listeners
    document.body.addEventListener("mousemove", onMouseMove);
    for (let i = 0; i < $hoverables.length; i++) {
        $hoverables[i].addEventListener("mouseenter", onMouseHover);
        $hoverables[i].addEventListener("mouseleave", onMouseHoverOut);
    }
});

window.addEventListener("load", init);

function init() {
  const img = document.querySelector("img");
  const {width} = img.getBoundingClientRect();
  const halfImgWidth = width / 2;

  img.addEventListener("mousemove", function(e) {
    const xPos = e.pageX - img.offsetLeft;
    /*IE11 need this*/
    //this.classList.remove("cursor-prev");
    //this.classList.remove("cursor-next");
    this.classList.remove("cursor-prev", "cursor-next");
    if (xPos > halfImgWidth) {
      this.classList.add("cursor-next");
    } else {
      this.classList.add("cursor-prev");
    }
  });
}