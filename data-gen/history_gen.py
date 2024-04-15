import pandas as pd
import numpy as np

# 设置随机种子以保证结果可复现
np.random.seed(42)

# 定义用户数和物品数
num_users = 400
num_items = 40

# 生成用户ID和物品ID
user_ids = np.arange(1, num_users + 1)
item_ids = np.arange(1, num_items + 1)

# 生成模拟评分数据
# 假设并非所有用户对所有物品都有评分，我们设置大约10%的用户-物品对有评分
num_ratings = int(num_users * num_items * 0.1)
user_ratings_ids = np.random.choice(user_ids, size=num_ratings)
item_ratings_ids = np.random.choice(item_ids, size=num_ratings)
ratings = np.random.randint(1, 6, size=num_ratings)  # 评分范围从1到5

# 生成时间戳
# 假设所有评分都在2023年内，这里使用pd.date_range来生成随机日期
timestamps = pd.date_range(start='2023-01-01', end='2023-12-31', periods=num_ratings).sort_values()
timestamps = np.random.choice(timestamps, size=num_ratings, replace=False)

# 创建DataFrame
data = {
    'user_id': user_ratings_ids,
    'item_id': item_ratings_ids,
    'rating': ratings,
    'timestamp': timestamps
}
ratings_df = pd.DataFrame(data)

# 显示前几行数据以检查
print(ratings_df.head())

# 可选：保存到CSV文件
ratings_df.to_csv('simulated_ratings.csv', index=False)
