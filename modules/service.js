export async function sendRequest(body) {
    const url = 'https://ghcpro-function.azurewebsites.net/api/game-survey?code=OX7U3HITzveIvt1Y9kfXtHDSqcLaQKD4D3FhA9wKRna2AzFuFIpMzw%3D%3D';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (response.status !== 200) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.text();

        if (data.includes('done')) {
            throw new Error(`Unexpected response: ${data}`);
        }

        // TODO : return value if we need to show loading in the UI
        console.log('Request succeeded with status 200 and response "done"');
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
    }
}
