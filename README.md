<!-- @format -->

# Webhook Handler

This project contains a code that should run on the AWS lambda platform.

## Setup

Install project depencies

```bash
$ npm install
```

### Local setup

Rename `.env.example` to `.env` and fill out your environment
variables.
To load the variables so that node `process.env` can be able to find them, run the following command:

```bash
$ export $(cat .env | sed 's/#.*//g' | xargs)
```
Once done, you need to load one of the sample `Mailgun webhooks` responses as the `event` object on `index.lambdaHandler` function. 
To execute, you will need to run:
```bash
$ npm run build
```
 Which will compile `typescript` code in `src` folder to `javascript` code in the `dist` folder.

 To run the project, you need to type in the following command:
 
 ```bash
 $ npm start
 ```
### AWS lambda setup
The code ships with its own compiled `dist` folder but you can generate your
own by typing the following command

```bash
$ npm run build
```
Next would be to zip it and upload it aws lambda.

To test it, you would need a sample response from `Mailgun webhooks` and load it on the `Test` tab in AWS lambda then run it.

 
