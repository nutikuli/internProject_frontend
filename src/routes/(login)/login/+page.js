
// @ts-ignore
/*import { redirect } from "@sveltejs/kit";
import { OAuth2Client } from "google-auth-library";


export const actions={
    // eslint-disable-next-line no-empty-pattern
    OAuth2:async({})=>{
        const redirectURL='http://localhost:5173/oauth';

        // @ts-ignore
        const oAuth2Client=new OAuth2Client(
            SECRET_CLIENT_ID,
            SECRET_CLIENT_SECRET,
            redirectURL
        )

        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type:'offline',
            scope:'https://www.googleapis.com/auth/userinfo.profile openid',
            prompt:'consent'
        });
        throw redirect(302,authorizeUrl)
    }
}*/