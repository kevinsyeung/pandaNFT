from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pandas as pd

app = Flask(__name__)
CORS(app, supports_credentials=True)

# 为指定用户推荐物品
def recommend_for_user(target_user_id, top_n=30):
    similarity_df = pd.read_csv("./data/similarity_df.csv")
    ratings_df = pd.read_csv("./data/simulated_ratings.csv")
    user_similarities = similarity_df.iloc[:, target_user_id].sort_values(ascending=False)
    similar_users = user_similarities.iloc[1:].index.tolist()  # 排除自身

    # 选取相似用户评分较高的物品
    similar_users_ratings = ratings_df[ratings_df['user_id'].isin(similar_users)]
    top_rated_items_by_similar_users = similar_users_ratings.groupby('item_id')['rating'].mean().sort_values(
        ascending=False).index.tolist()

    # 筛选目标用户未评分的物品
    target_user_rated_items = ratings_df[ratings_df['user_id'] == target_user_id]['item_id'].tolist()
    recommended_items = [item for item in top_rated_items_by_similar_users if item not in target_user_rated_items][
                        :top_n]

    return recommended_items


@app.route('/recommend', methods=['POST'])
def recommend():
    # 处理post请求参数
    data = request.json
    user_id = data['user_id']
    print(user_id)
    top_k = data['top_k']
    # 获取推荐内容
    prefered_items = recommend_for_user(user_id, top_k)
    response = jsonify({'prefered_items': prefered_items})
    return response

if __name__ == "__main__":
    app.run(debug=True, port=5000)
