<?php
header('Content-Type: application/json');

$products = [
    [
        "id" => 1,
        "name" => "Classic T-Shirt",
        "price" => 499,
        "category" => "Clothing",
        "variety" => "Red / Blue / Black",
        "image" => "assets/tshirt.jpg"
    ],
    [
        "id" => 2,
        "name" => "Stylish Hoodie",
        "price" => 999,
        "category" => "Clothing",
        "variety" => "Grey / Black / White",
        "image" => "assets/hoodie.jpg"
    ],
    [
        "id" => 3,
        "name" => "Trendy Sneakers",
        "price" => 1499,
        "category" => "Footwear",
        "variety" => "White / Black",
        "image" => "assets/sneakers.jpg"
    ],
    [
        "id" => 4,
        "name" => "Smart Watch",
        "price" => 1999,
        "category" => "Accessories",
        "variety" => "Black / Silver",
        "image" => "assets/watch.jpg"
    ],
    [
        "id" => 5,
        "name" => "Wireless Earbuds",
        "price" => 1299,
        "category" => "Accessories",
        "variety" => "Black / White",
        "image" => "assets/earbuds.jpg"
    ],
    [
        "id" => 6,
        "name" => "Leather Wallet",
        "price" => 699,
        "category" => "Accessories",
        "variety" => "Brown / Black",
        "image" => "assets/wallet.jpg"
    ],
    [
        "id" => 7,
        "name" => "Backpack",
        "price" => 899,
        "category" => "Bags",
        "variety" => "Grey / Black",
        "image" => "assets/bag.jpg"
    ],
    [
        "id" => 8,
        "name" => "Sunglasses",
        "price" => 599,
        "category" => "Accessories",
        "variety" => "Black / Brown",
        "image" => "assets/sunglasses.jpg"
    ]
];

echo json_encode($products);
?>
