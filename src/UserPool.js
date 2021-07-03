import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId:"Your user Pool ID",
    ClientId:"Client App Id"
}

export default new CognitoUserPool(poolData);