# CyberTipline Tools

A **unofficial** collection of tools for interacting with the National Center for Missing & Exploited Children's [CyberTipline Reporting API](https://report.cybertip.org/ispws/documentation).

## Installation

```bash
# Using pnpm
pnpm add cybertipline-tools

# Using npm
npm install cybertipline-tools

# Using yarn
yarn add cybertipline-tools
```

## Quick Start

```typescript
import { Client, Environment, IncidentType } from 'cybertipline-tools';

// Create a new client
const client = new Client({
  environment: Environment.Testing, // Use Testing for development
  credentials: {
    username: 'your-username',
    password: 'your-password',
  },
});

// Test your connection
const status = await client.getStatus();
console.log('Connected:', status.data.responseDescription);

// Submit a report
const report = await client.submitReport({
  incidentSummary: {
    incidentType: IncidentType.ChildSexTourism,
    // ... other required fields
  },
  reporter: {
    reportingPerson: {
      email: 'reporter@example.com',
      // ... other required fields
    },
  },
});
console.log('Report ID:', report.data.reportId);

// Upload a file
const fileUpload = await client.uploadFile({
  id: report.data.reportId,
  file: new File(['...'], 'evidence.jpg'),
});
console.log('File ID:', fileUpload.data.fileId);

// Add file details
await client.submitFileDetails({
  reportId: Number(report.data.reportId),
  fileId: fileUpload.data.fileId,
  fileName: 'evidence.jpg',
  // ... other optional fields
});

// Mark report as complete
await client.finishReport({
  id: report.data.reportId,
});
```

## Requirements

- Node.js 24.x or later (TypeScript 5.x for type definitions)
  - Older versions may work, but are not officially verified.
- ESM module support
  - CommonJS is exported, but not officially tested. We welcome contributions to improve this.

## Features

✨ **Type Safety**
- Full TypeScript support with detailed type definitions
- Inline documentation with JSDoc comments
  - Allowing for IDE autocompletion for all APIs

🐛 **Error Handling**
- Request ID extraction for all operations
- Error handling with detailed messages

🛠️ **API Support**
- `GET /status` - Test API connectivity
- `POST /submit` - Submit new reports
- `POST /upload` - Upload evidence files
- `POST /fileinfo` - Add file metadata
- `POST /finish` - Complete reports
- `POST /retract` - Cancel reports

- You provide JSON, we convert it to XML and back, so no need to worry about XML!

## Error Handling

The client includes built-in error handling:

```typescript
try {
  await client.getStatus();
} catch (error) {
  // All API errors include the Request-ID for troubleshooting
  console.error('API Error:', error.message);
  // Example: "Authentication failed (Request-ID: abc-123)"
}
```

## Development Status

🚧 **Todo**
- [ ] Schema validation (Zod?)
- [ ] Examples and demos
- [ ] Documentation improvements
- [ ] Performance optimizations
- [ ] Stabilize developer experience

🔮 **Possible Future Plans**
- [ ] E2E testing against running CyberTipline test environment
- [ ] Batch reporting support
- [ ] XSD schema to TypeScript generation

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Resources

- [CyberTipline API Documentation](https://report.cybertip.org/ispws/documentation) (official documentation from NCMEC)
- [Apply for API Access](https://esp.ncmec.org/registration) (done by the NCMEC team)
- [Report Issues](https://github.com/Johannes-Andersen/cybertipline-tools/issues)
