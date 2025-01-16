--  Realizar un conteo total de los clientes atendidos por el vendedor llamado <Luis Ramírez> que pagaron con tarjeta de crédito
SELECT
COUNT(DISTINCT c.customer_id) AS total_clientes
FROM Customer c
JOIN Staff s ON c.staff_id = s.staff_id
JOIN `Order` o ON c.customer_id = o.customer_id
JOIN Payment p ON o.order_id = p.bill_number
WHERE CONCAT(s.first_name, ' ', s.last_name) = 'Luis Ramírez' and s.role_id = 1
AND p.bill_number = 4;


-- Mostrar el producto con mayor número de ventas en el año 2021
SELECT p.product_name as producto, SUM(od.quantity) AS total_ventas
FROM Product p
JOIN Order_Details od ON p.product_id = od.product_id
WHERE YEAR(od.date) = 2021
GROUP BY p.product_name
ORDER BY total_ventas DESC
LIMIT 1;


-- Mostrar el número de clientes que compraron los productos del proveedor llamado “Vinos San Luis”.
SELECT
	COUNT(DISTINCT o.customer_id) AS total_clientes
FROM `Order` o
JOIN Order_Details od ON o.order_id = od.order_id
JOIN Product p ON od.product_id = p.product_id
JOIN Supplier s ON p.supplier_id = s.supplier_id
WHERE s.name = 'Vinos San Luis';


-- Desarrollar una consulta en la que se muestre el total de ventas, agrupadas por categoría y nombre de vendedor
SELECT 
    cat.category_name as categoria,
    CONCAT(st.first_name, ' ', st.last_name) AS nombre_vendedor,
    SUM(od.total) AS total_ventas
FROM Category cat
JOIN Product p ON cat.category_id = p.category_id
JOIN Order_Details od ON p.product_id = od.product_id
JOIN `Order` o ON od.order_id = o.order_id
JOIN Customer c ON o.customer_id = c.customer_id
JOIN Staff st ON c.staff_id = st.staff_id
where st.role_id = 1
GROUP BY cat.category_name, nombre_vendedor;