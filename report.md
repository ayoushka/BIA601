# Intelligence Algorithm Project Report: Optimizing E-commerce Recommendations using Genetic Algorithms

## 1. Introduction and Scientific Reference
This project is based on the latest research in the field of evolutionary intelligence to develop recommendation systems in e-commerce. The fundamental approach is derived from the following scientific article:

> **Deshmukh, et al. (2024). "Customer behavioural content recommendation system using decision tree and genetic algorithm for online shopping websites". Multidisciplinary Science Journal.**

The implementation in this project shifts from static filtering methods to a dynamic evolutionary approach, where recommendation sets are treated as "Chromosomes" that evolve based on the user's DNA in real-time (such as age and location) and their interaction history with products.

## 2. Dataset and Technologies Used
The system was built and tested using the university's official dataset, which consists of four interconnected files providing a complete picture of user behavior and products:
*   **Users File (`users.xlsx`)**: Contains data for 1000 users, including age and country, to build the core User DNA.
*   **Products File (`products.xlsx`)**: Contains data for 5000 products, their categories, and prices.
*   **Ratings File (`ratings.xlsx`)**: Includes 5000 explicit user ratings for products.
*   **Behavior File (`behavior_15500.xlsx`)**: Contains 13,500 records of actual user interactions (views, clicks, and purchases).

### Technologies Used:
*   **Frontend**: Built using React (Vite) with a custom Evolutionary UI to update generations and display recommendations in real-time.
*   **Backend**: Python was used with the FastAPI framework to ensure high-speed genetic computations.
*   **Data Engine**: The Pandas library was used to merge and analyze the four files, converting them into a format understandable by the algorithm.

## 3. The Genetic Algorithm for Recommendations
Unlike traditional systems that rely on direct sorting, this system simulates the process of Natural Selection to arrive at the best product list that suits an individual user's interests.

### A. Biological Mapping
*   **Population**: Consists of multiple groups of recommendation lists (e.g., Alpha, Beta, Gamma).
*   **Chromosome**: Represents a single list consisting of 5 suggested products customized for a specific `user_id`.
*   **Fitness Function (Solution Quality)**: This is the primary metric for the "survival" or exclusion of a list. We converted behavior and interaction into precise numerical values:
    *   If the product was previously purchased in a specific category, it is given a high weight (x10).
    *   If the product was clicked, it is given a medium weight (x5).
    *   If it was only viewed, it is given a lower weight (x1).
    *   The Average Rating (`Avg_Rating`) is added to ensure overall product quality.

> Calculation Formula:
> `Fitness = (Purchased × 10) + (Clicked × 5) + (Viewed × 1) + Avg_Rating`

### B. Evolutionary Phases in Execution
1.  **Selection**: The system selects the best product groups that achieved the highest Fitness Score and match the user's age and country.
2.  **Crossover**: The best products from good lists are taken (e.g., 3 products from one list and 2 from another) to create a stronger, more diverse "new generation".
3.  **Mutation (Exploration Engine)**: To avoid the problem of getting stuck in only favorite products (Local Optimum), the mutation engine intervenes. When a user rejects a product, the system injects a high-quality product the user hasn't seen before to add diversity to the final list.

## 4. Key Features
*   **User DNA Awareness**: Recommendations change radically and dynamically when switching between different users (e.g., a 20-year-old user in one country vs. a 50-year-old in another).
*   **Social Proofing**: Live badges like "🔥 Trending in [City Name]" are integrated by cross-referencing behavior data with user locations.
*   **Visual Evolution**: The system provides an interface showing the "generation evolution" state 🧬, allowing the user to see how recommendations improve based on their interactions (clicks, cart additions) as it transitions from the first generation to subsequent ones.

## Conclusion
The project successfully transformed a complex research concept about genetic algorithms into a fully integrated web application. Real data was used to guide recommendations to be relevant, logical, and highly purchasable, with all steps documented and displayed in an interactive, modern manner.
