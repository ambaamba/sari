var currentOffset = 0;
var currentProduct = 0;
var numberProducts = 11; //nombre de project -1, car on commence à compter à partir de 0

$(document).ready(function() {
    console.log("ready!");

    $(".buttonLeft").on("click", function() {
        if (currentOffset < 0) currentOffset = currentOffset + 100;
        
        if(currentProduct > 0) {
            --currentProduct
            load_canvas(currentProduct)
        }

        $(".products").css("left", currentOffset + "%");

        console.log("Current product: ", currentProduct);
    });

    $(".buttonRight").on("click", function() {
        if (currentOffset > numberProducts * -100) currentOffset = currentOffset - 100;

        if (currentProduct < numberProducts - 1) {
            ++currentProduct
            load_canvas(currentProduct)
        }
        

        $(".products").css("left", currentOffset + "%");
        
        console.log("Current product: ", currentProduct);
    });



    // Condition "ternaire" voir https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    //
    // var foo = 0
    // if (condition())
    //     foo = 100;
    // else
    //     foo = 1;
    //
    // var foo = (currenOfsset > numberProducts) ? valeurSiTrue : valeurSiFalse;
});