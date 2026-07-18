j# FormBridge

A simple backend service for HTML forms.

FormBridge lets you receive form submissions from static websites without writing your own backend. Generate an API key, add it to your form, and FormBridge will deliver submissions to your inbox.

## Features

- API key authentication
- Receive submissions from any HTML form
- Email notifications
- Rate limiting
- REST API with OpenAPI documentation

## Security

Each API key is associated with a single website URL.

When a form submission is received, FormBridge compares the request's `Origin` header with the URL registered for that API key. Requests from other origins are rejected.

This helps prevent unauthorized use of an API key from other websites.

Since HTTP headers such as `Origin` can be spoofed by non-browser clients (for example, `curl`), origin validation is **not** considered a complete security mechanism. FormBridge also applies rate limiting to reduce abuse and protect the service.

## Quick Start

Create an API key.

```http
POST /api/v1/apis
```

Then update your form:

```html
<form
  action="https://formbridge.example.com/api/v1/mail?api_key=YOUR_API_KEY"
  method="POST"
>
  <input name="name" />
  <input name="email" />
  <textarea name="message"></textarea>

  <button type="submit">Send</button>
</form>
```

FormBridge accepts any form fields and forwards the submission to the email address associated with your API key.

## Documentation

Interactive API documentation is available at:

[API Documentation](https://formbridge.ronishmaharjan.info.np)

## Tech Stack

- Node.js
- TypeScript
- Express
- PostgreSQL
- Redis
- OpenAPI (Swagger)
- Resend

## Running Locally

```bash
git clone <repository-url>

cd form-bridge

npm install

npm run dev
```

The API will be available at:

```
http://localhost:3000
```

## License

MIT
