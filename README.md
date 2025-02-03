# 🛠 QA Interview Task: E-Commerce API Testing with Postman & Newman

You are tasked with testing an **e-commerce API** that allows users to:

- 🛍 **Fetch product details**
- 📦 **Create orders**
- 💳 **Make payments**

The API is **dockerized** and available on **Docker Hub**. The **Swagger documentation** is accessible at:  
👉 **http://localhost:3000/api-docs**

Your objective is to **design and execute** a comprehensive testing strategy, covering **both manual and automated** test cases using **Postman and Newman**.

## 🚀 Prerequisites

Ensure you have the following tools installed on your machine:

1. **Docker** – To pull and run the API container. [Install Docker](https://docs.docker.com/get-docker/)
2. **Postman** – To create and execute API tests. [Download Postman](https://www.postman.com/downloads/)
3. **Newman** – To automate test execution. Install via npm:
   ```sh
   npm install -g newman
   ```
4. Git (optional) – To clone repositories if needed. Download Git

## 🛠 Setting Up the API Locally

Follow these steps to pull and run the API from Docker Hub:

1. Pull the API image from Docker Hub
   ```sh
   docker pull <docker-hub-repo-name>
   ```
2. Run the container
   ```sh
   docker run -d -p 3000:3000 --name ecommerce-api <docker-hub-repo-name>
   ```
3. Verify API is running

   Open your browser or Postman and go to:

   ```bash
   http://localhost:3000/api-docs
   ```

   You should see the API documentation.

## 🔬 Task Requirements

1️. Postman Collection

    ✅ Create a Postman Collection with test scripts for the following endpoints:

GET /products

    ✅ Verify response returns a list of products.

    ✅ Check that each product contains expected fields (id, name, price, stock, etc.).

    ✅ Validate response time & status code (200 OK).

POST /orders

    ✅ Submit a valid order request and assert the response structure.

    ✅ Validate response time & status code (201 Created).

    ✅ Ensure order is persisted by fetching order details.

    ✅ Test edge cases (e.g., ordering an out-of-stock product).

POST /payments

    ✅ Simulate a successful payment response.

    ✅ Validate response time & status code (200 OK).


    ✅ Implement negative test scenarios:

        ❌ Invalid payment method
        ❌ Insufficient balance

2️. Automated Testing with Newman

    ✅ Use Newman to execute the Postman collection and generate a test report.

Run the following command:

    ```sh
    newman run EcommerceAPI.postman_collection.json -r cli,html --reporter-html-export newman-report.html
    ```

- Ensure test results are stored in a readable format (HTML, JSON, or CLI output).
- Automate test execution using Newman CLI.
- Share the Newman report along with the collection.

3️. Manual Testing

    ✅ Perform manual exploratory testing to identify additional edge cases:

- Verify API response correctness under various conditions.
- Test API security, such as unauthorized access to endpoints.
- Check API resilience under high load (if applicable).

4️. Test Documentation

    ✅ Submit a brief test strategy document, including:

- Testing approach (manual vs automated).
- Test scenarios covered (positive & negative tests).
- Tools used (Postman, Newman, Docker).
- Edge cases and performance considerations.

## 📌 Deliverables

- Postman Collection with test scripts
- Newman test report (HTML/JSON format)
- Brief test strategy document
