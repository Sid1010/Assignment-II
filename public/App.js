const Products = [];

class Table extends React.Component {
  render() {
    const productRows = this.props.products.map(product => React.createElement(TableRow, {
      key: product.id,
      product: product
    }));
    return React.createElement("table", {
      className: "Table"
    }, React.createElement("thead", {
      align: "left"
    }, React.createElement("tr", null, React.createElement("th", null, "Product Name"), React.createElement("th", null, "Price"), React.createElement("th", null, "Category"), React.createElement("th", null, "Image"))), React.createElement("tbody", null, productRows));
  }

}

class TableRow extends React.Component {
  render() {
    const prd = this.props.product;
    return React.createElement("tr", null, React.createElement("td", null, prd.productName), React.createElement("td", null, "$", prd.productPrice), React.createElement("td", null, prd.productCategory), React.createElement("td", null, React.createElement("a", {
      href: prd.productImage,
      target: "_blank"
    }, "View")));
  }

}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    var price = form.prdPrice.value;
    price = price.slice(1);
    const prd = {
      productName: form.prdName.value,
      productPrice: price,
      productCategory: form.productCategory.value,
      productImage: form.prdImg.value
    };
    this.props.createProduct(prd);
    form.prdName.value = "";
    form.prdPrice.value = "$";
    form.prdImg.value = "";
  }

  render() {
    return React.createElement("div", null, React.createElement("form", {
      name: "productAdd",
      className: "formAdd",
      onSubmit: this.handleSubmit
    }, React.createElement("div", null, React.createElement("p", null, React.createElement("label", null, "Category", React.createElement("br", null), React.createElement("select", {
      id: "productCategory",
      name: "category"
    }, React.createElement("option", {
      value: "shirts"
    }, "Shirts"), React.createElement("option", {
      value: "jeans"
    }, "Jeans"), React.createElement("option", {
      value: "jackets"
    }, "Jackets"), React.createElement("option", {
      value: "sweaters"
    }, "Sweaters"), React.createElement("option", {
      value: "accessories"
    }, "Accessories")))), React.createElement("p", null, React.createElement("label", null, "Price Per Unit", React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "prdPrice",
      defaultValue: "$"
    }))), React.createElement("p", null, React.createElement("input", {
      type: "submit",
      id: "btnAdd",
      value: "Add Product"
    }))), React.createElement("div", null, React.createElement("p", null, React.createElement("label", null, "Product Name", React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "prdName"
    }))), React.createElement("p", null, React.createElement("label", null, "Image URL", React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "prdImg"
    }))))));
  }

}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({
        products: Products
      });
    }, 500);
  }

  createProduct(product) {
    product.id = this.state.products.length + 1;
    const newProductList = this.state.products.slice();
    newProductList.push(product);
    this.setState({
      products: newProductList
    });
  }

  render() {
    return React.createElement("div", {
      id: "mainDiv"
    }, React.createElement("h1", null, "My Company Inventory"), "Showing all available products", React.createElement("hr", null), React.createElement("br", null), React.createElement(Table, {
      products: this.state.products
    }), React.createElement("br", null), "Add a new product to inventory", React.createElement("hr", null), React.createElement(ProductAdd, {
      createProduct: this.createProduct
    }));
  }

}

const element = React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('sectionA'));