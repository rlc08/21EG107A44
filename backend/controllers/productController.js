import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

const sortProducts = (products, sortBy, order) => {
    return products.sort((a, b) => {
        if (order === "desc") {
            return b[sortBy] - a[sortBy];
        }
        return a[sortBy] - b[sortBy];
    });
};

export const getProductsByCategory = async (req, res) => {
    const { categoryname } = req.params;
    const { page = 1, pageSize = 10 } = req.query;

    if (!categoryname) {
        return res.status(400).json({ message: "Category name is missing" });
    }

    const top = pageSize; // Number of items per page
    const minPrice = 10;
    const maxPrice = 10000;
    const sortBy = "price";
    const order = "desc";

    try {
        const authBody = {
            companyName: "InstaMart",
            clientID: "81ec9118-c585-4b2b-be74-e42a7fd0f3fb",
            clientSecret: "hhCnFfTYScIzBOwW",
            ownerName: "Ravichettu Lokesh Chandra",
            ownerEmail: "lokeshpyc@gmail.com",
            rollNo: "21EG107A44",
        };

        const authResponse = await axios.post(
            "http://20.244.56.144/test/auth",
            authBody
        );

        if (!authResponse.data.access_token) {
            throw new Error("Failed to authenticate and obtain access token.");
        }

        const token = authResponse.data.access_token;

        let allProducts = [];

        for (const companyname of companies) {
            const apiUrl = `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const products = response.data.map((product) => ({
                ...product,
                uniqueId: uuidv4(),
            }));

            allProducts = allProducts.concat(products);
        }

        if (sortBy) {
            allProducts = sortProducts(allProducts, sortBy, order);
        }

        // Pagination logic
        const totalProducts = allProducts.length;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedProducts = allProducts.slice(startIndex, endIndex);

        res.json({
            products: paginatedProducts,
            total: totalProducts,
            page,
            pageSize,
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        }
        res.status(error.response?.status || 500).json({
            message: "Error fetching products",
            error,
        });
    }
};
