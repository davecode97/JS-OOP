class Product {
    // Propiedades
    constructor(name, price, year) {
        this.name  = name;
        this.price = price;
        this.year  = year;
    }

}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong> : ${product.name}
                    <strong>Product Price</strong> : ${product.price}
                    <strong>Product Year</strong> : ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div> 
        `;

        productList.appendChild(element); // Método para que se herede el doc HTML al index.html
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }

    delectProduct(element) {
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();

            // Message
            this.showMessage('Product Delected Successfully', 'success');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        
        // SHOWING IN DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');

        container.insertBefore(div, app);

        // Timer
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 2000);
    }

    //getProduct(){
        // Recuest products to sent to server
    //}
}

// DOM Events
document.getElementById('product-form').addEventListener('submit', function(e) {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const product = new Product(name, price, year);

    /* Método utilizado para que no se refresque el 
     * formulario una vez que se a presionado el evento submit.
     */
    e.preventDefault(); 

    const ui = new UI;

    // Validator
    if(name === '' || price === '' || year === '')
    {
        // With return, stop the process and don't show other messages
        return ui.showMessage('Complete The Fields Pleace', 'danger');
    }

    ui.addProduct(product);
    ui.showMessage('Product Added Successfully', 'success');

    ui.resetForm();

});
document.getElementById('product-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.delectProduct(e.target); // delegación del evento.
});



