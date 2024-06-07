document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code) {
        try {
            const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: 'http://localhost:5173/login',
                    client_id: '2005541373',
                    client_secret: 'd7e28d7a2ff78321742abf06bc9385a7'
                })
            });

            const tokenData = await tokenResponse.json();
            console.log('Token data:', tokenData);

            const profileResponse = await fetch('https://api.line.me/v2/profile', {
                headers: {
                    'Authorization': `Bearer ${tokenData.access_token}`
                }
            });

            const profileData = await profileResponse.json();
            console.log('Profile data:', profileData);

            // Store user profile data in localStorage (or other storage)
            localStorage.setItem('profile', JSON.stringify(profileData));
            sessionStorage.setItem('profile', JSON.stringify(profileData));


            document.getElementById('emailInputline').value = profileData.userId;
            document.getElementById('nameInputline').value = profileData.displayName;
            document.getElementById('mylineForm').submit();
        
           
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('result').innerText = 'Error during login process';
        }
    } else {
        document.getElementById('result').innerText = 'No code found in the URL';
    }
});
