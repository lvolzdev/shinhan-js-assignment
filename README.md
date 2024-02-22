# shinhan-js-assignment

This is a simple web application using MERN stack.

Collect campaign and comment data from the wadiz homepage and put it in MongoDB, <br />
and link it with React to show the user the rendered screen.

Wadiz 홈페이지에서 캠페인과 댓글 데이터를 수집하고 MongoDB에 저장합니다. <br />
이를 리액트와 연결해서 사용자에게 렌더링된 화면을 보여줍니다.
<br /><br />

# 🏆 Goal

- Mongoose 모델 스키마 구성하기
- 웹 데이터 수집하여 저장하기
- Express.js를 활용해 REST API 구성하기
- React에서 캠페인 리스트 Rendering하기
  <br /><br />

# 🙌 Getting Started

## 1. Prerequisites

NPM / Yarn and Node.js installed

## 2. Installing

Installing NPM modules on both client and server folders.

Execute these commands from the project directory.

```
cd client && npm install
```

```
cd server && npm install
```

```
cd server/crawler && npm install
```

## 3. Setting .env

You have to make `.env` file in the `server` folder. Please put your own MongoDB information in the form below and write it in the `.env` file.

```
PORT = whatever_you_want
USER_NAME = your_name
PASSWORD = your_password
CLUSTER = your_cluster
DATEBASE = wadiz
```

## 4. Crawling Wadiz Data

Please execute the following command on the project `/root` path.

```
cd server
node crawler/campaignList.js
node crawler/comment.js
```

Then json files(campaignList.json and comment.json)will be stored in /server/crawler/res forder.

## 5. Storing The Crawled Data In The MongoDB

Please execute the following command on the current path.

```
node models/Campaign.js
node models/Comment.js
```

<img width="510" alt="colleted data" src="https://github.com/lvolzdev/shinhan-js-assignment/assets/63188042/551c667d-8889-4718-ba35-777333469e37">

The campaign and comment data in each schema form are then stored in the MongoDB that you set up in the `.env` file.

## 6. Running the app

Open a terminal on server directory

```
npm run dev
```

and open another terminal on client directory

```
npm run dev
```

Access the web app at http://localhost:5173/campaign ☺️
<br /><br />

# 🚀 Result

## Campaign List Page

<img width="1582" alt="스크린샷 2024-02-22 오후 3 07 24" src="https://github.com/lvolzdev/shinhan-js-assignment/assets/63188042/efdd0bc7-2f40-42aa-80d8-7b0f9939b2fd">
<img width="1582" alt="스크린샷 2024-02-22 오후 10 49 36" src="https://github.com/lvolzdev/shinhan-js-assignment/assets/63188042/712cd96e-b572-48bb-93ab-574616b19d77">

## Campaign Detail Page With Comments

<img width="1582" alt="스크린샷 2024-02-22 오후 10 48 51" src="https://github.com/lvolzdev/shinhan-js-assignment/assets/63188042/33cb6ece-c92a-422d-8265-b6676ddd3ea5">
<img width="1582" alt="스크린샷 2024-02-22 오후 10 49 11" src="https://github.com/lvolzdev/shinhan-js-assignment/assets/63188042/cdcc11ed-508b-46e8-9a0d-7391aad9e5f4">
