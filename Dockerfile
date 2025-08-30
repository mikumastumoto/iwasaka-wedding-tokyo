FROM node:20.11.0

WORKDIR /usr/src/app

# Gitユーザー設定
RUN git config --global user.name "mikumastumoto" && git config --global user.email "mm39bsk@gmail.com"

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# デフォルトコマンド
CMD ["npm", "run", "dev"]