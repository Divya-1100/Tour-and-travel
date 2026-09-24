
/* =========================================
   JOURNEYGO - COMPLETE JAVASCRIPT
========================================= */

const tours = {
    1: {
        id: 1,
        name: "Goa Beach Escape",
        location: "Goa, India",
        duration: "4 Days / 3 Nights",
        price: 12999,
        imageClass: "product-goa"
    },

    2: {
        id: 2,
        name: "Kerala Backwaters",
        location: "Kerala, India",
        duration: "5 Days / 4 Nights",
        price: 18499,
        imageClass: "product-kerala"
    },

    3: {
        id: 3,
        name: "Manali Mountain Trip",
        location: "Himachal Pradesh, India",
        duration: "5 Days / 4 Nights",
        price: 16999,
        imageClass: "product-manali"
    },

    4: {
        id: 4,
        name: "Dubai Luxury Escape",
        location: "Dubai, UAE",
        duration: "5 Days / 4 Nights",
        price: 45999,
        imageClass: "product-dubai"
    },

    5: {
        id: 5,
        name: "Paris Romantic Holiday",
        location: "Paris, France",
        duration: "6 Days / 5 Nights",
        price: 79999,
        imageClass: "product-paris"
    },

    6: {
        id: 6,
        name: "Singapore Family Tour",
        location: "Singapore",
        duration: "5 Days / 4 Nights",
        price: 52999,
        imageClass: "product-singapore"
    }
};


/* =========================================
   GET CART
========================================= */

function getCart() {

    try {
        return JSON.parse(
            localStorage.getItem("journeyGoCart")
        ) || [];
    }

    catch (error) {
        console.error("Cart error:", error);
        return [];
    }
}


/* =========================================
   SAVE CART
========================================= */

function saveCart(cart) {

    localStorage.setItem(
        "journeyGoCart",
        JSON.stringify(cart)
    );
}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(id) {

    console.log("Add to cart clicked:", id);

    if (!tours[id]) {

        alert("Tour not found.");

        return;
    }

    let cart = getCart();

    const existingItem = cart.find(
        item => Number(item.id) === Number(id)
    );

    if (existingItem) {

        existingItem.quantity =
            Number(existingItem.quantity) + 1;

    } else {

        cart.push({
            id: Number(id),
            quantity: 1
        });
    }

    saveCart(cart);

    updateCartCount();

    alert(
        tours[id].name +
        " has been added to your cart!"
    );
}


/* =========================================
   UPDATE CART COUNT
========================================= */

function updateCartCount() {

    const cart = getCart();

    let count = 0;

    cart.forEach(item => {
        count += Number(item.quantity) || 0;
    });

    document.querySelectorAll("#cartCount").forEach(
        element => {
            element.textContent = count;
        }
    );
}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(id) {

    let cart = getCart();

    cart = cart.filter(
        item => Number(item.id) !== Number(id)
    );

    saveCart(cart);

    updateCartCount();

    renderCart();
}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(id, change) {

    let cart = getCart();

    const item = cart.find(
        item => Number(item.id) === Number(id)
    );

    if (!item) return;

    item.quantity =
        Number(item.quantity) + Number(change);

    if (item.quantity <= 0) {

        cart = cart.filter(
            item => Number(item.id) !== Number(id)
        );
    }

    saveCart(cart);

    updateCartCount();

    renderCart();
}


/* =========================================
   CALCULATE SUBTOTAL
========================================= */

function calculateSubtotal() {

    const cart = getCart();

    return cart.reduce((total, item) => {

        const tour = tours[item.id];

        if (!tour) return total;

        return total +
            tour.price *
            Number(item.quantity);

    }, 0);
}


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

    const container =
        document.getElementById("cartContainer");

    if (!container) return;

    const cart = getCart();

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>Your cart is empty</h2>

                <p>
                    You haven't added any tour packages yet.
                </p>

                <br>

                <a href="products.html"
                   class="primary-btn">
                    Explore Tours
                </a>

            </div>
        `;

        return;
    }


    let itemsHTML = "";

    cart.forEach(item => {

        const tour = tours[item.id];

        if (!tour) return;

        const quantity =
            Number(item.quantity);

        const total =
            tour.price * quantity;


        itemsHTML += `

            <div class="cart-item">

                <div class="cart-item-image
                    ${tour.imageClass}">
                </div>


                <div class="cart-item-info">

                    <h3>
                        ${tour.name}
                    </h3>

                    <p>
                        📍 ${tour.location}
                    </p>

                    <p>
                        📅 ${tour.duration}
                    </p>

                </div>


                <div class="quantity-control">

                    <button
                        onclick="changeQuantity(${tour.id}, -1)">
                        −
                    </button>

                    <strong>
                        ${quantity}
                    </strong>

                    <button
                        onclick="changeQuantity(${tour.id}, 1)">
                        +
                    </button>

                </div>


                <div class="cart-price">

                    ₹${total.toLocaleString("en-IN")}

                </div>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${tour.id})">

                    Remove

                </button>

            </div>

        `;
    });


    const subtotal =
        calculateSubtotal();

    const tax =
        Math.round(subtotal * 0.05);

    const total =
        subtotal + tax;


    container.innerHTML = `

        <div class="cart-layout">

            <div class="cart-items">

                ${itemsHTML}

            </div>


            <div class="cart-summary">

                <h2>
                    Order Summary
                </h2>


                <div class="summary-line">

                    <span>
                        Subtotal
                    </span>

                    <strong>
                        ₹${subtotal.toLocaleString("en-IN")}
                    </strong>

                </div>


                <div class="summary-line">

                    <span>
                        GST (5%)
                    </span>

                    <strong>
                        ₹${tax.toLocaleString("en-IN")}
                    </strong>

                </div>


                <div class="summary-line total-line">

                    <span>
                        Total
                    </span>

                    <strong>
                        ₹${total.toLocaleString("en-IN")}
                    </strong>

                </div>


                <a
                    href="checkout.html"
                    class="checkout-btn"
                    style="display:block;text-align:center;">

                    Proceed to Checkout

                </a>

            </div>

        </div>

    `;
}


/* =========================================
   PRODUCT SEARCH
========================================= */

function filterProducts() {

    const input =
        document.getElementById("productSearch");

    if (!input) return;

    const search =
        input.value.toLowerCase().trim();

    const cards =
        document.querySelectorAll(".product-card");

    let found = 0;


    cards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        if (name.includes(search)) {

            card.style.display = "block";

            found++;

        } else {

            card.style.display = "none";
        }
    });


    const noResults =
        document.getElementById("noResults");

    if (noResults) {

        noResults.style.display =
            found === 0
                ? "block"
                : "none";
    }
}


/* =========================================
   HOME SEARCH
========================================= */

function searchDestination() {

    const input =
        document.getElementById("homeSearch");

    if (!input) return;

    const destination =
        input.value.trim();


    if (destination === "") {

        alert(
            "Please enter a destination."
        );

        return;
    }


    localStorage.setItem(
        "journeyGoSearch",
        destination
    );

    window.location.href =
        "products.html";
}


/* =========================================
   CHECKOUT
========================================= */

function renderCheckout() {

    const container =
        document.getElementById("checkoutItems");

    if (!container) return;

    const cart = getCart();


    if (cart.length === 0) {

        container.innerHTML = `

            <p>
                Your cart is empty.
            </p>

            <br>

            <a href="products.html"
               class="primary-btn">

                Browse Tours

            </a>

        `;

        return;
    }


    let html = "";


    cart.forEach(item => {

        const tour =
            tours[item.id];

        if (!tour) return;

        const quantity =
            Number(item.quantity);

        const total =
            tour.price * quantity;


        html += `

            <div class="checkout-item">

                <div>

                    <strong>
                        ${tour.name}
                    </strong>

                    <span>
                        ${quantity} ×
                        ₹${tour.price.toLocaleString("en-IN")}
                    </span>

                </div>


                <strong>
                    ₹${total.toLocaleString("en-IN")}
                </strong>

            </div>

        `;
    });


    container.innerHTML = html;


    const subtotal =
        calculateSubtotal();

    const tax =
        Math.round(subtotal * 0.05);

    const total =
        subtotal + tax;


    const subtotalElement =
        document.getElementById(
            "checkoutSubtotal"
        );

    const taxElement =
        document.getElementById(
            "checkoutTax"
        );

    const totalElement =
        document.getElementById(
            "checkoutTotal"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            "₹" +
            subtotal.toLocaleString("en-IN");
    }


    if (taxElement) {

        taxElement.textContent =
            "₹" +
            tax.toLocaleString("en-IN");
    }


    if (totalElement) {

        totalElement.textContent =
            "₹" +
            total.toLocaleString("en-IN");
    }
}


/* =========================================
   PAYMENT METHOD
========================================= */

function setupPaymentMethods() {

    const radios =
        document.querySelectorAll(
            'input[name="payment"]'
        );

    const cardFields =
        document.getElementById(
            "cardFields"
        );

    const upiFields =
        document.getElementById(
            "upiFields"
        );


    if (
        !radios.length ||
        !cardFields ||
        !upiFields
    ) {
        return;
    }


    radios.forEach(radio => {

        radio.addEventListener(
            "change",
            function () {

                if (this.value === "card") {

                    cardFields.classList.remove(
                        "hidden"
                    );

                    upiFields.classList.add(
                        "hidden"
                    );

                }

                else if (this.value === "upi") {

                    cardFields.classList.add(
                        "hidden"
                    );

                    upiFields.classList.remove(
                        "hidden"
                    );

                }

                else {

                    cardFields.classList.add(
                        "hidden"
                    );

                    upiFields.classList.add(
                        "hidden"
                    );
                }

            }
        );

    });
}


/* =========================================
   PLACE BOOKING
========================================= */

function placeBooking() {

    const cart = getCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        window.location.href =
            "products.html";

        return;
    }


    const name =
        document
            .getElementById("customerName")
            .value.trim();

    const email =
        document
            .getElementById("customerEmail")
            .value.trim();

    const phone =
        document
            .getElementById("customerPhone")
            .value.trim();

    const date =
        document
            .getElementById("travelDate")
            .value;

    const address =
        document
            .getElementById("customerAddress")
            .value.trim();

    const travellers =
        document
            .getElementById("travellers")
            .value;


    if (
        !name ||
        !email ||
        !phone ||
        !date ||
        !address
    ) {

        alert(
            "Please fill in all traveller details."
        );

        return;
    }


    const selectedPayment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!selectedPayment) {

        alert(
            "Please select a payment method."
        );

        return;
    }


    const payment =
        selectedPayment.value;


    if (payment === "card") {

        const cardNumber =
            document
                .getElementById("cardNumber")
                .value.trim();

        const expiry =
            document
                .getElementById("expiry")
                .value.trim();

        const cvv =
            document
                .getElementById("cvv")
                .value.trim();

        const cardName =
            document
                .getElementById("cardName")
                .value.trim();


        if (
            !cardNumber ||
            !expiry ||
            !cvv ||
            !cardName
        ) {

            alert(
                "Please complete your card details."
            );

            return;
        }
    }


    if (payment === "upi") {

        const upi =
            document
                .getElementById("upiId")
                .value.trim();


        if (!upi) {

            alert(
                "Please enter your UPI ID."
            );

            return;
        }
    }


    const subtotal =
        calculateSubtotal();

    const tax =
        Math.round(subtotal * 0.05);

    const total =
        subtotal + tax;


    const bookingId =
        "JG" +
        Date.now()
            .toString()
            .slice(-8);


    const booking = {

        bookingId:

            bookingId,

        bookingDate:

            new Date()
                .toLocaleDateString(
                    "en-IN"
                ),

        name:

            name,

        email:

            email,

        phone:

            phone,

        travelDate:

            date,

        address:

            address,

        travellers:

            travellers,

        payment:

            payment === "card"
                ? "Credit / Debit Card"
                : payment === "upi"
                    ? "UPI"
                    : "Net Banking",

        items:

            cart,

        subtotal:

            subtotal,

        tax:

            tax,

        total:

            total
    };


    localStorage.setItem(
        "journeyGoBooking",
        JSON.stringify(booking)
    );


    localStorage.removeItem(
        "journeyGoCart"
    );


    window.location.href =
        "invoice.html";
}


/* =========================================
   INVOICE
========================================= */

function renderInvoice() {

    const invoice =
        document.getElementById("invoice");

    if (!invoice) return;


    const booking =
        JSON.parse(
            localStorage.getItem(
                "journeyGoBooking"
            )
        );


    if (!booking) {

        invoice.innerHTML = `

            <div class="empty-cart">

                <h2>
                    No booking found
                </h2>

                <p>
                    Please make a booking first.
                </p>

                <br>

                <a href="products.html"
                   class="primary-btn">

                    Explore Tours

                </a>

            </div>

        `;

        return;
    }


    document.getElementById(
        "invoiceBookingId"
    ).textContent =
        "Booking ID: " +
        booking.bookingId;


    document.getElementById(
        "invoiceDate"
    ).textContent =
        "Date: " +
        booking.bookingDate;


    document.getElementById(
        "invoiceName"
    ).textContent =
        booking.name;


    document.getElementById(
        "invoiceEmail"
    ).textContent =
        booking.email;


    document.getElementById(
        "invoicePhone"
    ).textContent =
        booking.phone;


    document.getElementById(
        "invoiceAddress"
    ).textContent =
        booking.address;


    document.getElementById(
        "invoiceTravelDate"
    ).textContent =
        formatDate(
            booking.travelDate
        );


    document.getElementById(
        "invoiceTravellers"
    ).textContent =
        booking.travellers;


    document.getElementById(
        "invoicePayment"
    ).textContent =
        booking.payment;


    let rows = "";


    booking.items.forEach(item => {

        const tour =
            tours[item.id];

        if (!tour) return;

        const quantity =
            Number(item.quantity);

        const total =
            tour.price * quantity;


        rows += `

            <tr>

                <td>

                    <strong>
                        ${tour.name}
                    </strong>

                    <br>

                    <small>
                        ${tour.location}
                    </small>

                </td>

                <td>
                    ${tour.duration}
                </td>

                <td>
                    ${quantity}
                </td>

                <td>
                    ₹${tour.price.toLocaleString("en-IN")}
                </td>

                <td>
                    ₹${total.toLocaleString("en-IN")}
                </td>

            </tr>

        `;
    });


    const itemsElement =
        document.getElementById(
            "invoiceItems"
        );

    if (itemsElement) {

        itemsElement.innerHTML =
            rows;
    }


    document.getElementById(
        "invoiceSubtotal"
    ).textContent =
        "₹" +
        booking.subtotal
            .toLocaleString("en-IN");


    document.getElementById(
        "invoiceTax"
    ).textContent =
        "₹" +
        booking.tax
            .toLocaleString("en-IN");


    document.getElementById(
        "invoiceGrandTotal"
    ).textContent =
        "₹" +
        booking.total
            .toLocaleString("en-IN");
}


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(dateString) {

    if (!dateString) return "-";

    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


/* =========================================
   PAGE START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        renderCart();

        renderCheckout();

        setupPaymentMethods();

        renderInvoice();

    }
);
