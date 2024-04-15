from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import LabelEncoder
import numpy as np
import pandas as pd

# 加载用户画像
user_profiles = pd.read_csv("./user_profiles.csv")
encoder = LabelEncoder()

# 假设favorite_category是需要编码的分类特征
user_profiles["favorite_category_encoded"] = encoder.fit_transform(user_profiles["favorite_category"])
features = user_profiles.drop(['user_id', 'favorite_category'], axis=1)

# 计算相似度矩阵
similarity_matrix = cosine_similarity(features)
similarity_df = pd.DataFrame(similarity_matrix, index=user_profiles['user_id'], columns=user_profiles['user_id'])
similarity_df.to_csv("similarity_df.csv")