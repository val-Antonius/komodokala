const http = require('http');

const url = 'http://localhost:3000/packages/3d2n-classic';

http.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        if (res.statusCode === 200) {
            // Check for key content
            const hasTitle = data.includes('3D2N Classic');
            const hasPrice = data.includes('4.200.000'); // Check price formatting roughly
            const hasItinerary = data.includes('Kelor & Rinca');

            console.log('Has Title:', hasTitle);
            console.log('Has Itinerary:', hasItinerary);

            if (hasTitle && hasItinerary) {
                console.log('✅ Page Verification Successful');
            } else {
                console.log('❌ Page Content Missing');
            }
        } else {
            console.log('❌ Failed to load page');
        }
    });
}).on('error', (err) => {
    console.log('❌ Error:', err.message);
});
