import pandas as pd
import numpy as np

# 基本特征提取
ratings_df = pd.read_csv("./simulated_ratings.csv")
user_profiles = ratings_df.groupby('user_id').agg(
    average_rating=('rating', 'mean'),
    rating_count=('rating', 'count'),
    rating_std=('rating', 'std')
).reset_index()

# 填充评分标准差的缺失值（对于只有单一评分的用户）
user_profiles['rating_std'] = user_profiles['rating_std'].fillna(0)

# 示例：高级特征提取（如果有物品类别信息）
# 假设每个item_id对应一个类别，这里我们随机生成类别信息作为示例
np.random.seed(42)
item_categories = {item_id: np.random.choice(['A', 'B', 'C', 'D', 'E']) for item_id in item_ids}
ratings_df['category'] = ratings_df['item_id'].map(item_categories)

# 用户偏好类别的提取
user_favorite_category = ratings_df.groupby('user_id')['category'].agg(lambda x: x.mode()[0]).reset_index()
user_favorite_category.rename(columns={'category': 'favorite_category'}, inplace=True)

# 合并基本特征和高级特征
user_profiles = user_profiles.merge(user_favorite_category, on='user_id', how='left')

print(user_profiles.head())
user_profiles.to_csv("user_profiles.csv")
