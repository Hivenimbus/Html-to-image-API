export default function Home() {
  return (
    <div style={{ 
      fontFamily: 'monospace', 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto' 
    }}>
      <h1>HTML to Image API</h1>
      <p>This service converts HTML to PNG images via API.</p>
      
      <h2>Usage</h2>
      <p><strong>Endpoint:</strong> <code>POST /api/html-to-image</code></p>
      
      <h3>Headers</h3>
      <pre><code>{`Authorization: Bearer YOUR_API_TOKEN
Content-Type: application/json`}</code></pre>
      
      <h3>Request Body</h3>
      <pre><code>{`{
  "html": "<h1>Hello World</h1>",
  "width": 1200,     // optional, default: 1200
  "height": 800,     // optional, default: 800
  "quality": 90,     // optional, default: 90 (0-100)
  "fullPage": false  // optional, default: false
}`}</code></pre>
      
      <h3>Response</h3>
      <p>Binary PNG image data with Content-Type: image/png</p>
      
      <h3>Health Check</h3>
      <p><strong>Endpoint:</strong> <code>GET /api/html-to-image</code></p>
      
      <h2>Configuration</h2>
      <p>Set the <code>API_TOKEN</code> environment variable to secure your API.</p>
    </div>
  );
}