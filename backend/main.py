from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import random
from typing import List, Dict, Any
import numpy as np
from pydantic import BaseModel

# setting up the main app for the api
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    # loading all our data from excel files
    users_df = pd.read_excel('users.xlsx')
    products_df = pd.read_excel('products.xlsx')
    behavior_df = pd.read_excel('behavior_15500.xlsx')
    
    try:
        ratings_df = pd.read_excel('ratings.xlsx')
    except Exception:
        print("Note: ratings.xlsx not found, generating mock ratings")
        ratings_df = pd.DataFrame({'product_id': products_df['product_id'], 'rating': [random.uniform(3.5, 5.0) for _ in range(len(products_df))]})
    print("✅ تم تحميل جميع ملفات Excel بنجاح!")
except Exception as e:
    print(f" خطأ فني: لم نتمكن من قراءة الملفات.")
    print(e)


def generate_rich_product_card(pid, user_id=None, force_mutation=False, target_location="Unknown"):
    # calculating the product score based on purchases, clicks and views
    # Target Academic Formula: (Purchased x10, Clicked x5, Viewed x1) + Average Rating
    global_purchases = behavior_df[behavior_df['product_id'] == pid]['purchased'].sum()
    global_clicks = behavior_df[behavior_df['product_id'] == pid]['clicked'].sum()
    global_views = behavior_df[behavior_df['product_id'] == pid]['viewed'].sum()
    
    ratings_series = ratings_df[ratings_df['product_id'] == pid]['rating']
    avg_rating = float(ratings_series.mean()) if not ratings_series.empty and not pd.isna(ratings_series.mean()) else random.uniform(4.0, 5.0)
    
    fitness = int((global_purchases * 10) + (global_clicks * 5) + (global_views * 1) + avg_rating)
    if fitness == 0: fitness = random.randint(30, 95) # Fallback for no-data items to prevent UI dead zones

    user_insight = False
    if user_id:
        user_history = behavior_df[(behavior_df['user_id'] == user_id) & (behavior_df['product_id'] == pid)]
        if not user_history.empty:
            viewed = user_history['viewed'].sum() > 0
            clicked = user_history['clicked'].sum() > 0
            user_insight = bool(viewed or clicked)

    # Location-Aware Social Proof
    trending_label = None
    buyers = behavior_df[(behavior_df['product_id'] == pid) & (behavior_df['purchased'] > 0)]['user_id']
    if not buyers.empty:
        buyer_locations = users_df[users_df['user_id'].isin(buyers)]['country']
        if target_location != "Unknown" and target_location in buyer_locations.values:
            trending_label = f"Trending in {target_location}"
        elif len(buyer_locations) > 2:
            trending_label = "Global Top Seller"

    return {
        "id": int(pid),
        "name": f"Product {pid}",
        "category": str(products_df[products_df['product_id'] == pid]['category'].values[0]),
        "price": float(products_df[products_df['product_id'] == pid]['price'].values[0]),
        "fitnessScore": fitness,
        "isMutation": force_mutation or random.random() < 0.1,
        "averageRating": round(avg_rating, 1),
        "trendingBadge": trending_label,
        "isTopRated": bool(avg_rating >= 4.5),
        "userInsight": user_insight
    }

def get_user_profile(user_id):
    # getting the user information and what they like to buy
    user_data = users_df[users_df['user_id'] == user_id]
    if user_data.empty:
        user_id = int(users_df['user_id'].iloc[0])
        user_data = users_df[users_df['user_id'] == user_id]
        
    user_history = behavior_df[behavior_df['user_id'] == user_id]
    total_purchases = int(user_history['purchased'].sum()) if not user_history.empty else 0
    total_clicks = int(user_history['clicked'].sum()) if not user_history.empty else 0
    total_views = int(user_history['viewed'].sum()) if not user_history.empty else 0
    
    top_category = "Any"
    behavior_data = [{"category": "Exploration", "percentage": 100, "color": "bg-slate-400"}]
    
    if not user_history.empty:
        interacted_products = pd.merge(user_history, products_df, on='product_id')
        if not interacted_products.empty:
            cat_counts = interacted_products['category'].value_counts()
            top_category = str(cat_counts.idxmax()) if not cat_counts.empty else "Any"
            
            total_interactions = len(interacted_products)
            colors = ['bg-blue-500', 'bg-emerald-500', 'bg-brand-gold', 'bg-rose-500']
            behavior_data = []
            for idx, (cat, count) in enumerate(cat_counts.head(4).items()):
                behavior_data.append({
                    "category": str(cat),
                    "percentage": int(round((count / total_interactions) * 100)),
                    "color": colors[idx % len(colors)]
                })
        
    return {
        "user_id": int(user_id),
        "age": int(user_data['age'].values[0]) if not user_data.empty and 'age' in user_data else 32,
        "country": str(user_data['country'].values[0]) if not user_data.empty and 'country' in user_data else "Unknown",
        "dna": {
            "purchases": total_purchases,
            "clicks": total_clicks,
            "views": total_views,
            "top_category": top_category,
            "distribution": behavior_data
        }
    }

@app.get("/users")
async def get_users_list():
    """ Provides dynamic user selection for Login Simulation UI """
    # getting a list of all users from the data
    # Include all distinct users as requested
    sample = users_df.drop_duplicates(subset=['user_id'])
    users_list = []
    for _, row in sample.iterrows():
        users_list.append({
            "id": int(row['user_id']),
            "display": f"User #{int(row['user_id'])} (Age: {int(row['age'])}, {str(row['country'])})"
        })
    return {"users": users_list}


@app.get("/generation/init/{user_id}")
async def init_generation(user_id: int):
    """ Initialize Generation 1 mapping 3 Sets of Chromosomes (recommendations) """
    # starting the first generation of products for the user
    profile = get_user_profile(user_id)
    product_pool = products_df['product_id'].tolist()
    
    # Generate 3 robust Sets representing our initial population based on User Profile location
    sets = [
        {"setId": "Alpha", "products": [generate_rich_product_card(pid, user_id, False, profile['country']) for pid in random.sample(product_pool, 5)]},
        {"setId": "Beta", "products": [generate_rich_product_card(pid, user_id, False, profile['country']) for pid in random.sample(product_pool, 5)]},
        {"setId": "Gamma", "products": [generate_rich_product_card(pid, user_id, False, profile['country']) for pid in random.sample(product_pool, 5)]}
    ]

    return {
        "user_profile": profile,
        "generation": 1,
        "population": sets
    }

@app.get("/recommend/{user_id}")
async def get_final_recommendations(user_id: int):
    """ Internal GA: Runs 5 generations to find the best 5 products for the user """
    # running the genetic algorithm to find the absolute best products
    profile = get_user_profile(user_id)
    product_pool = products_df['product_id'].tolist()
    
    # 1. Initialize Population (5 chromosomes, each has 5 product genes)
    population = [random.sample(product_pool, 5) for _ in range(5)]
    
    for gen in range(5):
        # 2. Evaluate Fitness for each chromosome (sum of individual product fitness)
        scored_population = []
        for chromo in population:
            # We use our fitness function logic on each product
            fitness_sum = sum([generate_rich_product_card(p, user_id, False, profile['country'])['fitnessScore'] for p in chromo])
            scored_population.append((fitness_sum, chromo))
            
        # 3. Selection: Keep top 2
        scored_population.sort(key=lambda x: x[0], reverse=True)
        parent1 = scored_population[0][1]
        parent2 = scored_population[1][1]
        
        # 4. Crossover & Mutation
        next_gen = [parent1, parent2]
        for _ in range(3):
            # Crossover
            split = random.randint(1, 4)
            child = list(set(parent1[:split] + parent2[split:]))
            # Fill if too short
            while len(child) < 5:
                child.append(random.choice(product_pool))
            # Mutation (10% chance)
            if random.random() < 0.1:
                child[random.randint(0, 4)] = random.choice(product_pool)
            
            next_gen.append(child[:5])
        
        population = next_gen
        
    # Final evaluation to pick the absolute best
    scored_population = []
    for chromo in population:
        fitness_sum = sum([generate_rich_product_card(p, user_id, False, profile['country'])['fitnessScore'] for p in chromo])
        scored_population.append((fitness_sum, chromo))
    scored_population.sort(key=lambda x: x[0], reverse=True)
    best_chromosome = scored_population[0][1]
    
    # Generate rich cards for the best list
    best_products = [generate_rich_product_card(pid, user_id, False, profile['country']) for pid in best_chromosome]
    
    return {
        "user_profile": profile,
        "recommendations": best_products
    }


class SetFitness(BaseModel):
    setId: str
    fitness: float
    product_ids: List[int]

class EvolutionRequest(BaseModel):
    user_id: int
    current_generation: int
    population_fitness: List[SetFitness]

@app.post("/generation/evolve")
async def evolve_generation(request: EvolutionRequest):
    # creating the next generation by mixing the best products together
    profile = get_user_profile(request.user_id)
    product_pool = products_df['product_id'].tolist()
    
    sorted_sets = sorted(request.population_fitness, key=lambda x: x.fitness, reverse=True)
    parent_1 = sorted_sets[0] if len(sorted_sets) > 0 else None
    parent_2 = sorted_sets[1] if len(sorted_sets) > 1 else parent_1
    
    p1_genes = parent_1.product_ids if parent_1 and parent_1.fitness > 0 else random.sample(product_pool, 5)
    p2_genes = parent_2.product_ids if parent_2 and parent_2.fitness > 0 else random.sample(product_pool, 5)

    alpha_genes = list(set(p1_genes[:3] + p2_genes[:3]))[:5]
    if len(alpha_genes) < 5: alpha_genes += random.sample(product_pool, 5 - len(alpha_genes))

    beta_genes = list(set(p1_genes[-2:] + p2_genes[-3:]))[:4]
    mutated_gene = random.choice([p for p in product_pool if p not in p1_genes and p not in p2_genes])
    beta_genes.append(mutated_gene)

    gamma_genes = p1_genes[:2] + random.sample(product_pool, 3)

    next_gen = [
        {"setId": "Alpha", "products": [generate_rich_product_card(pid, request.user_id, False, profile['country']) for pid in alpha_genes]},
        {"setId": "Beta", "products": [generate_rich_product_card(pid, request.user_id, pid == mutated_gene, profile['country']) for pid in beta_genes]},
        {"setId": "Gamma", "products": [generate_rich_product_card(pid, request.user_id, True, profile['country']) for pid in gamma_genes]}
    ]

    return {
        "user_profile": profile,
        "generation": request.current_generation + 1,
        "population": next_gen
    }

@app.get("/mutate/{user_id}")
async def dynamic_card_mutation(user_id: int):
    """ Academic exclusion: Provides a single mutated product that the active user HAS NEVER VIEWED BEFORE """
    # getting a random new product that the user has never seen before
    profile = get_user_profile(user_id)
    
    # Exclusion Protocol
    viewed_records = behavior_df[(behavior_df['user_id'] == user_id) & (behavior_df['viewed'] > 0)]['product_id'].tolist()
    product_pool = products_df['product_id'].tolist()
    
    unviewed_pool = [pid for pid in product_pool if pid not in viewed_records]
    if not unviewed_pool:
        unviewed_pool = product_pool # Fallback if they viewed literally everything
        
    mutated_pid = random.choice(unviewed_pool)
    mutated_card = generate_rich_product_card(mutated_pid, user_id, force_mutation=True, target_location=profile['country'])
    
    return mutated_card

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)