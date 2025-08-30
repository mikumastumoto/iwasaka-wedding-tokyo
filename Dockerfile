FROM node:20.11.0

WORKDIR /usr/src/app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# デフォルトコマンド
CMD ["npm", "run", "dev"]