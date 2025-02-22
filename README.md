# signatureEngine
# Email Signature Engine

This project implements an Email Signature Engine that allows users to select a signature template, input their personal information, and generate a personalized email signature. The application includes both frontend and backend components, built with React, TypeScript, Node.js, and Express.

---

## **Features**

1. **Template Selection**

   - Display a gallery of signature templates.
   - Users can choose a template for their signature.

2. **User Input Form**

   - Form to collect user details such as name, email, phone, and logo.
   - Includes validation to ensure all fields are completed correctly.

3. **Signature Generation**

   - Dynamically generate an email signature using the selected template and user data.
   - Includes support for plain text and HTML-based signatures.

4. **Bulk Signature Generation**

   - API support for generating multiple signatures simultaneously.

---

## **Setup Instructions**

### **Prerequisites**

- Node.js (v16 or later recommended)
- npm or yarn
- Git

### **1. Clone the Repository**

```bash
git clone https://github.com/lizamir/signatureEngine.git
cd signatureEngine
```

### **2. Backend Setup**

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   npm start
   ```

   The backend server should now be running on `http://localhost:5000`.

4. Verify the API endpoints:

   - Check `http://localhost:5000/api/templates` to ensure the template data is returned correctly.

---

### **3. Frontend Setup**

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm start
   ```

   The frontend server should now be running on `http://localhost:3000`.

4. Ensure the frontend communicates with the backend by verifying template selection works correctly.

---

## **Project Structure**

### **Backend**

- **`app.ts`**: Configures middleware and routes.
- **`routes/signatureRoutes.ts`**:
  - `/templates`: Returns available signature templates.
  - `/generate`: Generates a single signature.
  - `/bulk-generate`: Generates multiple signatures.

### **Frontend**

- **Components**:
  - `SelectTemplate.tsx`: Displays signature templates.
  - `UserFormSignature.tsx`: Form for collecting user details.
  - `UserSignature.tsx`: Displays the generated signature.
- **Services**:
  - `api.ts`: Handles communication with the backend API.

---

## **Usage Instructions**

1. Open the application in your browser at `http://localhost:3000`.

2. **Select a Template**:

   - Choose a signature template from the displayed gallery.

3. **Fill in the Form**:

   - Provide personal details (name, email, phone, logo).
   - Ensure all fields are valid before submitting.

4. **Generate Signature**:

   - Click "Submit" to generate the signature.
   - View the generated signature on the screen.

5. **Bulk Signature Generation**:

   - Use the `/bulk-generate` API endpoint to generate multiple signatures by sending an array of user data and template IDs.

---

## **API Endpoints**

### **GET /api/templates**

- **Description**: Retrieves a list of available templates.
- **Response Example**:
  ```json
  [
    { "id": "1", "name": "Template 1", "urlImage": "https://via.placeholder.com/150" },
    { "id": "2", "name": "Template 2", "urlImage": "https://via.placeholder.com/150" }
  ]
  ```

### **POST /api/generate**

- **Description**: Generates a single signature.
- **Request Body Example**:
  ```json
  {
    "templateId": "1",
    "userInfo": {
      "name": "Liz hajage",
      "email": "lizhajage@gmailcom",
      "phone": "1234567890"
    }
  }
  ```

### **POST /api/bulk-generate**

- **Description**: Generates multiple signatures.
- **Request Body Example**:
  ```json
  [
    {
      "templateId": "1",
      "userInfo": {
         "name": "Liz hajage",
      "email": "lizhajage@example.com",
      "phone": "1234567890"
      }
    },
    {
      "templateId": "2",
      "userInfo": {
        "name": "bar Sara",
        "email": "bar@gmail.com",
        "phone": "0987654321"
      }
    }
  ]
  ```

---

## **Technologies Used**

- **Frontend**: React, TypeScript, Axios
- **Backend**: Node.js, Express
- **Styling**: CSS (with potential for using libraries like Tailwind or Bootstrap)
- **Tooling**: npm, Postman (for testing APIs)

---

## **Future Improvements**

1. **UI Enhancements**:

   - Add animations and hover effects.
   - Improve responsiveness for mobile devices.

2. **File Upload Support**:

   - Allow users to upload their own logo.

3. **Error Handling**:

   - Display detailed error messages for failed API requests.

4. **Deployment**:

   - Deploy the application to a platform like Heroku or Vercel.

---

## **How to Contribute**

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---
