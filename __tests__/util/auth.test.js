import axios from "axios";
import { authenticate } from "../../util/auth";
import {describe, expect, test,beforeEach} from '@jest/globals';

describe("Call to Api", () => {
  
  
  test("should return tokens", async () => {
    beforeEach(() => {
      resetModules();
    });
      const email = "test@interia.com";
      const password = "testPassword";
      const mode = "signIn";
      const expectedTokens = [
        "exampleTokenId",
        "exampleRefreshToken",
        "test@example.com",
      ];

      axios.post = jest.fn().mockResolvedValue({
        data: {
          email: expectedTokens[2],
          idToken: expectedTokens[0],
          refreshToken: expectedTokens[1],
        },
      });
const tokens = await authenticate(mode,email,password)
expect(tokens).toEqual(expectedTokens)
expect(axios.post).toHaveBeenCalledWith(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=AIzaSyA0a0C0kjGJRMj5BukeZxgonScBV4saiLM`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
    
  })});
