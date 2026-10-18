export const MENU_ITEMS = [
    // ---- Burgers ----
    { name: "Cheese Burger", price: "€3.50", image: "/menu/cheese-burger.jpg", description: "Steak, cheddar, cornichons, ketchup", category: "Burgers", menuPrice: "€6.00" },
    { name: "Triple Cheese", price: "€5.00", image: "/menu/triple-cheese.jpg", description: "Triple steaks, cheddar, cornichons", category: "Burgers", menuPrice: "€6.50" },
    { name: "Giant Burger", price: "€5.50", image: "/menu/giant-burger.jpg", description: "Steak, salade, oignons, cheddar, sauce giant", category: "Burgers", menuPrice: "€6.90" },
    { name: "Fumé Burger", price: "€6.50", image: "/menu/fume-burger.jpg", description: "2 steaks, sauce fromagère, charcuterie fumée, galette de pommes de terre", category: "Burgers", menuPrice: "€7.90" },
    { name: "Big Burger", price: "€5.50", image: "/menu/big-burger.jpg", description: "Pain double, double steaks, cheddar, salade, sauce big", category: "Burgers", menuPrice: "€7.00" },
    { name: "Chicken Burger", price: "€5.50", image: "/chicken-burger.jpeg", description: "Filet de poulet pané maison, bacon, salade, cornichon, cheddar", category: "Burgers", menuPrice: "€6.90" },
    { name: "Mega Burger", price: "€6.50", image: "/menu/mega-burger.jpg", description: "Tenders, galette de pommes de terre, cheddar", category: "Burgers", menuPrice: "€7.90" },
    { name: "Le Sovoyard", price: "€6.50", image: "/menu/le-sovoyard.jpg", description: "2 steaks, tenders, raclette", category: "Burgers", menuPrice: "€7.90" },
    // ---- Pizzas ----
    { name: "Pizza Margerita", price: "€6.00", image: "/menu/pizza-margerita.jpg", description: "Sauce tomate, fromage", category: "Pizzas", sizes: [{ label: "Junior", price: "€6.00" }, { label: "Sénior", price: "€8.00" }, { label: "Méga", price: "€10.00" }] },
    { name: "Pizza 4 Fromages", price: "€6.00", image: "/menu/pizza-4-fromages.jpg", description: "Sauce tomate, fromage, mozzarella, raclette, chèvre", category: "Pizzas", sizes: [{ label: "Junior", price: "€6.00" }, { label: "Sénior", price: "€8.00" }, { label: "Méga", price: "€10.00" }] },
    { name: "Pizza Calzone", price: "€6.00", image: "/menu/pizza-calzone.jpg", description: "Sauce tomate, fromage, jambon, oeuf", category: "Pizzas", sizes: [{ label: "Junior", price: "€6.00" }, { label: "Sénior", price: "€8.00" }, { label: "Méga", price: "€10.00" }] },
    { name: "Pizza Orientale", price: "€6.00", image: "/menu/pizza-orientale.jpg", description: "Sauce tomate, fromage, merguez, poivrons, oeuf", category: "Pizzas", sizes: [{ label: "Junior", price: "€6.00" }, { label: "Sénior", price: "€8.00" }, { label: "Méga", price: "€10.00" }] },
    { name: "Pizza Campione", price: "€6.00", image: "/menu/pizza-campione.jpg", description: "Sauce tomate, mozzarella, tomates fraîches, viande hachée, oignons", category: "Pizzas", sizes: [{ label: "Junior", price: "€6.00" }, { label: "Sénior", price: "€8.00" }, { label: "Méga", price: "€10.00" }] },
    { name: "Chicken Pizza", price: "€6.00", image: "/chicken-pizza.jpg", description: "Sauce tomate, fromage, poulet, pommes de terre, oignons, oeuf", category: "Pizzas", sizes: [{ label: "Junior", price: "€6.00" }, { label: "Sénior", price: "€8.00" }, { label: "Méga", price: "€10.00" }] },
    { name: "Pizza Thon", price: "€6.00", image: "/menu/pizza-thon.jpg", description: "Sauce tomate, fromage, thon, oeuf, olives", category: "Pizzas", sizes: [{ label: "Junior", price: "€6.00" }, { label: "Sénior", price: "€8.00" }, { label: "Méga", price: "€10.00" }] },
    { name: "Pizza Reine", price: "€6.00", image: "/menu/pizza-reine.jpg", description: "Sauce tomate, fromage, jambon, champignons, olives", category: "Pizzas", sizes: [{ label: "Junior", price: "€6.00" }, { label: "Sénior", price: "€8.00" }, { label: "Méga", price: "€10.00" }] },
    { name: "Pizza Végétarienne", price: "€6.00", image: "/menu/pizza-vegetarienne.jpg", description: "Sauce tomate, fromage, champignons, poivrons, olives, pommes de terre", category: "Pizzas", sizes: [{ label: "Junior", price: "€6.00" }, { label: "Sénior", price: "€8.00" }, { label: "Méga", price: "€10.00" }] },
    { name: "Pizza Chèvre Miel", price: "€6.00", image: "/menu/pizza-chevre-miel.jpg", description: "Crème fraîche, fromage, chèvre, miel", category: "Pizzas", sizes: [{ label: "Junior", price: "€6.00" }, { label: "Sénior", price: "€8.00" }, { label: "Méga", price: "€10.00" }] },
    { name: "Pizza Milano", price: "€6.00", image: "/menu/pizza-milano.jpg", description: "Crème fraîche, fromage, jambon, pommes de terre", category: "Pizzas", sizes: [{ label: "Junior", price: "€6.00" }, { label: "Sénior", price: "€8.00" }, { label: "Méga", price: "€10.00" }] },
    { name: "Pizza Raclette", price: "€6.00", image: "/menu/pizza-raclette.jpg", description: "Crème fraîche, fromage, poulet, pommes de terre, raclette", category: "Pizzas", sizes: [{ label: "Junior", price: "€6.00" }, { label: "Sénior", price: "€8.00" }, { label: "Méga", price: "€10.00" }] },
    { name: "Pizza Fermière", price: "€6.00", image: "/menu/pizza-fermiere.jpg", description: "Crème fraîche, fromage, tenders, pommes de terre, oeuf", category: "Pizzas", sizes: [{ label: "Junior", price: "€6.00" }, { label: "Sénior", price: "€8.00" }, { label: "Méga", price: "€10.00" }] },
    { name: "Pizza Saumon", price: "€6.00", image: "/menu/pizza-saumon.jpg", description: "Crème fraîche, fromage, saumon", category: "Pizzas", sizes: [{ label: "Junior", price: "€6.00" }, { label: "Sénior", price: "€8.00" }, { label: "Méga", price: "€10.00" }] },
    { name: "Pizza BBQ", price: "€6.00", image: "/menu/pizza-bbq.jpg", description: "Sauce barbecue, fromage, viande hachée, olives", category: "Pizzas", sizes: [{ label: "Junior", price: "€6.00" }, { label: "Sénior", price: "€8.00" }, { label: "Méga", price: "€10.00" }] },
    // ---- Wraps ----
    { name: "Wrap Tenders", price: "€6.50", image: "/menu/wrap-tenders.jpg", description: "Wrap au poulet tenders", category: "Wraps", menuPrice: "€7.90" },
    { name: "Wrap Steak", price: "€6.50", image: "/menu/wrap-steak.jpg", description: "Wrap au steak", category: "Wraps", menuPrice: "€7.90" },
    { name: "Wrap Mixte", price: "€7.50", image: "/menu/wrap-mixte.jpg", description: "Steak et tenders", category: "Wraps", menuPrice: "€8.90" },
    // ---- Sandwiches ----
    { name: "Sandwich Curry", price: "€6.50", image: "/menu/sandwich-curry.jpg", description: "Poulet curry, fromage, crudités", category: "Sandwiches", menuPrice: "€7.90" },
    { name: "Sandwich Tandoori", price: "€6.50", image: "/sandwich-tandoori.jpg", description: "Poulet tandoori, fromage, crudités", category: "Sandwiches", menuPrice: "€7.90" },
    { name: "Sandwich Boursin", price: "€7.00", image: "/menu/sandwich-boursin.jpg", description: "Escalope, Boursin, cheddar, bacon", category: "Sandwiches", menuPrice: "€8.50" },
    { name: "Sandwich RS3", price: "€7.00", image: "/menu/sandwich-rs3.jpg", description: "3 steaks, cheddar, bacon, crudités", category: "Sandwiches", menuPrice: "€8.50" },
    { name: "Sandwich RS4", price: "€8.00", image: "/menu/sandwich-rs4.jpg", description: "4 steaks, cheddar, oeuf, crudités", category: "Sandwiches", menuPrice: "€9.50" },
    { name: "Sandwich Radical", price: "€7.50", image: "/menu/sandwich-radical.jpg", description: "2 steaks, cordon bleu, fromage, crudités", category: "Sandwiches", menuPrice: "€9.00" },
    { name: "Sandwich Kebab", price: "€7.00", image: "/menu/sandwich-kebab.jpg", description: "Kebab, salade, tomates, oignons rouges", category: "Sandwiches", menuPrice: "€8.50" },
    { name: "Gratinez votre sandwich", price: "€2.00", image: "/menu/gratinez-votre-sandwich.jpg", description: "Supplément pour gratiner votre sandwich", category: "Sandwiches" },
    // ---- Paninis ----
    { name: "Panini Fromage", price: "€5.00", image: "/menu/panini-fromage.jpg", description: "Panini fromage", category: "Paninis", menuPrice: "€6.50" },
    { name: "Panini Kebab", price: "€5.00", image: "/menu/panini-kebab.jpg", description: "Panini kebab", category: "Paninis", menuPrice: "€6.50" },
    { name: "Panini Chicken", price: "€5.00", image: "/menu/panini-chicken.jpg", description: "Panini chicken", category: "Paninis", menuPrice: "€6.50" },
    { name: "Panini Steak", price: "€5.00", image: "/menu/panini-steak.jpg", description: "Panini steak", category: "Paninis", menuPrice: "€6.50" },
    { name: "Panini Jambon", price: "€5.00", image: "/menu/panini-jambon.jpg", description: "Panini jambon", category: "Paninis", menuPrice: "€6.50" },
    // ---- Compose ----
    { name: "Tacos", price: "€6.50", image: "/tacos.png", description: "Tacos composé : choisis ta viande et ta sauce. Boisson 33cl +1€", category: "Compose", sizes: [{ label: "M – 1 viande", price: "€6.50" }, { label: "L – 2 viandes", price: "€7.50" }, { label: "XL – 3 viandes", price: "€8.50" }] },
    { name: "Bowl", price: "€8.50", image: "/bowl-tenders.jpeg", description: "Bowl composé : choisis ta viande et ta sauce. Boisson 33cl +1€", category: "Compose", sizes: [{ label: "Simple – 1 viande", price: "€8.50" }, { label: "Double – 2 viandes", price: "€9.50" }] },
    // ---- Fried Chicken ----
    { name: "Menu Hot Wings (6 pièces)", price: "€6.50", image: "/menu/menu-hot-wings-6-pieces.jpg", description: "6 pièces de hot wings, en box avec frites", category: "Fried Chicken" },
    { name: "Menu Hot Wings (9 pièces)", price: "€8.50", image: "/menu/menu-hot-wings-9-pieces.jpg", description: "9 pièces de hot wings, en box avec frites", category: "Fried Chicken" },
    { name: "Menu Hot Wings (15 pièces)", price: "€11.50", image: "/menu/menu-hot-wings-15-pieces.jpg", description: "15 pièces de hot wings, en box avec frites", category: "Fried Chicken" },
    { name: "Menu Tenders", price: "€6.50", image: "/menu/menu-tenders.jpg", description: "5 pièces de tenders, en box avec frites", category: "Fried Chicken" },
    { name: "Menu Nuggets", price: "€6.50", image: "/menu/menu-nuggets.jpg", description: "8 pièces de nuggets, en box avec frites", category: "Fried Chicken" },
    { name: "Wingos Mix 1", price: "€7.50", image: "/menu/wingos-mix-1.jpg", description: "4 wings + 3 tenders", category: "Fried Chicken" },
    { name: "Wingos Mix 2", price: "€8.50", image: "/menu/wingos-mix-2.jpg", description: "6 wings + 3 tenders", category: "Fried Chicken" },
    { name: "Wingos Family Wings", price: "€24.90", image: "/menu/wingos-family-wings.jpg", description: "30 wings, 4 frites et 1 boisson 1L5", category: "Fried Chicken" },
    { name: "Wingos Family Tenders", price: "€24.50", image: "/menu/wingos-family-tenders.jpg", description: "20 tenders, 4 frites et 1 boisson 1L5", category: "Fried Chicken" },
    { name: "Wingos Family Mix", price: "€26.50", image: "/menu/wingos-family-mix.jpg", description: "15 wings, 10 tenders, 4 frites et 1 boisson 1L5", category: "Fried Chicken" },
    // ---- Extras ----
    { name: "Wings (4 pièces)", price: "€5.50", image: "/wings.jpg", description: "4 pièces de wings", category: "Extras" },
    { name: "Nuggets (3 pièces)", price: "€4.50", image: "/menu/nuggets-3-pieces.jpg", description: "3 pièces de nuggets", category: "Extras" },
    { name: "Oignons Rings (6 pièces)", price: "€4.50", image: "/menu/oignons-rings-6-pieces.jpg", description: "6 pièces d’oignons rings", category: "Extras" },
    { name: "Mozza Sticks (6 pièces)", price: "€4.50", image: "/menu/mozza-sticks-6-pieces.jpg", description: "6 pièces de mozza sticks", category: "Extras" },
    { name: "Jalapenos (4 pièces)", price: "€5.50", image: "/menu/jalapenos-4-pieces.jpg", description: "4 pièces de jalapenos", category: "Extras" },
    // ---- Frites ----
    { name: "Petite frites", price: "€3.00", image: "/menu/petite-frites.jpg", description: "Petite portion de frites", category: "Frites" },
    { name: "Grande frites", price: "€4.00", image: "/menu/grande-frites.jpg", description: "Grande portion de frites", category: "Frites" },
    // ---- Enfant ----
    { name: "Menu Enfant", price: "€6.00", image: "/menu/menu-enfant.jpg", description: "1 cheese burger ou 5 nuggets maison + frites + Capri-Sun", category: "Enfant" },
    // ---- Desserts ----
    { name: "Tiramisu", price: "€3.00", image: "/menu/tiramisu.jpg", description: "Dessert", category: "Desserts" },
    { name: "Tarte au Daim", price: "€3.00", image: "/menu/tarte-au-daim.jpg", description: "Dessert", category: "Desserts" },
    { name: "Cheesecake", price: "€3.00", image: "/menu/cheesecake.jpg", description: "Dessert", category: "Desserts" },
    // ---- Boissons ----
    { name: "Boisson 33cl", price: "€1.50", image: "/menu/boisson-33cl.jpg", description: "Canette 33 cl", category: "Boissons" },
    { name: "Boisson 1,5L", price: "€2.80", image: "/menu/boisson-1-5l.jpg", description: "Bouteille 1,5 L", category: "Boissons" },
    { name: "Cristalline aromatisée", price: "€1.50", image: "/menu/cristalline-aromatisee.jpg", description: "Eau aromatisée", category: "Boissons" },
    { name: "Freez", price: "€2.50", image: "/menu/freez.jpg", description: "Boisson Freez", category: "Boissons" },
];

export const CATEGORIES = [...new Set(MENU_ITEMS.map((i) => i.category))];
export const MEATS = ["Lardons", "Chicken tikka", "Viande hachée de bœuf", "Merguez de bœuf", "Nuggets de poulet", "Cordon bleu de poulet", "Tenders de poulet", "Viande de kebab"];
export const SAUCES = [
    { name: "Barbecue" }, { name: "Algérienne", spicy: true }, { name: "Blanche" }, { name: "Chili thaï", spicy: true },
    { name: "Moutarde" }, { name: "Harissa", spicy: true }, { name: "Ketchup" }, { name: "Samouraï", spicy: true }, { name: "Mayonnaise" },
];