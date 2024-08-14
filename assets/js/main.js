$(document).ready(function() {
    let totalItems = 0;
    let totalPrice = 0;
    let discountApplied = false;
    let doubleClicked = false;

    function updateSummary() {
        let discountedPrice = totalPrice;
        if (discountApplied) {
            discountedPrice = totalPrice * 0.8; // Aplicar un descuento del 20%
        }
        $('#items-summary').text(`Artículos: ${totalItems}`);
        $('#price-summary').text(`Total: $${discountedPrice.toFixed(2)}`);
        const shippingCost = parseInt($('#shipping').val());
        $('#total-summary').text(`PRECIO TOTAL: $${(discountedPrice + shippingCost).toFixed(2)}`);
    }

    $('.quantity-btn').on('click', function() {
        const quantityInput = $(this).siblings('input');
        let quantity = parseInt(quantityInput.val());

        if ($(this).text() === '+') {
            quantity += 1;
        } else if (quantity > 0) {
            quantity -= 1;
        }

        quantityInput.val(quantity);
        totalItems = parseInt($('#quantity-burdeo').val()) + parseInt($('#quantity-gris').val()) + parseInt($('#quantity-negra').val());
        totalPrice = totalItems * 10000;

        updateSummary();
    });

    $('#shipping').on('change', updateSummary);

    $('#discount-code').on('input', function() {
        const currentValue = $(this).val().toUpperCase();
        $(this).val(currentValue);
        $(this).css('color', 'blue');
    });

    $('#discount-code').on('keypress', function(e) {
        if (e.which === 13) { // Detecta la tecla Enter
            e.preventDefault();
            const discountCode = $(this).val();
            if (discountCode === "JQUERY2222" && !discountApplied) {
                $(this).css('background-color', 'green').css('color', 'white');
                discountApplied = true;
                updateSummary(); // Actualizar el resumen con el descuento aplicado
            } else {
                alert("Código de descuento incorrecto o ya aplicado.");
            }
        }
    });

    $('#purchase-btn').on('click', function() {
        if (discountApplied && !doubleClicked) {
            $(this).text('¿Estás Seguro?').css('background-color', 'yellow');
        }
    });

    $('#purchase-btn').on('dblclick', function() {
        if (discountApplied) {
            $(this).text('¡Ok!').css('background-color', 'blue');
            doubleClicked = true;
        }
    });

    $('#purchase-btn').on('mouseleave', function() {
        if (doubleClicked) {
            $(this).text('Comprado').css('background-color', 'grey').css('color', 'green');
        }
    });
});
